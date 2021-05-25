import { ResultSetHeader } from 'mysql2';

import { pool } from './db';
import { config } from './server';
import { Like, Match, Profile, MatchEvents, NewProfile } from '../../typings/match';
import { mainLogger } from './sv_logger';
import { generateProfileName } from './utils/generateProfileName';
import { getSource } from './utils/miscUtils';
import PlayerService from './players/player.service';

const matchLogger = mainLogger.child({ module: 'match' });
const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

onNet(MatchEvents.CREATE_MY_PROFILE, async (profile: Profile) => {
  const _source = getSource();
  const identifier = PlayerService.getIdentifier(_source);
  matchLogger.debug(`Creating profile for identifier: ${identifier}`);
  matchLogger.debug(profile);

  try {
    if (!profile.name || !profile.name.trim()) {
      throw new Error('Profile name must not be blank');
    }

    const newProfile = await createProfile(identifier, profile);
    emitNet(MatchEvents.CREATE_MY_PROFILE_SUCCESS, _source, newProfile);
  } catch (e) {
    matchLogger.error(`Failed to update profile for identifier ${identifier}, ${e.message}`);
    emitNet(MatchEvents.CREATE_MY_PROFILE_FAILED, _source, {
      message: 'APPS_MATCH_CREATE_PROFILE_FAILED',
      type: 'error',
    });
  }
});

onNet(MatchEvents.UPDATE_MY_PROFILE, async (profile: Profile) => {
  const _source = getSource();
  const identifier = PlayerService.getIdentifier(_source);
  matchLogger.debug(`Updating profile for identifier: ${identifier}`);
  matchLogger.debug(profile);

  try {
    if (!profile.name || !profile.name.trim()) {
      throw new Error('Profile name must not be blank');
    }

    const updatedProfile = await updateProfile(identifier, profile);
    emitNet(MatchEvents.UPDATE_MY_PROFILE_SUCCESS, _source, updatedProfile);
  } catch (e) {
    matchLogger.error(`Failed to update profile for identifier ${identifier}, ${e.message}`);
    emitNet(MatchEvents.UPDATE_MY_PROFILE_FAILED, _source, {
      message: 'APPS_MATCH_UPDATE_PROFILE_FAILED',
      type: 'error',
    });
  }
});

onNet(MatchEvents.SAVE_LIKES, async (likes: Like[]) => {
  const _source = getSource();
  const identifier = PlayerService.getIdentifier(_source);
  matchLogger.debug(`Saving likes for identifier ${identifier}`);

  try {
    await saveLikes(identifier, likes);
  } catch (e) {
    matchLogger.error(`Failed to save likes, ${e.message}`);
    emitNet(MatchEvents.SAVE_LIKES_FAILED, _source, {
      message: 'APPS_MATCH_SAVE_LIKES_FAILED',
      type: 'error',
    });
  }

  try {
    const newMatches = await findNewMatches(identifier, likes);
    if (newMatches.length > 0) {
      emitNet(MatchEvents.NEW_MATCH, _source, {
        message: 'APPS_MATCH_NEW_LIKE_FOUND',
        type: 'info',
      });
    }
  } catch (e) {
    matchLogger.error(`Failed to find new matches, ${e.message}`);
  }
});

onNet(MatchEvents.GET_MATCHES, async () => {
  const _source = getSource();
  const identifier = PlayerService.getIdentifier(_source);

  try {
    const matchedProfiles = await findAllMatches(identifier);
    emitNet(MatchEvents.GET_MATCHES_SUCCESS, _source, matchedProfiles);
  } catch (e) {
    matchLogger.error(`Failed to retrieve matches, ${e.message}`);
    emitNet(MatchEvents.GET_MATCHES_FAILED, _source, {
      message: 'APPS_MATCH_GET_MATCHES_FAILED',
      type: 'error',
    });
  }
});

if (!config.match.allowEditableProfileName && !config.match.generateProfileNameFromUsers) {
  const warning =
    `Both allowEdtiableProfileName and generateProfileNameFromUsers ` +
    `are set false - this means users will likely not have profile names ` +
    `for the Match App and won't be able to use it!`;
  matchLogger.warn(warning);
}
