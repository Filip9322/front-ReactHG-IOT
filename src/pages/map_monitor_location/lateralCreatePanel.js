// ** React Imports
import { useState, useEffect } from 'react'
import { useDaumPostcodePopup  } from 'react-daum-postcode';

// ** Material COmponents Imports
import { styled } from '@mui/material/styles';
import { Box, Drawer, Button, Tooltip, FormGroup, FormControlLabel, Checkbox,
         Typography, TextField } from '@mui/material'

// ** Icon Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'
import WindowClose from 'mdi-material-ui/WindowClose'
import MapMarker from 'mdi-material-ui/MapMarker'
import Magnify from 'mdi-material-ui/Magnify'


// **  Utils
import { postFetchURL } from 'src/@core/utils/fetchHelper'
import { ControllerInformation } from 'src/pages/controller/[local_area]/[controller_larea_id]'
import { TextAndInputComponent } from 'src/pages/map_monitor_location/lateralDetailPanel'

import { useKakaoLoader } from 'src/@core/utils/kakao_map_api'

// ** Styles
import { SchoolZoneSwitch } from 'src/@core/styles/school_zone_switch'

const LateralCreateControllerPanel = props =>{
  // ** Load Kakao Maps SDK
  const [loading, error] = useKakaoLoader();

  // ** Props and States
  const { openDrawer, setOpenDrawer } = props;
  const [ state, setState ] = useState({ right: openDrawer });
  const [ installedCheckbox, setInstalledCheckbox ] = useState(false);
  const [ schoolSwitch, setSchoolSwitch ] = useState(false);
  const [ address, setAddress ] = useState('');
  const [ map_x, setMap_x ] = useState('');
  const [ map_y, setMap_y ] = useState('');

  // ** Hooks
  const  openDaum = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

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
    if(open == false){
      setAddress('');
      setMap_x('');
      setMap_y('');
    }

    setOpenDrawer(open);
    setState ({...state, [anchor]: openDrawer});
  }

  const handleClickSearchAddress = event => {
    event.preventDefault();
    openDaum({onComplete: handleCompleteDaum});
  }

  const handleCompleteDaum = data => {
    let fullAddress = data.address;
    let extraAddress = '';

    if(data.addressType = 'R'){
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== ''){
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}`: data.buildingName;
      }
      fullAddress += extraAddress !==''? `(${extraAddress})`: '';
    }
    handleGeocoder(data.address);

    setAddress(fullAddress);
  }

  const handleGeocoder = address => {
    var Geocoder = new window.daum.maps.services.Geocoder();
    
    if(Geocoder){
      Geocoder.addressSearch(address, (result, status)  =>{
        if( status === kakao.maps.services.Status.OK){
          setMap_x( result[0].x );
          setMap_y( result[0].y );
        }
      });
    }
  }


  // ** UseEffects
  useEffect(() =>{
    console.log('Loaded KakaoMap SDK: '+ loading)
  },[error])
  

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
        <BoxStyled>
          <Typography>
            {'주소'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '60%'
            }}
          >
            <TextField
              disabled
              required = {true}
              name = {'controller_address'}
              label= {address ? '': '주소 검색'}
              value= {address}            
              className= 'textFieldFormDetails'
              variant={"outlined"}
              multiline = {true}
              sx ={{ width: '100%' }}
            />

            <Tooltip>
              <Button
                onClick = { handleClickSearchAddress }
                className = { 'ButtonIconSVG' }
              >
                <Magnify />
              </Button>
            </Tooltip>
          </Box>
        </BoxStyled>
        <BoxStyled>
          <Typography>
            {'좌표'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '60%'
            }}
          >
            <TextField
              disabled
              value = { map_x }
              name =  {'map_x'}
              label = { map_x ? '': 'X: '}
              required = {true}
              className= 'textFieldFormDetails'
              sx ={{ width: '100%', padding: '0 0 0 2px' }}
            />
            <TextField
              disabled
              value = { map_y }
              name  = {'map_y'}
              label = { map_y ? '': 'Y: '}
              required = {true}
              className= 'textFieldFormDetails'
              sx ={{ width: '100%', padding: '0 0 0 2px' }}
            />
            <Tooltip>
              <Button
                className = { 'ButtonIconSVG' }
              >
                <MapMarker />
              </Button>
            </Tooltip>
          </Box>
        </BoxStyled>
        <TextAndInputComponent
          required = {true}
          name = {'bigo'}
          inputTxt = {'비고'}
          labelTxt = {'비고'}
          edit={true}
          onChange={handleChangeInputComponent}
          multiline = {true}
          value={formValues.bigo}
        />
      </Box>
    </Drawer>
  )
}

const BoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px',
  '& p': { paddingRight: '5px' },
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
  '& .textFieldFormDetails .MuiInputBase-root fieldset':{
    borderColor: 'rgba(58, 53, 65, 0.22)'
  },
  '& .textFieldFormDetails .MuiInputBase-root':{
    backgroundColor: 'white'
  }, 
  '& button.ButtonIconSVG': {
    display:'flex',
    marginLeft: '10px',
    position: 'relative',
    alignItems:'center',
    backgroundColor: '#dfdfdf',
    ':hover':{ cursor: 'pointer', backgroundColor: 'rgba(241, 74, 74, 0.9)', '& svg':{ color: '#fff'}},
    '& svg':{ color: '#777'}
  }
}));

export { LateralCreateControllerPanel };