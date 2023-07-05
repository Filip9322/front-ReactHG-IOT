// ** React Imports
import { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';

// **  Material Components Imports
import { Box, Button,
        Drawer , TextField, Autocomplete
      } from '@mui/material';


const LateralPanel = props => {

  // * Props and states
  const { controller } = props;
  const [state, setState] = useState({ right: false });


  const toogleDrawer = (anchor, open) => event => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState ({...state, [anchor]: open});
  }

  return (
    controller.id != null ? (
      <Box>
        <Button onClick={toogleDrawer('right',true)}>
          {controller.controller_name}
        </Button>
        <Drawer
          anchor={'right'}
          open={state['right']}
          onClose={toogleDrawer('right', false)}
        >
          {controller.local_area_controller_number+'번 '+controller.controller_name}
        </Drawer>
      </Box>
    ):('Here')
  );
}
const CountingBar = props => {

  return (
    <Box>

    </Box>
  );
}


const SearchBar = props => {
  const { controllersNames } = props;

  useEffect(()=>{
    console.log(controllersNames.length);
  },[props]);

  const textFieldInput = params => {
    return (
      <TextField {...params} label='제우기 검색:' variant='outlined' />
    )
  }

  return (
    <Autocomplete
      id='searchField'
      sx={{width: 300 }}
      options={controllersNames.map(controller => controller.name)}
      autoHighlight
      renderInput={params => (textFieldInput(params))}
    />
  );
}

const BtLateralMenu = props => {
  return (
    <Box>
      
    </Box>
  );
}

export { 
  LateralPanel,
  CountingBar,
  SearchBar,
  BtLateralMenu
};