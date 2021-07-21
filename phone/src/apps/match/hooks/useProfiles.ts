import { useRecoilState, useRecoilValue } from 'recoil';
import { matchState, useUnformattedProfiles } from './state';

import { FormattedProfile, MatchEvents, Profile } from '../../../../../typings/match';
import { useNuiRequest } from 'fivem-nui-react-lib';
import { useMatchActions } from './useMatchActions';

interface IUseProfiles {
  profiles: FormattedProfile[] | null;
  activeProfile: FormattedProfile | null;
  setViewed: (index: number, liked: boolean) => void;
  error: boolean;
}

export const useProfiles = (): IUseProfiles => {
  const Nui = useNuiRequest();
  const [profiles, setProfiles] = useUnformattedProfiles();
  const error = useRecoilValue(matchState.errorLoadingProfiles);
  const { formatProfile } = useMatchActions();

  const formattedProfiles = profiles.map(formatProfile);

  const setViewed = (id: number, liked: boolean) => {
    setProfiles((formattedProfiles) =>
      formattedProfiles.map((profile) => {
        if (id === profile.id) return { ...profile, viewed: true, liked };
        return profile;
      }),
    );

    Nui.send(MatchEvents.SAVE_LIKES, [{ id, liked }]);
  };

  const filteredProfiles = formattedProfiles
    ? formattedProfiles.filter((profile) => !profile.viewed)
    : null;
  const activeProfile = formattedProfiles ? filteredProfiles[0] : null;

  return { profiles: formattedProfiles, activeProfile, error, setViewed };
};
