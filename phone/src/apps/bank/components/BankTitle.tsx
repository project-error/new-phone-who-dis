import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography, makeStyles } from '@material-ui/core';

import './BankApp.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90px',
    width: '100%',
    display: 'flex',
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    background: '#424242',
  },
  icon: {
    color: '#f44336',
    fontSize: 40,
  },
}));

export const BankTitle = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} square variant='outlined' elevation={24}>
      <Typography id='bank-title' style={{ margin: 0 }} variant='h4'>
        WhoDis Banking
      </Typography>
    </Paper>
  );
};
