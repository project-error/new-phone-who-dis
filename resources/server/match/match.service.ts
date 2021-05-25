import MatchDB, { _MatchDB } from './match.db';
import { matchLogger } from './match.utils';
import PlayerService from '../players/player.service';
import { Like, MatchEvents, Profile } from '../../../typings/match';
import { config } from '../server';
import { generateProfileName } from '../utils/generateProfileName';

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

class _MatchService {
  private readonly matchDB: _MatchDB;

  constructor() {
    this.matchDB = MatchDB;
    matchLogger.debug('Match service started');
  }

  /**
   * Retrieve the player's profile by their identifier if it exists. If
   * not, create it and return it.
   * @param identifier - player's identifier
   * @returns Profile - player's profile
   */
  private async getOrCreateProfile(identifier: string): Promise<Profile> {
    const profile = await this.matchDB.getPlayerProfile(identifier);
    return profile || (await this.createDefaultProfile(identifier));
  }

  /**
   * Given a list of likes determine if any of the profiles we liked have also
   * liked us which indicates a match has occurred.
   * @param identifier - player's identifier
   * @param likes - list of new Likes
   * @returns Profile[] - list of profiles we matched with
   */
  private async findNewMatches(identifier: string, likes: Like[]) {
    let matches: Profile[] = [];
    for (const like of likes) {
      if (!like.liked) continue;
      const matchedProfiles = await this.matchDB.checkForMatchById(identifier, like.id);
      matches = matches.concat(matchedProfiles);
    }
    return matches;
  }

  /**
   * Create a default profile for a player based on information
   * associated with them (name, phone number, etc.)
   * @param identifier - player's identifier
   * @returns Profile | null - the player's profile or null if it does not exist
   * and could not be created
   */
  private async createDefaultProfile(identifier: string): Promise<Profile | null> {
    // case where the server owner wants players to select their own names
    if (!config.match.generateProfileNameFromUsers) return null;

    const defaultProfileName = await generateProfileName(identifier, ' ');
    // case where we tried to generate a profile name but failed due to
    // some database misconfiguration or error
    if (!defaultProfileName) return null;

    const defaultProfile = {
      name: defaultProfileName,
      image: DEFAULT_IMAGE,
      bio: '',
      location: '',
      job: '',
      tags: '',
    };

    matchLogger.info(`Creating default match profile ${defaultProfileName} for ${identifier}`);
    return await this.matchDB.createProfile(identifier, defaultProfile);
  }

  private async dispatchPlayerProfile(identifier: string, source: number): Promise<void> {
    try {
      const profile = await this.getOrCreateProfile(identifier);
      emitNet(MatchEvents.GET_MY_PROFILE_SUCCESS, source, profile);
    } catch (e) {
      matchLogger.error(`Failed to get player profile, ${e.message}`);
      emitNet(MatchEvents.GET_MY_PROFILE_FAILED, source, {
        message: 'APPS_MATCH_GET_MY_PROFILE_FAILED',
        type: 'error',
      });
    }
  }

  private async dispatchProfiles(identifier: string, source: number): Promise<void> {
    try {
      const profiles = await this.matchDB.getPotentialProfiles(identifier);
      emitNet(MatchEvents.GET_PROFILES_SUCCESS, source, profiles);
    } catch (e) {
      matchLogger.error(`Failed to retrieve profiles, ${e.message}`);
      emitNet(MatchEvents.GET_PROFILES_FAILED, source, {
        message: 'APPS_MATCH_GET_PROFILES_FAILED',
        type: 'error',
      });
    }
  }

  async handleInit(src: number) {
    const identifier = PlayerService.getIdentifier(src);
    matchLogger.debug(`Initializing match for identifier: ${identifier}`);

    await this.dispatchPlayerProfile(identifier, src);
    await this.dispatchProfiles(identifier, src);
    await this.matchDB.updateLastActive(identifier);
  }
}
