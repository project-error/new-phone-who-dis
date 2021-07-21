import { Message } from '../../../../../typings/messages';

export const MockMessageData: Message[] = [
  {
    id: 1,
    message: 'Nice meme bro',
    createdAt: Date.now().toString(),
    receiver_phonenumber: '131-391-1313',
    isRead: false,
    author_phonenumber: '607-391-1313',
    updatedAt: Date.now().toString(),
    author_identifier: 'dba4d971256a8bfb1a543cf0d46e342ad1cdd478',
  },
];
