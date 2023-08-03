// ** React Imports
import { useState, useEffect }  from 'react';

// **  Material Components Imports
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Menu, MenuItem, Fade,
        Drawer, ToggleButtonGroup, ToggleButton, ListItemIcon,
        TextField, Snackbar, FormGroup, FormControlLabel, Checkbox, Switch
      } from '@mui/material';

// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Utils
import { postFetchURL } from 'src/@core/utils/fetchHelper'

const LateralDetailPanel = props => {

  // * Props and states
  const { controller, openDrawer, setOpenDrawer } = props;
  const [state, setState] = useState({ right: openDrawer });
  const [anchorEl, setAnchorEl] = useState();
  const [menuTitle, setMenuTitle] = useState('기준시설 정보');
  
  const [edit, setEdit] = useState(false);

  const [controllerStatus, setControllerStatus] = useState(false);
  const [installedCheckbox, setInstalledCheckbox] = useState(true);
  const [schoolSwitch, setSchoolSwitch] = useState(false);

  // ** Form Delivery
  const [formValues, setFormValues] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = event => { setAnchorEl(event.currentTarget)};
  const handleClose = event => { setAnchorEl(event.target.value)};
  const handleChange = event => {
    let value = event.target.getAttribute('data-option');
    
    if(value == '설정'){
      setEdit(true);
    } else {
      setEdit(false);
    }

    setMenuTitle(value);
    handleClose(event);
  }

  const toogleDrawer = (anchor, open) => event => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
    setControllerStatus(controller.is_installed);
    setState ({...state, [anchor]: openDrawer});

  }
  
  const handleInstallCheckbox = event => {
    let checkBox = event.currentTarget;
    let checked  = checkBox.checked;
    
    setControllerStatus(checked);
    
    if(edit){
      setInstalledCheckbox(checked);
    }
  }

  const handleSwitchSchool = event => {
    let checkBox = event.currentTarget;
    let checked  = checkBox.checked;
    
    if(edit){
      setSchoolSwitch(checked);
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    postFetchURL(
      `${process.env.REACT_APP_APIURL}/login`,
      {user_ID: '1', user_pw:'haha' }
    ).then((response) => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  //***------- UseEffect */
  useEffect(() => {
    if(controller.is_installed  !== undefined ){
      if(controller.is_installed){
        setControllerStatus(controller.is_installed);
      }
      setSchoolSwitch(controller.is_school_zone);
      setInstalledCheckbox(controller.is_installed);
    }
    console.log('value: '+controllerStatus);
  },[controller])

  useEffect(() => {},[controllerStatus])

  //***------- Return >>> */
  return (
    controller.id != null ? (
      <div>
        {openDrawer}
        <Button onClick={toogleDrawer('right',true)}>
          {controller.controller_name}{openDrawer.toString()}
        </Button>
        <Drawer
          className='drawerDetails'
          anchor={'right'}
          open={openDrawer}
          onClose={toogleDrawer('right', false)}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            opacity: '1'
          }}
        >
          <form onSubmit={handleSubmit}>
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
                {'설정 & 상태'}
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
                  onClick={handleChange}
                  TransitionComponent={Fade}
                  sx={{
                    border: '0'
                  }}
                >
                  <MenuItem
                    data-option={'기준시설 정보'}
                  >{'기준시설 정보'}</MenuItem>
                  <MenuItem
                    data-option={'설정'}
                  >{'설정'}</MenuItem>
                  <MenuItem
                    data-option={'상태'}
                  >{'상태'}</MenuItem>
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
                '& .MuiFormGroup-root':{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }
              }}
              
            >
              <FormGroup>
                {/*--- Checkbox Installed  */}
                <FormControlLabel 
                  control={
                    <Checkbox
                      color={'primary'}
                      onChange={handleInstallCheckbox}
                      checked={installedCheckbox}
                      data-controller={controller.id}
                      value={formValues.is_installed} 
                    />
                  }
                  label={'설치 여부'} 
                />
                {/*--- Switch School zone */}
                <FormControlLabel 
                  control={
                    <SchoolZoneSwitch
                      onChange={handleSwitchSchool}
                      checked={schoolSwitch}
                      value={formValues.is_school_zone}
                    />
                  }
                  label={'스쿨존'}
                />
              </FormGroup>
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
                required = {true}
                inputTxt = {'관리번호'}
                valueTxt = {`${controller.local_area_controller_number}번`}
                labelTxt = {'관리번호'}
                edit={edit}
                value={formValues.field_1}
              />
              <TextAndInputComponent
                required = {true}
                inputTxt = {'제어기 No.'}
                valueTxt = {controller.local_goverment_controller_number? controller.local_goverment_controller_number:'-'}
                labelTxt = {'제어기 No.'}
                edit={edit}
                value={formValues.field_2}
              />
              <TextAndInputComponent
                required = {true}
                inputTxt = {'교차로명형태'}
                valueTxt = {controller.controller_name}
                labelTxt = {'교차로명형태'}
                edit={edit}
                value={formValues.field_3}
              />
              <TextAndInputComponent
                required = {false}
                inputTxt = {'관리부서'}
                valueTxt = {controller.controller_management_departnment}
                labelTxt = {'관리부서'}
                edit={edit}
                value={formValues.field_4}
              />
              <TextAndInputComponent
                required = {true}
                inputTxt = {'주소'}
                valueTxt = {controller.controller_address}
                labelTxt = {'주소'}
                edit={edit}
                multiline = {true}
                value={formValues.field_5}
                />
              <TextAndInputComponent
                required = {true}
                inputTxt = {'좌표'}
                valueTxt = {`X: ${controller.map_x}\r\n Y: ${controller.map_y}`}
                labelTxt = {'좌표'}
                multiline = {true}
                edit={edit}
                value={formValues.field_6}
              />
              <TextAndInputComponent
                required = {false}
                inputTxt = {'비고'}
                valueTxt = {controller.bigo}
                labelTxt = {'비고'}
                multiline = {true}
                edit={edit}
                value={formValues.field_7}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'flex-end',
                  paddingTop: 10
                }}
              >
                {!edit?
                  <Button
                    color={'success'}
                    variant={'contained'}
                  >{'상세보기'}</Button>
                  :''}
                {!edit?
                  <Button
                    color={'secondary'}
                    variant={'contained'}
                  >{'민원등록'}</Button>
                  :''}
                {edit?
                  <Button
                    color={'error'}
                    variant={'outlined'}
                  >{'최소'}</Button>
                  :''}
                {edit?
                  <Button
                    color={'success'}
                    variant={'contained'}
                    type='submit'
                  >{'저장'}</Button>
                  :''}
              </Box>
            </Box>
          </form>
        </Drawer>
      </div>
    ):(`Here ${openDrawer}`)
  );
}

const TextAndInputComponent = props => {

  const { inputTxt, valueTxt, labelTxt, multiline = false , edit, required} = props;

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
        },
        '& .textFieldFormDetails .MuiInputBase-root':{
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
        required={required}
        sx ={{width: '60%'}}
        className= 'textFieldFormDetails'
        disabled={!edit}
        label={!edit?labelTxt:''}
        defaultValue={valueTxt}
        variant={!edit?"standard":"outlined"}
        multiline={multiline}
      />
    </Box>
  );
}

const SchoolZoneSwitch =  styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 0,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : 'orange',
        borderRadius: 50,
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
        )}" d="M3,6C1.89,6 1,6.89 1,8V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V12C23,10.89 22.11,10 21,10H19V8C19,6.89 18.11,6 17,6H3M13.5,7.5H17.5V10H13.5V7.5M2.5,7.5H6.5V10H2.5V7.5M8,7.5H12V10H8V7.5M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#ffc8008c',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#777',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="0"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export { LateralDetailPanel };