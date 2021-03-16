import React from 'react';

import { makeStyles, Paper } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '60px',
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: 40,
  },
}));

const NotesTitle = () => {
  const classes = useStyles();
  return (
    <Paper elevation={24} square variant="outlined" className={classes.header}>
      <FolderIcon fontSize="large" />
    </Paper>
  );
};

export default NotesTitle;
