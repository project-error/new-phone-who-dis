import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useNoteDetail } from '../hooks/useNoteDetail';
import { useNotes } from '../hooks/useNotes';
import { useHistory } from 'react-router-dom';
import useStyles from '../notes.styles';

// add search bar later
// TODO: Add interface for note
const NoteList = () => {
  const history = useHistory();
  const { notes } = useNotes();
  const { setDetail } = useNoteDetail();
  const classes = useStyles();

  const handleNoteModal = (note) => {
    setDetail(note);
    history.push('/documents/notes/detail');
  };

  return (
    <List disablePadding>
      {notes.map((note) => (
        <ListItem key={note.id} button divider onClick={() => handleNoteModal(note)}>
          <ListItemText primary={note.title} secondary={`${note.content.slice(0, 35)}...`} />
        </ListItem>
      ))}
    </List>
  );
};

export default NoteList;
