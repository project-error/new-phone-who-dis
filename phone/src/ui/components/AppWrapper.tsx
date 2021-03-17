import React, { createContext, useRef, useState } from 'react';
import { AppWrapperTypes } from '../interface/InterfaceUI';
import { Computer } from '@material-ui/icons';
import PhoneDrawer from './PhoneDrawer';

const items = [
  {
    onClick: () => console.log(),
    icon: <Computer color="inherit" />,
    text: 'Item Thing',
  },
  {
    onClick: () => console.log(),
    icon: <Computer color="inherit" />,
    text: 'Item Thing',
  },
  {
    onClick: () => console.log(),
    icon: <Computer color="inherit" />,
    text: 'Item Thing',
  },
  {
    onClick: () => console.log(),
    icon: <Computer color="inherit" />,
    text: 'Item Thing',
  },
];

export const AppWrapper = ({
  children,
  style,
  handleClickAway,
  sideMenu,
  appName,
  ...props
}: AppWrapperTypes) => {
  const ref = useRef();

  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      {...props}
      style={{
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        minHeight: '720px',
        ...style,
      }}
    >
      <PhoneDrawer
        open={open}
        handleClose={() => setOpen(false)}
        appTitle={'Side Menu Thing'}
        containerEl={ref.current}
        items={items}
      />
      {children}
    </div>
  );
};
