import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';

const Form = observer(() => {
  const { addTodo, checkboxState, changeAllStatuses } = store;

  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    addTodo(input);
    setInput('');
  };

  return (
    <Box
      component={'form'}
      sx={{
        display: 'flex',
        minHeight: 60,
      }}
      onSubmit={handleSubmit}
    >
      <Checkbox
        sx={{
          p: '10px',
          display: 'flex',
          alignSelf: 'center',
        }}
        checked={checkboxState.checked}
        indeterminate={checkboxState.indeterminate}
        onChange={() => changeAllStatuses()}
      />
      <InputBase
        sx={{ mx: 1, flex: 1 }}
        placeholder="What needs to be done?"
        inputProps={{ 'aria-label': 'add new task' }}
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <IconButton
        sx={{ p: '10px', display: 'flex', alignSelf: 'center' }}
        aria-label="add"
        type="submit"
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
});

export default Form;
