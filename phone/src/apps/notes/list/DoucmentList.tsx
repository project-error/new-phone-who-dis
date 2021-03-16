import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NoteIcon from '@material-ui/icons/Note';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { useHistory } from 'react-router';

export default function DoucmentList() {
  const { t } = useTranslation();
  const history = useHistory();

  const [list, setList] = useState([
    {
      id: 1,
      name: t('APPS_DOCUMENTS_NOTES_TITLE'),
      icon: <NoteIcon />,
      route: '/documents/notes',
    },
    {
      id: 2,
      name: t('APPS_DOCUMENTS_LICENSE_TITLE'),
      icon: <RecentActorsIcon />,
      route: '/documents/licenses',
    },
  ]);

  return (
    <List disablePadding>
      {list.map((l) => (
        <ListItem divider button key={l.id} onClick={() => history.push(l.route)}>
          <ListItemIcon>{l.icon}</ListItemIcon>
          <ListItemText primary={l.name} />
        </ListItem>
      ))}
    </List>
  );
}
