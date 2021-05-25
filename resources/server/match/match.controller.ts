import { Like, MatchEvents, Profile } from '../../../typings/match';
import { getSource } from '../utils/miscUtils';

onNet(MatchEvents.INITIALIZE, async () => {
  const pSource = getSource();
});

onNet(MatchEvents.CREATE_MY_PROFILE, async (profile: Profile) => {
  const pSource = getSource();
});

onNet(MatchEvents.UPDATE_MY_PROFILE, async (profile: Profile) => {
  const pSource = getSource();
});

onNet(MatchEvents.SAVE_LIKES, async (likes: Like[]) => {
  const pSource = getSource();
});

onNet(MatchEvents.GET_MATCHES, async () => {
  const pSource = getSource();
});
