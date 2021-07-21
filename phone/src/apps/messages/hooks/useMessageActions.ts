import { useRecoilState, useSetRecoilState } from 'recoil';
import { messageState, useMessagesValue, useSetMessages } from './state';
import { useNuiEvent, useNuiRequest } from 'fivem-nui-react-lib';
import { IAlert, useSnackbar } from '../../../ui/hooks/useSnackbar';
import { useTranslation } from 'react-i18next';
import { useMessageNotifications } from './useMessageNotifications';
import { useCallback } from 'react';
import { useLocation } from 'react-router';
import { ClientMessageDTO, Message, MessageEvents } from '../../../../../typings/messages';
import { fetchNui } from '../../../utils/fetchNui';
import { ServerPromiseResp } from '../../../../../typings/common';
import LogDebugEvent from '../../../os/debug/LogDebugEvents';

export const useMessageActions = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const setMessages = useSetMessages();

  const handleMessageBroadcast = useCallback((msg: Message) => {}, []);

  const deleteMessage = useCallback(
    (msgId: number) => {
      setMessages((curMsgs) => {
        const targetIdx = curMsgs.findIndex((msg) => msg.id === msgId);

        if (targetIdx === -1)
          throw new Error(`Message with id ${msgId} was not found in messages for deletion`);

        return curMsgs.slice(targetIdx, 1);
      });
    },
    [setMessages],
  );

  const addNewMessage = useCallback(
    (newMsg: Message) => {
      setMessages((curMessages) => {
        const newMsgArr = [...curMessages];
        newMsgArr.push(newMsg);
        return newMsgArr;
      });
    },
    [setMessages],
  );

  useNuiEvent('MESSAGES', MessageEvents.MESSAGE_BROADCAST, handleMessageBroadcast);

  return { addNewMessage, deleteMessage };
};
