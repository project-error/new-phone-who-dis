import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  FormattedMatch,
  FormattedProfile,
  MatchEvents,
  Profile,
} from '../../../../../typings/match';
import { fetchNui } from '../../../utils/fetchNui';
import { ServerPromiseResp } from '../../../../../typings/common';
import LogDebugEvent from '../../../os/debug/LogDebugEvents';
import { MockMyProfileData, MockProfilesData } from '../utils/constants';
import { isEnvBrowser } from '../../../utils/misc';

export const matchState = {
  profiles: atom<Profile[]>({
    key: 'profiles',
    default: selector({
      key: 'defaultMatchProfiles',
      get: async () => {
        try {
          const resp = await fetchNui<ServerPromiseResp<Profile[]>>(MatchEvents.GET_PROFILES);
          LogDebugEvent({ action: 'ProfilesFetch', data: resp.data });
          return resp.data;
        } catch (e) {
          console.error(e);
          if (isEnvBrowser()) {
            return MockProfilesData;
          }
          return [];
        }
      },
    }),
  }),
  errorLoadingProfiles: atom({
    key: 'errorLoadingProfiles',
    default: false,
  }),
  matches: atom<FormattedMatch[]>({
    key: 'matches',
    default: null,
  }),
  errorLoadingMatches: atom<boolean>({
    key: 'errorLoadingMatches',
    default: false,
  }),
  myProfile: atom<FormattedProfile>({
    key: 'myProfile',
    default: selector({
      key: 'myProfileDefault',
      get: async () => {
        try {
          const resp = await fetchNui<ServerPromiseResp<FormattedProfile>>(
            MatchEvents.GET_MY_PROFILE,
          );
          LogDebugEvent({ action: 'MyProfileFetch', data: resp.data });
          // eslint-disable-next-line react-hooks/rules-of-hooks
          return resp.data;
        } catch (e) {
          console.error(e);
          if (isEnvBrowser()) {
            return MockMyProfileData;
          }
          return null;
        }
      },
    }),
  }),
  noProfileExists: atom<boolean>({
    key: 'noProfileExists',
    default: false,
  }),
};

export const useUnformattedProfiles = () => useRecoilState(matchState.profiles);
export const useUnformattedProfilesValue = () => useRecoilValue(matchState.profiles);
export const useSetUnformattedProfiles = () => useSetRecoilState(matchState.profiles);

export const useMyProfile = () => useRecoilState(matchState.myProfile);
export const useMyProfileValue = () => useRecoilValue(matchState.myProfile);
export const useSetMyProfile = () => useSetRecoilState(matchState.myProfile);
