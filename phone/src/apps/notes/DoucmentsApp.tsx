import React from 'react';
import { AppWrapper } from '../../ui/components/AppWrapper';
import { AppContent } from '../../ui/components/AppContent';
import { AppTitle } from '../../ui/components/AppTitle';
import { useApp } from '../../os/apps/hooks/useApps';
import { NoteModal } from './modal/NoteModal';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useNoteDetail } from './hooks/useNoteDetail';
import useStyles from './documents.styles';
import InjectDebugData from '../../os/debug/InjectDebugData';
import { DocumentsThemeProvider } from './providers/DoucmentsThemeProvider';
import { Route, useHistory } from 'react-router-dom';
import DocumentList from './list/DoucmentList';
import NoteList from './list/NoteList';

export const NotesApp = () => {
  const documentsApp = useApp('DOCUMENTS');

  return (
    <DocumentsThemeProvider>
      <AppWrapper id="documents-app">
        <AppTitle app={documentsApp} />
        <Route path="/documents/notes/detail" component={NoteModal} />
        <AppContent>
          <Route path="/documents" exact component={DocumentList} />
          <Route path="/documents/notes" exact component={NoteList} />
        </AppContent>
      </AppWrapper>
    </DocumentsThemeProvider>
  );
};

InjectDebugData([
  {
    app: 'NOTES',
    method: 'setNotes',
    data: [
      {
        id: 1,
        title: 'First note',
        content: 'Hello, this is my shitty note',
      },
      {
        id: 2,
        title: 'Second note',
        content: 'Hello, this is another shitty note',
      },
    ],
  },
]);
