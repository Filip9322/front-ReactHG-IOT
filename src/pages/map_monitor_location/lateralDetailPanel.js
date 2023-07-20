// ** React Imports
import { useState, useEffect }  from 'react';

// **  Material Components Imports
import { Box, Button, Typography, Menu, MenuItem, Fade,
        Drawer, ToggleButtonGroup, ToggleButton, ListItemIcon,
        TextField, Snackbar
      } from '@mui/material';

// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'

const LateralDeatilPanel = props => {

  // * Props and states
  const { controller } = props;
  const [state, setState] = useState({ right: false });
  const [anchorEl, setAnchorEl] = useState();
  const [menuTitle, setMenuTitle] = useState('기준시설 정보');

  const open = Boolean(anchorEl);
  const handleClick = event => {setAnchorEl(event.currentTarget)};
  const handleClose = event => {
    let menuItem = event.currentTarget;
    let option   = menuItem.getAttribute('data-option');

    console.log(option)
    setAnchorEl(null);
  }

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
          <ToggleButtonGroup
            color='primary'
            value={1}
            exclusive
            aria-label={'지우기'}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'rgba(241,244,249,1)',
              '& .toggleTitle.Mui-disabled': { color: '#392d2d' }
            }}
          >
            <ToggleButton
              className='toggleTitle'
              value='title'
              sx={{
                backgroundColor: 'rgba(230,224,235,1)'
              }}
              disabled
            >
              {'기준시설 정보'}
            </ToggleButton>
            <ToggleButton 
              sx={{
                backgroundColor: 'rgba(255,255,255,1)'
              }}
              value='area'
            >
              <Box
                id='btnSelectController'
                color='secondary'
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
                id = {'selectDetailController'}
                MenuListProps={{'aria-labelledby': 'fade-button'}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{
                  border: '0'
                }}
              >
                <MenuItem
                  data-option={0}
                >{'option 1'}</MenuItem>
                <MenuItem
                  data-option={1}
                >{'option 2'}</MenuItem>
              </Menu>
            </ToggleButton>
          </ToggleButtonGroup>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'rgba(241,244,249,1)'
            }}
          >
            <Typography
              sx = {{
                fontSize: '22px',
                paddingRight: '5px',
                justifySelf: 'center',
                marginTop: 10,
                marginBottom: 5
              }}
              variant='h6'
            >{controller.local_area_controller_number}번 {controller.controller_name}</Typography>
          </Box>
          <Box 
            sx={{
              backgroundColor: 'rgba(241,244,249,1)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: '0 30px'
            }}
          >
            <TextAndInputComponent
              inputTxt = {'관리번호'}
              valueTxt = {`${controller.local_area_controller_number}번`}
              labelTxt = {'관리번호'}
            />
            <TextAndInputComponent
              inputTxt = {'제어기 No.'}
              valueTxt = {controller.local_goverment_controller_number? controller.local_goverment_controller_number:'-'}
              labelTxt = {'제어기 No.'}
            />
            <TextAndInputComponent
              inputTxt = {'교차로명형태'}
              valueTxt = {controller.controller_name}
              labelTxt = {'교차로명형태'}
            />
            <TextAndInputComponent
              inputTxt = {'관리부서'}
              valueTxt = {controller.controller_management_departnment}
              labelTxt = {'관리부서'}
            />
            <TextAndInputComponent
              inputTxt = {'주소'}
              valueTxt = {controller.controller_address}
              labelTxt = {'주소'}
              multiline = {true}
              />
            <TextAndInputComponent
              inputTxt = {'좌표'}
              valueTxt = {`X: ${controller.map_x}\r\n Y: ${controller.map_y}`}
              labelTxt = {'좌표'}
              multiline = {true}
            />
            <TextAndInputComponent
              inputTxt = {'비고'}
              valueTxt = {controller.bigo}
              labelTxt = {'비고'}
              multiline = {true}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
                paddingTop: 10
              }}
            >
              <Button
                color={'success'}
                variant={'contained'}
              >{'상세보기'}</Button>
              <Button
                color={'secondary'}
                variant={'contained'}
              >{'민원등록'}</Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    ):('Here')
  );
}

const TextAndInputComponent = props => {

  const { inputTxt, valueTxt, labelTxt, multiline = false } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        '& .textFieldFormDetails .MuiInputBase-root input': {
          color: '#777',
          WebkitTextFillColor: '#777',
          backgroundColor: 'white'
        },
        '& .textFieldFormDetails .MuiInputBase-root textarea': {
          color: '#777',
          WebkitTextFillColor: '#777',
          backgroundColor: 'white'
        }
      }}
    >
      <Typography
        sx = {{
          paddingRight: '5px'
        }}
      >{inputTxt}</Typography>
      <TextField
        sx ={{width: '60%'}}
        className= 'textFieldFormDetails'
        disabled
        label={labelTxt}
        defaultValue={valueTxt}
        variant="standard"
        multiline={multiline}
      />
    </Box>
  );
}

export { LateralDeatilPanel };