// ** React Imports
import { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';

// **  Material Components Imports
import { Box, Button, Typography,
        Drawer , TextField, Autocomplete,
        ToggleButtonGroup, ToggleButton,
        Card, CardContent, CardMedia,
        Menu, MenuItem, Fade, ListItemIcon
      } from '@mui/material';

// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'      
import { padding } from '@mui/system';

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

const DrawerListControllers = props => {

  // * Props and states
  const { controllers } = props;
  const [controllersFiltered, setControllersFiltered] = useState(controllers);
  const [state, setState] = useState({ right: false });
  const [anchorEl, setAnchorEl] = useState();
  const [menuSelected, setMenuSelected] = useState(0);
  const [menuTitle, setMenuTitle] = useState('전체');
  
  const open = Boolean(anchorEl);
  const handleClick = event => {setAnchorEl(event.currentTarget)};
  const handleClose = event => {
    let menuItem = event.currentTarget;
    let type  = menuItem.getAttribute('data-type');
    let title = menuItem.getAttribute('data-title');

    setMenuTitle(title);
    setMenuSelected(parseInt(type));
    setAnchorEl(null)
  };

  const toogleDrawer = (anchor, open) => event => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState ({...state, [anchor]: open});
  }

  useEffect(() => {
    setControllersFiltered(controllers);
  },[controllers])

  useEffect(()=>{
    console.log(menuSelected);
    switch(menuSelected){
      case 1: 
        let filtered_1 = controllers.filter(controller => 
          controller.is_installed && controller.is_active && !controller.has_abnormalities)
        setControllersFiltered(filtered_1);
        break;
      case 2: 
        let filtered_2 = controllers.filter(controller => 
          controller.is_installed && controller.is_active && controller.has_abnormalities)
        setControllersFiltered(filtered_2);
        break;
      case 3: 
        let filtered_3 = controllers.filter(controller => 
          controller.is_installed && controller.is_active && !controller.has_abnormalities && controller.is_school_zone)
        setControllersFiltered(filtered_3);
        break;
      case 4: 
        let filtered_4 = controllers.filter(controller => 
          controller.is_installed && controller.is_active && controller.has_abnormalities && controller.is_school_zone)
        setControllersFiltered(filtered_4);
        break;
      case 5: 
        let filtered_5 = controllers.filter(controller => 
          controller.is_installed && !controller.is_active)
        setControllersFiltered(filtered_5);
        break;
      case 6: 
        let filtered_6 = controllers.filter(controller => 
          !controller.is_installed )
        setControllersFiltered(filtered_6);
        break;
      default: 
        setControllersFiltered(controllers);
        console.log(controllersFiltered.length);
        break;
    }
  },[menuSelected]);

  useEffect(() =>{}, [controllersFiltered]);

  //** Return SubComponent ControllerBox Start */
  const ControllerBox = props => {
    const { controller } = props;
    const [state, setState] = useState(0);
    const [iconController, setIconController] = useState('icon_on');
    
    useEffect(()=> {
      if (controller.is_installed){
        if(controller.is_active){
          // Check School Zone
          if(controller.is_school_zone){
            if(controller.has_abnormalities){
            setState
              setState(4); // State 4: School Zone with abnormalities - Yellow and Red
              setIconController('icon_school_error');              
            } else {
              setState(3); // State 3: School Zone NO abnormalities - Yellow
              setIconController('icon_school');
            }
          }
          // Check 일반 if have or not abnormality
          if(controller.has_abnormalities){
            setState(2); // State 2: Active Abnormal State - Red
            setIconController('icon_err');
          }else {
            setState(1); // State 1: Active Normal State - Green
            setIconController('icon_on');
          }
        } else {
          setState(5); // State 5: UnActtive Installed State - Gray
          setIconController('icon_off');
        }
      } else {
        setState(6); // State 6: Not installed - Gray
        setIconController('icon_off');
      }
    },[])
    //** Return SubComponent ControllerBox End */

    //** Return DrawerListComponent Start */
    return(
      <Card
        sx={{ 
          maxWidth: 345,
          display: 'flex',
          alignItems:'center',
          backgroundColor: '#eaeaea',
          margin: '5px',
          borderRadius: '20px',
          minHeight: '128px'
        }}>
        <CardMedia
          sx={{ height: 40, width:'50px', height: '50px' }}
          image={`/icon/${iconController}.png`}
          title='지우기'
        />
        <CardContent
          sx={{
            '& div.text': {fontSize: '12px'},
            '& div.title': {fontWeight: 'bold'}
          }}
        >
          <Typography className='text title' gutterBottom variant='h7' component='div'>
            {controller.id + '. ' + controller.controller_name}
          </Typography>
          <Typography className='text' gutterBottom component='div'>
            교차로상태: 정상
          </Typography>
          <Typography className='text' gutterBottom component='div'>
            설치대수: 0
          </Typography>
          <Typography className='text' gutterBottom component='div'>
            이상건수: 0
          </Typography>
          <Typography className='text' gutterBottom component='div'>
            발생시간: 2019-02-19 14:41
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    controllers.length > 0 ? (
      <Box>
        <Button onClick={toogleDrawer('right',true)}>
          HERE
        </Button>
        <Drawer
          anchor={'right'}
          sx={{width: '300px'}}
          open={state['right']}
          onClose={toogleDrawer('right', false)}
        >
          <ToggleButtonGroup
            color="primary"
            value={1}
            exclusive
            aria-label="지우기"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              '& .toogleTitle.Mui-disabled': {color: '#392d2d'}
            }}
          >
            <ToggleButton
              className='toogleTitle'
              value="title" 
              disabled
            >교차로 상태 정보</ToggleButton>
            <ToggleButton value="area">
              <Box 
                id="btnSelectTypeController"
                color="secondary"
                aria-controls={open ? 'basic-menu': undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true': undefined}
                onClick={handleClick}
              >
                {menuTitle}
                <ListItemIcon>
                  <ChevronDown fontSize='small' />
                </ListItemIcon>
              </Box>
              <Menu
                id="selectStatusController"
                MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{
                  '& .normal':{
                    color: 'green',
                  },
                  '& .abnormal':{
                    color: 'red',
                  },
                  '& .school':{
                    color: 'orange',
                  },
                  '& .uninstall':{
                    color: '#777',
                  }
                }}
              >
                <MenuItem 
                  data-type={0} data-title={'전체'}
                  className='title' onClick={handleClose}>전체</MenuItem>
                <MenuItem data-type={1} data-title={'정상'}
                  className='normal' onClick={handleClose}>정상</MenuItem>
                <MenuItem data-type={2} data-title={'이상'}
                  className='abnormal' onClick={handleClose}>이상</MenuItem>
                <MenuItem data-type={3} data-title={'스쿨존'}
                  className='school' onClick={handleClose}>스쿨존</MenuItem>
                <MenuItem data-type={6} data-title={'미설치'}
                  className='uninstall' onClick={handleClose}>미설치</MenuItem>
              </Menu>
            </ToggleButton>
          </ToggleButtonGroup>
          {/** List Controllers */}
          {
            controllersFiltered.map((controller,index) => {
              return(
                <ControllerBox key={index} controller={controller} />
              )
            })
          }
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


const SearchBar = props => {
  const { controllersNames, updateSearchedController } = props;

  useEffect(()=>{
    //console.log(controllersNames.length);
  },[props]);

  const textFieldInput = params => {
    return (
      <TextField {...params} 
        label='제우기 검색:' 
        variant='outlined'
        sx={{
          '& fieldset.MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px #aaa'
          }
        }}
      />
    )
  }

  return (
    <Autocomplete
      id='searchField'
      sx={{
        width: 300, 
        zIndex: 2 ,
        backgroundColor: 'white'
      }}
      clearOnBlur
      autoHighlight
      onChange={(event, newValue) => {
        console.log(newValue);
        if(newValue){
          updateSearchedController(newValue.id);
        }
        //setTimeout(() => { debugger; }, 5000);
      }}
      onClick={(event)=>{event.preventDefault()}}
      getOptionLabel={(option) => {
        return option.name;
      }}
      options={controllersNames.map(controller => controller)}
      renderInput={params => (textFieldInput(params))}
      renderOption={(props, controller) => (
        <li {...props} key={controller.id} value={controller.id}>{controller.name}</li>
      )}
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
  DrawerListControllers,
  CountingBar,
  SearchBar,
  BtLateralMenu
};