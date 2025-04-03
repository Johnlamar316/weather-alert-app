import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input, & .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused': {
            color: '#fff',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
          '& svg': {
            color: '#fff',
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
        toolbar: {
          color: '#fff',
        },
        selectIcon: {
          color: '#fff',
        },
      },
    },
  },
});

export default theme;
