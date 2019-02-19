import { createMuiTheme } from '@material-ui/core/styles';

const theme1 = createMuiTheme({
  palette: {
    primary: { main: '#2196f3' }, 
    secondary: { main: '#4caf50' }, 
  },
  typography: { useNextVariants: true },
});

export default { theme1 };