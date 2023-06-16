import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Control = observer(() => {
  const {
    itemsLeft,
    setCurrentFilter,
    currentFilter: filter,
    clearCompleted,
  } = store;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        px: 2,
        py: 1,
      }}
    >
      <Typography
        variant="body1"
        sx={{ mr: '20px' }}
      >{`${itemsLeft} items left`}</Typography>
      <Box sx={{ display: 'flex', mx: 'auto', gap: '5px' }}>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          onClick={() => setCurrentFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          onClick={() => setCurrentFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'outlined' : 'text'}
          onClick={() => setCurrentFilter('completed')}
        >
          Completed
        </Button>
      </Box>
      <Button variant="text" onClick={() => clearCompleted()}>
        Clear completed
      </Button>
    </Box>
  );
});

export default Control;
