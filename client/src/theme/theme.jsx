import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A259FF', 
    },
    secondary: {
      main: '#858584',
    },
    background: {
      default: '#2B2B2B',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Montserrat', 
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            textTransform: 'capitalize',
            fontSize: 16,
            padding: '10px 20px'
          },
        },
      },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: "0!important", 
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          '&.Mui-focused fieldset': {
            borderWidth: '4px!important',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(162, 89, 255, 0.20);!important',
          },
        },
        input: {
          color: '#000',
          padding: '13px 20px',
        },
        notchedOutline: {
          borderRadius: '20px',
        },
      },
    },
  },
});

export default theme;
