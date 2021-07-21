import { useCallback } from 'react';
import { ClientMessageDTO, Message, MessageEvents } from '../../../../../typings/messages';
import { fetchNui } from '../../../utils/fetchNui';
import { ServerPromiseResp } from '../../../../../typings/common';
import { useMessageActions } from './useMessageActions';
import { useSnackbar } from '../../../ui/hooks/useSnackbar';

interface useMessageAPIVal {
  sendNewMessage: (rawMsg: ClientMessageDTO) => void;
  setMessageAsRead: (msgId: number) => void;
}

// We use this hook to communicate with the message API endpoints
// and handle their responses. For local data mutation we use the
// useMessageActions hook
export const useMessageAPI = (): useMessageAPIVal => {
  const { addNewMessage } = useMessageActions();
  const { addAlert } = useSnackbar();

  const sendNewMessage = useCallback(
    (rawMsg: ClientMessageDTO) => {
      fetchNui<ServerPromiseResp<Message>>(MessageEvents.SEND_MESSAGE, rawMsg).then(
        (serverResp) => {
          if (serverResp.status !== 'ok') {
            return addAlert({
              message: 'An error occured, message was unable to be sent',
              type: 'error',
            });
          }

          addNewMessage(serverResp.data);
        },
      );
    },
    [addAlert, addNewMessage],
  );

  const setMessageAsRead = useCallback(
    (msgId: number) => {
      fetchNui<ServerPromiseResp<void>>(MessageEvents.SET_MESSAGE_READ, msgId).then(
        (serverResp) => {
          if (serverResp.status !== 'ok') {
            return addAlert({ message: 'Unable to set the message as read', type: 'error' });
          }
        },
      );
    },
    [addAlert],
  );

  return { sendNewMessage, setMessageAsRead };
};
