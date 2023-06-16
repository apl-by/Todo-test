import Form from '../form/form';
import Wrapper from '../wrapper/wrapper';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ItemsList from '../items-list/items-list';
import Control from '../control/control';

const App = () => {
  return (
    <Wrapper>
      <Typography variant="h1">todos</Typography>
      <Paper component={'section'} sx={{ width: '100%', maxWidth: 600 }}>
        <Form />
        <ItemsList />
        <Control />
      </Paper>
    </Wrapper>
  );
};

export default App;
