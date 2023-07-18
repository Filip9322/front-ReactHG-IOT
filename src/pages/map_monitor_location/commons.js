// ** React Imports
import { useState, useEffect }  from 'react';

// **  Material Components Imports
import { Box, Button, Typography,
        Drawer
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
          <Box 
            sx={{
              backgroundColor: 'rgba(241,244,249,1)',
              width: '100%',
              height: '100%'
            }}
          >
            {controller.local_area_controller_number+'번 '+controller.controller_name}
          </Box>
        </Drawer>
      </Box>
    ):('Here')
  );
}

const BtLateralMenu = props => {
  return (
    <Box>
      
    </Box>
  );
}

const set_ControllerStatusAndLogo = controller => {
  let body = {};
  let state = 0;
  let logo = '';

  if (controller.is_installed) {
    if(controller.is_active){
      //**----- */
      if(controller.has_abnormalities && controller.is_school_zone){
        state = 4; // State 4: School Zone with abnormalities - Yellow and Red
        logo  = 'icon_school_error';
      } else {
        state = 3; // State 3: School Zone NO abnormalities - Yellow
        logo  = 'icon_school';
      }
      //**----- */
      if(controller.has_abnormalities && !controller.is_school_zone){
        state = 2; // State 2: Active Abnormal State - Red
        logo  = 'icon_err';
      } else if (!controller.has_abnormalities && !controller.is_school_zone) {
        state = 1; // State 1: Active Normal State - Green
        logo  = 'icon_on';
      }
    }else {
      state = 5; // State 5: UnActtive Installed State - Gray
      logo  = 'icon_off';
    }
  } else {
    state = 6; // State 6: Not installed - Gray
    logo  = 'icon_off';
  }

  Object.assign(body, {state: state});
  Object.assign(body, {logo: logo});

  return body;

}

const filterControllerMapMarkersByType = (controllers, typeFilter) => {
  let filtered = [];
  switch(typeFilter){
    case 0:
      filtered = controllers;
      break;
    case 1:
      filtered = controllers.filter(controller => controller.state == 1 || controller.state == 3);
      break;
    case 2:
      filtered = controllers.filter(controller => controller.state == 2 || controller.state == 4);
      break;
    case 3:
      filtered = controllers.filter(controller => controller.state == 3 || controller.state == 4);
      break;
    case 4:
      filtered = controllers.filter(controller => controller.state == typeFilter);
      break;
    case 5:
      filtered = controllers.filter(controller => controller.state == typeFilter);
      break;
    case 6:
      filtered = controllers.filter(controller => controller.state == 6 || controller.state == 5);
      break;
  }
  
  return filtered;
}

export { 
  LateralPanel,
  BtLateralMenu,
  set_ControllerStatusAndLogo,
  filterControllerMapMarkersByType
};