// ** React Imports
import { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';

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

  const controllerBox = (controller) => {

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



const CountingBar = props => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0, right: 0,
        zIndex: 2,
        backgroundColor:'white',
        border: 'solid 1px #aaa',
        borderRadius: '20px',
        textAlign: 'center',
        width: 'fit-content',
        padding : '0 20px',
        display: 'flex',
        flexDirection: 'row',
        '& .tyCounter': {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Nanum Gothic, dotum, Verdana',
          cursor: 'pointer',
          lineHeight: '50px',
          margin: '0 5px',
          borderWidth: '0px 0px 1px 0px'
        },
        '& #totalCount':{
          color: '#666',
          borderBottom: 'solid 1px #666'
        },
        '& #normalCount':{
          color: 'green',
          borderBottom: 'solid 1px green'
        },
        '& #abnormalCount':{
          color: 'red',
          borderBottom: 'solid 1px red'
        },
        '& #schoolCount':{
          color: 'orange',
          borderBottom: 'solid 1px orange'
        },
        '& #uninstallCount':{
          color: '#777',
          borderBottom: 'solid 1px #777'
        }
      }}
    >
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="totalCount"
        gutterBottom
      >전체지점: 259</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="normalCount"
        gutterBottom
      >정상: 250</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="abnormalCount"
        gutterBottom
      >이상: 9</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="schoolCount"
        gutterBottom
      >스쿨존: 10</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="uninstallCount"
        gutterBottom
      >미설치: 2</Typography>
    </Box>
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

export { 
  LateralPanel,
  CountingBar,
  BtLateralMenu,
  set_ControllerStatusAndLogo
};