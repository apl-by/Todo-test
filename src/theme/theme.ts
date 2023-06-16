import { createTheme } from '@mui/material/styles';

export let theme = createTheme({
  typography: {
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          textTransform: 'capitalize',
          color: 'rgba(0, 0, 0, 0.87)',
          minWidth: 'max-content',
          padding: '6px 8px',
        },
      },
      variants: [
        {
          props: { variant: 'text' },
          style: {
            padding: '6px 9px',
          },
        },
      ],
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
  },
});

export default theme;
