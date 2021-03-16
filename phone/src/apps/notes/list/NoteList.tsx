import React from 'react';
import { Fab, List, ListItem, ListItemText } from '@material-ui/core';
import { useNoteDetail } from '../hooks/useNoteDetail';
import { useNotes } from '../hooks/useNotes';
import { useHistory } from 'react-router-dom';
import useStyles from '../documents.styles';
import AddIcon from '@material-ui/icons/Add';

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

  const onClickCreate = () => {
    setDetail({ title: '', content: '' });
    history.push('/documents/notes/detail');
  };

  return (
    <div>
      <List disablePadding>
        {notes.map((note) => (
          <ListItem key={note.id} button divider onClick={() => handleNoteModal(note)}>
            <ListItemText primary={note.title} secondary={`${note.content.slice(0, 35)}...`} />
          </ListItem>
        ))}
      </List>
      <Fab className={classes.absolute} onClick={onClickCreate} color="primary">
        <AddIcon />
      </Fab>
    </div>
  );
};

export default NoteList;
