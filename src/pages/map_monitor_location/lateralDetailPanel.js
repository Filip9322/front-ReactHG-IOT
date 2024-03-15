// ** React Imports
import { useState, useEffect, forwardRef }  from 'react';

// **  Material Components Imports
import { Box, Button, Typography, Menu, MenuItem, Fade,
        Drawer, ToggleButtonGroup, ToggleButton, ListItemIcon,
        TextField, Snackbar, Alert, FormGroup, FormControlLabel, Checkbox
      } from '@mui/material';

// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Server from 'mdi-material-ui/Server'

// ** Utils
import { putFetchURL } from 'src/@core/utils/fetchHelper'
import { ControllerInformation } from 'src/pages/controller/[local_area]/[controller_larea_id]'
 
// ** Styles
import { SchoolZoneSwitch } from 'src/@core/styles/school_zone_switch'

// ** Forward React Reference
/*const Alert = forwardRef( function Alert(props, ref ) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})*/

const LateralDetailPanel = props => {

  // * Props and states
  const { controller, openDrawer, setOpenDrawer } = props;
  const [ openEquiStatus, setOpenEquiStatus ] = useState(false);

  const [ openSnackbar , setOpenSnackbar ]    = useState(false);
  const [ isErrorSaving, setIsErrorSaving ]   = useState(false);
  
  const [state, setState] = useState({ right: openDrawer });
  const [anchorEl, setAnchorEl] = useState();
  const [menuTitle, setMenuTitle] = useState('기준시설 정보');
  
  const initialFormValues = {
    'local_goverment_controller_number' : controller.local_goverment_controller_number,
    'controller_name local_area_controller_number': controller.local_area_controller_number,
    'controller_name': controller.controller_name,
    'controller_management_departnment': controller.controller_management_departnment,
    'controller_address': controller.controller_address,
    'map_x': controller.map_x,
    'map_y': controller.map_y,
    'bigo': controller.bigo
  }
  const [formController, setFormController] = useState(initialFormValues);
  const [edit, setEdit] = useState(false);
  const [formKey, setFormKey] = useState(21);
  const [mapKey, setMapKey] = useState(1)

  const [controllerStatus, setControllerStatus] = useState(false);
  const [installedCheckbox, setInstalledCheckbox] = useState(true);
  const [schoolSwitch, setSchoolSwitch] = useState(false);

  // ** Form Delivery
  const [formValues, setFormValues] = useState({id: controller.id});
  const [isSubmitting, setIsSubmitting] = useState(false);


  // ** handlers Functions ~~
  const open = Boolean(anchorEl);
  const handleClick = event => { setAnchorEl(event.currentTarget)};
  const handleClose = event => { setAnchorEl(event.target.value)};
  const handleChange = event => {
    let value = event.target.getAttribute('data-option');
    
    if(value != null){
      if(value == '설정'){
        setEdit(true);
      } else {
        setEdit(false);
      }

      if(value == '상태'){
        setOpenEquiStatus(true);
      } else {
        setOpenEquiStatus(false);
      }
    
      setMenuTitle(value);
    }
    handleClose(event);
  }
  
  const handleClickCancel = event =>{
    setOpenDrawer(false);
  }
  
  const handleInstallCheckbox = event => {
    let checkBox = event.currentTarget;
    let checked  = checkBox.checked;
    
    setControllerStatus(checked);
    
    if(edit){
      setFormValues({...formValues, ['is_installed']: checked});
      setFormValues({...formValues, ['is_active']: checked});
      setInstalledCheckbox(checked);
    }
  }

  const handleSwitchSchool = event => {
    let checkBox = event.currentTarget;
    let checked  = checkBox.checked;
    
    if(edit){
      setFormValues({...formValues, ['is_school_zone']: checked});
      setSchoolSwitch(checked);
    }
  }

  const handleChangeInputComponent = event => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  }

  const handleSubmit = event => {
    event.preventDefault();
    try{
      let validateSubmit = false;

      // Check errors
      let errors = validate(formValues);
      setFormValues({...formValues, errors: errors });

      validateSubmit = true;

      //setFormErrors(validateSubmit);
      setFormValues({...formValues, ['id']: controller.id});
      setIsSubmitting(validateSubmit);  

    } catch (error) {
      if(error !== undefined )console.log(error)
    }
  }

  const handleOpenEquiStatus = (event) => {
    event.preventDefault();
    try{
      setOpenEquiStatus(true);
      setMapKey( mapKey + 1 );
    }catch(error){
      if(error !== undefined ) console.log(error);
    }
  }
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickanyway') {
      return;
    }

    setOpenSnackbar(false);
  }

  const toogleEquiStateDrawer = (anchor, open) => event => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    //setOpenDrawer(false);
    setOpenEquiStatus(open);
  }

  const toogleDrawer = (anchor, open) => event => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
    setControllerStatus(controller.is_installed);
    setState ({...state, [anchor]: openDrawer});

  }
  
  const postControllerForm = () =>{
    putFetchURL(
      `${process.env.REACT_APP_APIURL}/api/controllers/${controller.id}`,
      {...formValues}
    ).then((response) => {
      setIsSubmitting(false);
      console.log(response);
    }).catch(error => {
      if(error){
        console.error(error);
        setIsErrorSaving(true);
        setIsSubmitting(false);
      }
    }).finally(() =>{
      updateInitialValues();
      setOpenSnackbar(true);
      resetDrawerInfo();
    })
  }

  const validate = formValues => { 
    // TODO validate data to send to update controller info
    let errors = {};

    // 정규식 표현 - Regular expressions
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    return errors;
  }

  const resetDrawerInfo = () => {
    setFormController(initialFormValues);
    setMenuTitle('기준시설 정보');
    setEdit(false);
  }

  const updateInitialValues = () => {
    for (const element of Object.keys(formValues))
    {
      if (element != 'id'){
        initialFormValues[element] = formValues[element];
      }
    }
  }

  //***------- UseEffect */
  useEffect(() => {
    if(controller.is_installed  !== undefined ){
      
      if(controller.is_installed){
        setControllerStatus(controller.is_installed);
      }
      setSchoolSwitch(controller.is_school_zone);
      setInstalledCheckbox(controller.is_installed);

      setFormController({...formController, ...controller});
      setFormKey(formKey + 1);
    }
  },[controller])

  useEffect(() => {
    if(isSubmitting){
      postControllerForm();
    }
  }, [isSubmitting]);

  useEffect(() => {
    resetDrawerInfo();
  },[openDrawer]);

  useEffect(() => {
    if(openEquiStatus){
      setMenuTitle('상태');
    }
  }, [openEquiStatus] );

  //***------- Return >>> */
  return (
    controller.id != null ? (
      <div>
        <Button 
          onClick={toogleDrawer('right',true)}
          variant={'contained'}
          sx={{
            zIndex:4
          }}
        >
          <Server fontSize='medium' /> {controller.controller_name}
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
          <form
            hidden={ openEquiStatus }
            onSubmit={ handleSubmit }
            key ={ formKey }
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
                name = {'local_area_controller_number'}
                inputTxt = {'관리번호'}
                valueTxt = {`${controller.local_area_controller_number}번`}
                labelTxt = {'관리번호'}
                onChange={handleChangeInputComponent}
                value={formValues.field_1}
              />
              <TextAndInputComponent
                required = {true}
                name = {'local_goverment_controller_number'}
                inputTxt = {'제어기 No.'}
                valueTxt = {formController.local_goverment_controller_number? formController.local_goverment_controller_number:'-'}
                labelTxt = {'제어기 No.'}
                edit={edit}
                onChange={handleChangeInputComponent}
                value={formValues.field_2}
              />
              <TextAndInputComponent
                required = {true}
                name = {'controller_name'} 
                inputTxt = {'교차로명형태'}
                valueTxt = {formController.controller_name}
                labelTxt = {'교차로명형태'}
                edit={edit}
                onChange={handleChangeInputComponent}
                value={formValues.field_3}
              />
              <TextAndInputComponent
                required = {false}
                name = {'controller_management_departnment'}
                inputTxt = {'관리부서'}
                valueTxt = {formController.controller_management_departnment}
                labelTxt = {'관리부서'}
                edit={edit}
                onChange={handleChangeInputComponent}
                value={formValues.field_4}
              />
              <TextAndInputComponent
                required = {true}
                name = {'controller_address'}
                inputTxt = {'주소'}
                valueTxt = {formController.controller_address}
                labelTxt = {'주소'}
                edit={edit}
                onChange={handleChangeInputComponent}
                multiline = {true}
                value={formValues.field_5}
                />
              <TextAndInputComponent
                required = {true}
                name = {'map_xy'}
                inputTxt = {'좌표'}
                valueTxt = {`X: ${formController.map_x}\r\nY: ${formController.map_y}`}
                labelTxt = {'좌표'}
                multiline = {true}
                edit={edit}
                onChange={handleChangeInputComponent}
                value={formValues.field_6}
              />
              <TextAndInputComponent
                required = {false}
                name = {'bigo'}
                inputTxt = {'비고'}
                valueTxt = {formController.bigo}
                labelTxt = {'비고'}
                multiline = {true}
                edit={edit}
                onChange={handleChangeInputComponent}
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
                    onClick={handleOpenEquiStatus}
                    data-larea={controller.local_area_id}
                    data-controller-la-id={controller.local_area_controller_number}
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
                    onClick={handleClickCancel}
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
          <Box
            //hidden={!openEquiStatus}
            sx={{display:openEquiStatus?'':'none'}}
          >
            <ControllerInformation
              draggable = { false }
              controller={ controller }
              openEquiStatus={ openEquiStatus }
              setOpenEquiStatus={ setOpenEquiStatus }
              action = {'view'}
              key = {mapKey}
            />
          </Box>
          <Snackbar 
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            {isErrorSaving? 
              <Alert onClose={handleSnackbarClose} severity="error" variant='filled'> 저장 실페됬어요! </Alert> :
              <Alert onClose={handleSnackbarClose} severity="success" variant='filled'> 저장 완료됬어요! </Alert>
            }
          </Snackbar>
        </Drawer>
      </div>
    ):('')
  );
}

const TextAndInputComponent = props => {

  const { name, inputTxt, valueTxt, labelTxt, multiline = false , 
    edit, required, onChange} = props;

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
        name={name}
        required={required}
        sx ={{width: '60%'}}
        className= 'textFieldFormDetails'
        disabled={!edit}
        label={!edit?labelTxt:''}
        defaultValue={valueTxt}
        variant={!edit?"standard":"outlined"}
        multiline={multiline}
        onChange={onChange}
      />
    </Box>
  );
}

export { TextAndInputComponent, LateralDetailPanel };