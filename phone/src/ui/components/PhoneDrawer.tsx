import React from 'react';
import {
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  Drawer,
  Typography,
  Box,
  Divider,
  Button,
  useTheme,
} from '@material-ui/core';
import { ChevronLeft, Settings } from '@material-ui/icons';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface DrawerItem {
  onClick: () => void;
  text: string;
  icon?: JSX.Element;
}

const BackAction = ({ handleClose }) => (
  <Button
    component={Box}
    display="flex"
    flexDirection="row"
    alignItems="center"
    left="16px"
    position="absolute"
    bottom="16px"
    onClick={handleClose}
  >
    <ChevronLeft color="secondary" />
    <Typography variant="body1" color="textSecondary">
      Close
    </Typography>
  </Button>
);

interface PhoneDrawer {
  open: boolean;
  handleClose: () => void;
  containerEl: Element;
  items: DrawerItem[];
  appTitle?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  sidebarTitle: {
    marginLeft: 20,
    color: theme.palette.secondary.contrastText,
  },
}));

const PhoneDrawer: React.FC<PhoneDrawer> = ({
  items,
  open,
  containerEl,
  handleClose,
  appTitle,
}) => {
  const theme = useTheme();

  const classes = useStyles();

  return (
    <Drawer
      open={open}
      onClose={() => {}}
      PaperProps={{ style: { position: 'absolute', width: '70%' } }}
      BackdropProps={{ style: { position: 'absolute' } }}
      ModalProps={{
        container: containerEl,
        style: { position: 'absolute' },
      }}
      variant="temporary"
    >
      <Box height="100%">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          p={2}
          bgcolor={theme.palette.secondary.main}
        >
          <Settings htmlColor={theme.palette.secondary.contrastText} />
          {appTitle && (
            <Typography variant="h6" className={classes.sidebarTitle}>
              {appTitle}
            </Typography>
          )}
        </Box>
        <List disablePadding>
          {items.map((item) => (
            <>
              <ListItem
                button
                onClick={item.onClick}
                style={{ color: theme.palette.text.secondary }}
              >
                {item?.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <BackAction handleClose={handleClose} />
      </Box>
    </Drawer>
  );
};

export default PhoneDrawer;
