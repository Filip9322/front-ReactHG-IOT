// ** React Imports
import { useState, useEffect } from 'react'
import { useDaumPostcodePopup  } from 'react-daum-postcode';

// ** Material COmponents Imports
import { styled } from '@mui/material/styles';
import { Box, Drawer, Button, Tooltip, FormGroup, FormControlLabel, Checkbox,
         Typography, TextField, Select, MenuItem, InputLabel } from '@mui/material'

// ** Next Import
import { useRouter } from 'next/router'

// ** Icon Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'
import WindowClose from 'mdi-material-ui/WindowClose'
import MapMarker from 'mdi-material-ui/MapMarker'
import Magnify from 'mdi-material-ui/Magnify'


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
  const [ openEquiStatus, setOpenEquiStatus ] = useState(false);
  const [ schoolSwitch, setSchoolSwitch ] = useState(false);
  const [ address, setAddress ] = useState('');
  const [ map_x, setMap_x ] = useState('');
  const [ map_y, setMap_y ] = useState('');
  const [ mapKey, setMapKey ] = useState(1);
  const [ formKey, setFormKey ] = useState(mapKey + 10);

  
  // - Form Values
  const initialValues ={
    is_IOT: false,
    is_installed: installedCheckbox,
    is_school_zone: schoolSwitch,
    local_area_controller_number: 0,
    local_goverment_controller_number: 0,
    controller_name: '',
    controller_management_department: '',
    controller_address: '',
    controller_type_name: '',
    map_x: map_x,
    map_y: map_y,
    bigo: ''
  };
  const [ formValues, setFormValues ] = useState( initialValues );
  const [ controller, setController ] = useState( initialValues );
  const [ values , setValues ] = useState({
    local_area_controller_number: '',
    local_goverment_controller_number: '',
    controller_name: '',
    errors: {
      local_area_controller_number_hasError: false,
      local_goverment_controller_number_hasError: false,
      controller_name_hasError: false,
      controller_type_name_hasError: false,
      controller_address_hasError: false
    }
  })
  
  // ** Hooks
  const router = useRouter();
  const  openDaum = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
  
  
  // ** Async Functions
  async function fetchCreateController(){
    //setSpinner(true);
    postFetchURL(
      `${process.env.REACT_APP_APIURL}/map_controllers/${router.query.local_area}/${router.query.device_type}/create`,
      formValues
    ).then(response => {
      if(response){
        if(response.code){
          let code = parseInt(response.code);
          let errorMessage = '';
          switch (code){
            case 100: errorMessage = '잘못된 요청: 관리번호 가 제공되지 않았습니다.';
              break;
            case 101: errorMessage = `잘못된 요청: 관리번호 ${formValues.local_area_controller_number}이 이미 데이터베이스에 존재합니다.`;
              break;
            default: break;
          }
          // Update Errors
          let errors = {
            local_area_controller_number_hasError: true
          };

          setValues({...values, local_area_controller_number : errorMessage, errors: errors});

          console.log(values);
        }
        console.log(response);
      }
    }).catch(error => {
      if (error) console.error(error);
    }).finally(() => {
      //setSpinner(false);
    })
  }

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
    setFormValues({...formValues, [name]: value});

    if(value != '' || value != 0) {
      let errors = values.errors;
      errors[name+'_hasError'] = false;
      setValues({...values, errors: errors});
    }
  }

  const resetForm = () => {
    let resetValues = {
      local_area_controller_number: 0,
      local_goverment_controller_number: 0,
      controller_name: '',
      controller_type_name: '',
      controller_management_department: '',
      controller_address: '',
      map_x: '',
      map_y: '',
      bigo: ''
    };
    setFormValues(resetValues);
  }

  const resetErrors = () => {
    let errors = {
      local_area_controller_number_hasError: false,
      local_goverment_controller_number_hasError: false,
      controller_name_hasError: false,
      controller_type_name_hasError: false,
      controller_address_hasError: false
    }
    setValues({...values, errors: errors});
  }

  const toggleDrawer = (anchor, open) => event => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(open == false){
      setAddress('');
      setMap_x('');
      setMap_y('');
      setSchoolSwitch(false);
      setInstalledCheckbox(false);
      setMapKey( mapKey + 1 );
      setController({map_x: '', map_y: ''});
      
      resetErrors();
      resetForm();
      
      setOpenEquiStatus(false);
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
  
    setAddress(fullAddress);

    handleGeocoder(data.address, fullAddress);

  }

  const handleGeocoder = (address, fullAddress) => {
    var Geocoder = new window.daum.maps.services.Geocoder();
    
    if(Geocoder){
      Geocoder.addressSearch(address, (result, status)  =>{
        if( status === kakao.maps.services.Status.OK){
          setMap_x( result[0].y );
          setMap_y( result[0].x );
          setFormValues({...formValues, 
            ['map_x']: parseFloat(result[0].y),
            ['map_y']: parseFloat(result[0].x),
            ['controller_address']: fullAddress });
          setMapKey( mapKey + 1 );
          setController({map_x: result[0].y, map_y: result[0].x});
          setOpenEquiStatus(true);
        }
      });
    }
  }

  const handleClickMapMarkerIcon = event => {
    event.preventDefault();
    setOpenEquiStatus(true);
  }

  // Save New Controller
  const handleSaveNewController = event => {
    event.preventDefault();

    console.log(formValues);
    try{
      let validateSubmit = false;

      // Check Errors
      let errors = validate(formValues);
      setValues({errors: errors});

      console.log(errors);
      
    } catch (error){
      console.log(error);
    }
    fetchCreateController();
  }

  const validate = formValues => {
    let errors =  {};

    if(formValues.local_area_controller_number == 0 ||
       formValues.local_area_controller_number == undefined ){
      errors.local_area_controller_number_hasError = true;
    } else errors.local_area_controller_number_hasError = false;

    if(formValues.local_goverment_controller_number == 0 ||
      formValues.local_goverment_controller_number == undefined ){
      errors.local_goverment_controller_number_hasError = true;
    } else errors.local_goverment_controller_number_hasError = false;

    if(formValues.controller_name == '' ||
       formValues.controller_name == undefined ){
      errors.controller_name_hasError = true;
    } else errors.controller_name_hasError = false;

    if(formValues.controller_address == '' ||
       formValues.controller_address == undefined ){
      errors.controller_address_hasError = true;
    } else errors.controller_address_hasError = false;

    if(formValues.controller_type_name != '표지판명' || formValues.controller_type_name != '지도명'){
      errors.controller_type_name_hasError = true;
    }
    return errors;
  }

  const handleClickSaveLocationMapMarker = event => {
    console.log('click Mapmarker');
    setOpenEquiStatus(false);
  }

  const handleClickCreateControllerMapMarker = event => {
  }

  const UpdateNewLocationMapMarker = newLoc => {
    setMap_x( newLoc.lat );
    setMap_y( newLoc.lng );

    setController({map_x: newLoc.lat, map_y: newLoc.lng});
    setFormValues({...formValues, ['map_x']: newLoc.lat });
    setFormValues({...formValues, ['map_y']: newLoc.lng });
  }

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
          display: 'flex'
        }}
      >
        { openEquiStatus ? 
        <Box>
          <ControllerInformation
            controller={ controller }
            openEquiStatus={ openEquiStatus }
            setOpenEquiStatus={ setOpenEquiStatus }
            draggable = { true }
            action = {'create'}
            key = { mapKey }
            handleClickSaveLocationMapMarker = {handleClickSaveLocationMapMarker}
            UpdateNewLocationMapMarker = {UpdateNewLocationMapMarker}
            />
        </Box>
        : ''}
        <Box
          key = { formKey }
        >
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
              create={true} edit ={ true }
              onChange={handleChangeInputComponent}
              value={formValues.local_area_controller_number}
              textError={values.local_area_controller_number}
              error={values.errors['local_area_controller_number_hasError']}
            />
            <TextAndInputComponent
              required = {true}
              name = {'local_goverment_controller_number'}
              inputTxt = {'제어기 No.'}
              labelTxt = {'제어기 No.'}
              create={true} edit ={ true }
              onChange={handleChangeInputComponent}
              value={formValues.local_goverment_controller_number}
              error={values.errors['local_goverment_controller_number_hasError']}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px',
                '& .MuiSelect-select':{
                  color: '#777',
                  WebkitTextFillColor: '#777',
                  backgroundColor: 'white'
                },
                '& .MuiFormLabel-root ':{
                  color: '#777'
                }
              }}
            >
              
              <InputLabel id="select-controller_type_name">{'도로형태'}</InputLabel>
              <Select
                labelId="select-controller_type_name"
                name ={'controller_type_name'}
                value={formValues.controller_type_name.length !== 0 ? formValues.controller_type_name : `도로형태 선택: `}
                onChange={handleChangeInputComponent}
                inputProps={{ readOnly: false }}
                sx ={{width: '60%'}}
                required = {true}
                error = {values.errors['controller_type_name_hasError']}
              >
                <MenuItem disabled selected value="도로형태 선택: "><em>도로형태 선택: </em></MenuItem>
                <MenuItem value={'지도명'}>{'지도명'}</MenuItem>
                <MenuItem value={'표지판명'}>{'표지판명'}</MenuItem>
              </Select>
            </Box>
            <TextAndInputComponent
              required = {true}
              name = {'controller_name'} 
              inputTxt = {'교차로명형태'}
              labelTxt = {'교차로명형태'}
              create={true} edit ={ true }
              onChange={handleChangeInputComponent}
              value={formValues.controller_name}
              error={values.errors['controller_name_hasError']}
            />
            <TextAndInputComponent
              required = {false}
              name = {'controller_management_department'}
              inputTxt = {'관리부서'}
              labelTxt = {'관리부서'}
              create={true} edit ={ true }
              onChange={handleChangeInputComponent}
              value={formValues.controller_management_department}
              error={values.errors['controller_management_department_hasError']}
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
                  value= {formValues.controller_address}            
                  className= 'textFieldFormDetails'
                  variant={"outlined"}
                  multiline = {true}
                  sx ={{ width: '100%' }}
                  onChange={handleChangeInputComponent}
                  error={values.errors['controller_address_hasError']}
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
                  value = { formValues.map_x }
                  name =  {'map_x'}
                  label = { map_x ? '': 'X: '}
                  required = {true}
                  className= 'textFieldFormDetails'
                  sx ={{ width: '100%', padding: '0 0 0 2px' }}
                  onChange={handleChangeInputComponent}
                  error={values.errors['controller_address_hasError']}
                />
                <TextField
                  disabled
                  value = { formValues.map_y }
                  name  = {'map_y'}
                  label = { map_y ? '': 'Y: '}
                  required = {true}
                  className= 'textFieldFormDetails'
                  sx ={{ width: '100%', padding: '0 0 0 2px' }}
                  onChange={handleChangeInputComponent}
                  error={values.errors['controller_address_hasError']}
                />
                <Tooltip>
                  <Button
                    onClick={ handleClickMapMarkerIcon }
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
              create={true} edit ={ true }
              onChange={ handleChangeInputComponent }
              multiline = {true}
              value={formValues.bigo}
            />
            <Tooltip title={"저장"}>
              <Button
                onClick ={ handleSaveNewController }
                aria-label={'저장'}
                color={'success'}
                variant={'contained'}
                type='submit'
              >{'저장'}</Button>
            </Tooltip>
          </Box>
        </Box>
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