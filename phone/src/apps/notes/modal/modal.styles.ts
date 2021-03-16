import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    zIndex: 20,
    position: 'absolute',
    height: '99%',
    width: '100%',
    background: theme.palette.background.default,
  },
  input: {
    marginBottom: 20,
  },
  inputPropsTitle: {
    fontSize: 28,
  },
  inputPropsContent: {
    fontSize: 20,
    lineHeight: 1.2,
  },
  backgroundModal: {
    background: 'black',
    opacity: '0.6',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
}));

export default useStyles;
