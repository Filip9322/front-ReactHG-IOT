// ** React Imports
import { useState, useEffect } from 'react'

// ** Material COmponents Imports
import { Box, Drawer, Button, Tooltip, FormGroup, FormControlLabel, Checkbox,
         Typography } from '@mui/material'

// ** Icon Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'
import WindowClose from 'mdi-material-ui/WindowClose'


// **  Utils
import { postFetchURL } from 'src/@core/utils/fetchHelper'
import { ControllerInformation } from 'src/pages/controller/[local_area]/[controller_larea_id]'
import { TextAndInputComponent } from 'src/pages/map_monitor_location/lateralDetailPanel'

// ** Styles
import { SchoolZoneSwitch } from 'src/@core/styles/school_zone_switch'

const LateralCreateControllerPanel = props =>{
  
  // ** Props and States
  const { openDrawer, setOpenDrawer } = props;
  const [ state, setState ] = useState({ right: openDrawer });
  const [ installedCheckbox, setInstalledCheckbox ] = useState(false);
  const [ schoolSwitch, setSchoolSwitch ] = useState(false);

  // ** Hooks

  // ** Form Delivery
  const [ formValues, setFormValues ] = useState({});

  // ** Handler Functions
  const handleInstallCheckbox = event => {
    let checkBox = event.currentTarget;
    let checked = checkBox.checked;

    setFormValues({...formValues, ['is_installed']: checked });
    setFormValues({...formValues, ['is_active']: checked });
    setInstalledCheckbox(checked);
  }

  const handleSwitchSchool = event => {
    let checkBox = event.currentTarget;
    let checked = checkBox.checked;

    setFormValues({...formValues, ['is_school_zone']: checked });
    setSchoolSwitch(checked);
  }

  const handleChangeInputComponent = event =>{
    const { name, value } = event.target;
    setFormValues({...formValues, [name]: value})
  }

  const toggleDrawer = (anchor, open) => event => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
    setState ({...state, [anchor]: openDrawer});
  }

  // ** UseEffects

  //***------- Return >>> */
  return (
    <Drawer
      className='drawerDetails'
      anchor={'right'}
      open={openDrawer}
      onClose={toggleDrawer('right', false)}
      sx ={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        opacity: '1',
        '& button.IconButtonSVG, & button.CBActionButton':{
          display:'flex',
          marginLeft: '10px',
          position: 'relative',
          alignItems:'center',
          backgroundColor: '#fff',
          ':hover':{ cursor: 'pointer', backgroundColor: 'rgba(241, 74, 74, 0.9)', '& svg':{ color: '#fff'}},
          '& svg':{ color: '#777'}
        }
      }}
    >
      <Tooltip title={"닫기"}>
        <Button
          onClick ={toggleDrawer('right', false)}
          className={'IconButtonSVG'}
          aria-label={'닫기'}
          >
          <WindowClose />
        </Button>
      </Tooltip>
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
        >{'신규 교차로 등록'}</Typography>
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
          {/*--- Checkbox Installed ---*/}
          <FormControlLabel
            control={
              <Checkbox
                color={'primary'} 
                onChange={ handleInstallCheckbox }
                checked={ installedCheckbox }
                value={ formValues.is_installed }
              />
            }
            label={'설치 여부'}
          />
          {/*--- Switch School Zone ---*/}
          <FormControlLabel
            control={
              <SchoolZoneSwitch
                onChange = { handleSwitchSchool } 
                checked = { schoolSwitch }
                value = { formValues.is_school_zone }
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
          name = {'local_area_controller_number'}
          inputTxt = {'관리번호'}
          labelTxt = {'관리번호'}
          edit={true}
          onChange={handleChangeInputComponent}
          value={formValues.local_area_controller_number}
        />
        <TextAndInputComponent
          required = {true}
          name = {'local_goverment_controller_number'}
          inputTxt = {'제어기 No.'}
          labelTxt = {'제어기 No.'}
          edit={true}
          onChange={handleChangeInputComponent}
          value={formValues.local_goverment_controller_number}
        />
        <TextAndInputComponent
          required = {true}
          name = {'controller_name'} 
          inputTxt = {'교차로명형태'}
          labelTxt = {'교차로명형태'}
          edit={true}
          onChange={handleChangeInputComponent}
          value={formValues.controller_name}
        />
        <TextAndInputComponent
          required = {false}
          name = {'controller_management_departnment'}
          inputTxt = {'관리부서'}
          labelTxt = {'관리부서'}
          edit={true}
          onChange={handleChangeInputComponent}
          value={formValues.controller_management_departnment}
        />
        <TextAndInputComponent
          required = {true}
          name = {'controller_address'}
          inputTxt = {'주소'}
          labelTxt = {'주소'}
          edit={true}
          onChange={handleChangeInputComponent}
          multiline = {true}
          value={formValues.controller_address}
        />
        <TextAndInputComponent
          required = {true}
          name = {'map_xy'}
          inputTxt = {'좌표'}
          labelTxt = {'좌표'}
          multiline = {true}
          edit={true}
          onChange={handleChangeInputComponent}
          value={formValues.map_xy}
        />
        <TextAndInputComponent
          required = {false}
          name = {'bigo'}
          inputTxt = {'비고'}
          labelTxt = {'비고'}
          multiline = {true}
          edit={true}
          onChange={handleChangeInputComponent}
          value={formValues.bigo}
        />
      </Box>
    </Drawer>
  )
}

export { LateralCreateControllerPanel };