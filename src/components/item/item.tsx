import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface IItem {
  text: string;
  isDone: boolean;
  id: string;
}

const Item = observer(({ text, isDone, id }: IItem) => {
  const [isOpened, setOpened] = useState(false);
  const { deleteTodo, changeTodoStatus } = store;

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteTodo(id)}
          >
            <DeleteForeverIcon />
          </IconButton>
        }
        disablePadding
        divider={!isOpened}
      >
        <ListItemButton
          onClick={() => {
            setOpened(!isOpened);
          }}
          dense
          disableRipple
        >
          <Checkbox
            onClick={(e) => {
              e.stopPropagation();
              changeTodoStatus(id);
            }}
            checked={isDone}
            tabIndex={-1}
            inputProps={{ 'aria-labelledby': `checkbox-${id}` }}
          />
          {isOpened ? (
            <ExpandLess sx={{ mr: 1 }} />
          ) : (
            <ExpandMore sx={{ mr: 1 }} />
          )}
          <Typography
            sx={{
              display: 'inline-block',
              alignSelf: 'center',
              fontSize: '1.3rem',
              textDecoration: isDone ? 'line-through' : 'inherit',
              color: isDone ? 'rgba(0,0,0,.15)' : 'inherit',
            }}
            noWrap
            id={id}
          >
            {text}
          </Typography>
        </ListItemButton>
      </ListItem>
      <Collapse in={isOpened} timeout="auto" unmountOnExit>
        <Typography
          sx={{
            padding: '10px 10px 10px 65px',
            borderBottom: '1px solid rgba(0,0,0,.1)',
            wordBreak: 'break-word',
          }}
        >
          {`Details: ${text}`}
        </Typography>
      </Collapse>
    </>
  );
});

export default Item;
