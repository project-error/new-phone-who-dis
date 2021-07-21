export interface Message {
  id: number;
  message: string;
  author_identifier: string;
  receiver_phonenumber: string;
  author_phonenumber: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientMessageDTO {
  message: string;
  receiver_phonenumber: string;
}

/**
 * Used for the raw npwd_messages_groups row responses
 */
export interface UnformattedMessageGroup {
  group_id: string;
  user_identifier: string;
  participant_identifier: string;
  phone_number: string;
  label?: string;
  avatar?: string;
  display?: string;
  updatedAt: string;
  unreadCount: number;
}

/**
 * Used to help consolidate raw npwd_messages_groups rows into
 * a mapping of a single message group
 */
export interface MessageGroupMapping {
  [groupId: string]: {
    user_identifier: string;
    // Participant displays
    participants: string[];
    phoneNumbers: string[];
    label?: string;
    avatar?: string;
    updatedAt: string;
    unreadCount: number;
  };
}

export interface CreateMessageGroupResult {
  error?: boolean;
  phoneNumber?: string;
  duplicate?: boolean;
  groupId?: string;
  mine?: boolean;
  identifiers?: string[];
  allNumbersFailed?: boolean;
  failedNumbers: string[];
}

export interface CreateMessageBroadcast {
  message: string;
  groupName: string;
  groupId: string;
}

export interface SetMessageRead {
  groupId: string;
}

export enum MessageEvents {
  MESSAGE_BROADCAST = 'npwd:messageBroadcast',
  FETCH_MESSAGE_GROUPS = 'npwd:fetchMessageGroups',
  FETCH_MESSAGE_GROUPS_SUCCESS = 'npwd:fetchMessageGroupsSuccess',
  FETCH_MESSAGE_GROUPS_FAILED = 'npwd:fetchMessageGroupsFailed',
  SEND_MESSAGE = 'npwd:sendMessage',
  FETCH_MESSAGES = 'npwd:fetchMessages',
  ACTION_RESULT = 'npwd:setMessagesAlert',
  SET_MESSAGE_READ = 'npwd:setReadMessages',
}
