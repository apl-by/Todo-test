import React from 'react';
import Container from '@mui/material/Container';

interface IWrapper {
  children: React.ReactNode;
}

const Wrapper = ({ children }: IWrapper) => {
  return (
    <Container
      component={'main'}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f3f9ff',
      }}
      maxWidth={false}
    >
      {children}
    </Container>
  );
};

export default Wrapper;
