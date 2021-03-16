import { common, yellow } from '@material-ui/core/colors';

export const DOCUMENTS_APP_PRIMARY_COLOR = yellow[800];
export const DOCUMENTS_APP_ICON_COLOR = common.white;
export const DOCUMENTS_APP_TEXT_COLOR = common.black;

const theme = {
  palette: {
    primary: {
      main: DOCUMENTS_APP_PRIMARY_COLOR,
      dark: yellow[900],
      light: yellow[500],
      contrastText: DOCUMENTS_APP_TEXT_COLOR,
    },
  },
};

export default theme;
