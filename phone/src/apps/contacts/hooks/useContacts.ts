import { useRecoilValue } from 'recoil';
import { contactsState } from './state';

import { Contact } from '../../../common/typings/contact';
import { useCallback } from 'react';

interface IUseContacts {
  contacts: Contact[];
  getDisplayByNumber: (number: string) => string;
}

export const useContacts = (): IUseContacts => {
  const contacts = useRecoilValue(contactsState.contacts);
  const getDisplayByNumber = useCallback((number: string) => {
    const found = contacts.find((contact) => contact.number === number) 
    return found ? found.display : number
  }, [contacts])
  return { contacts, getDisplayByNumber };
};
