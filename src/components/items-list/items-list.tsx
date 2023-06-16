import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import List from '@mui/material/List';
import Item from '../item/item';

const ItemsList = observer(() => {
  const { itemsList } = store;

  return (
    <List
      sx={{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,.1)',
        borderTop: '1px solid rgba(0,0,0,.1)',
      }}
      disablePadding
    >
      {itemsList.map((i) => (
        <Item text={i.text} isDone={i.isDone} id={i.id} key={i.id} />
      ))}
    </List>
  );
});

export default ItemsList;
