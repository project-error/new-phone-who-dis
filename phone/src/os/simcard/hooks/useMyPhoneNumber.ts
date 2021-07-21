import { useRecoilValue } from 'recoil';
import { simcardState } from './state';

export const useMyPhoneNumber = () => {
  const number = useRecoilValue(simcardState.number);
  return { number };
};
