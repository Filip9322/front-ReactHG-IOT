// ** Reacts Imports
import { useState, useEffect, useRef } from 'react';

// **  Material Components Imports
import { Box, Button, Tooltip, FormGroup, FormControl, FormControlLabel, Checkbox, Fade,
  Typography, TextField, Input, Select, Menu, MenuItem, ListItemIcon, ToggleButton, ToggleButtonGroup, InputLabel }  from '@mui/material';

import dayjs from 'dayjs';
import { DatePicker } from           '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from         '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// ** Icons Imports
import { MapMarker } from 'mdi-material-ui'


// ** Import External Customed Components
import { CheckStateValue } from 'src/@core/utils/checkStateValue';
import { TextAndInputComponent } from 'src/pages/map_monitor_location/lateralDetailPanel'

// ** Utils
import { postFetchURL } from 'src/@core/utils/fetchHelper'
import { putFetchURL } from 'src/@core/utils/fetchHelper'

const FormEditSelectedDevice = props => {
  
  const { selectedDevice, selectedDeviceBody, deviceModels, devices, deviceLat, deviceLng } = props;
  
  // ** Form Delivery
  const [formValues, setFormValues] = useState({id: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const errorsBody = {
    lora_id: false,
    prod_comp: false,
    model_no: false,
    prod_no: false,
    support_type: false,
    support_size: false,
    prod_type: false,
    button_type: false,
    cpu_version: false,
    neoiotnum: false,
    neoblenum: false,
    pro_date: false,
    install_date: false,
    install_man: false,
    check_man: false,
    sound_text: false,
    map_x: false,
    map_y: false,
    bigo: false
  }

  const [formErrors, setFormErrors] = useState(errorsBody);
 
  // ** UseRef
  const hasPageBeenRendered = useRef({
    effect1: false
  });

  // ** Async Functions
  async function fetchEditDevice(){
    //putFetchURL

  }

  async function fetchCreateDevice(){
    postFetchURL(
      `${process.env.REACT_APP_APIURL}/API/equi_state/`,
      formValues
    ).then(response => {
      setIsSubmitting(false);
      if(response) {

      }
    }).catch( error => {
      if (error) console.error(error); setIsSubmitting(false);
    }).finally(() => {
      //something
    })
  }

  // ** Handlers Functions
  const handleChangeReplacementDeviceDate = (event) => {
    const { name, newDate, validationError } = event;
    console.log('handleChangeReplacementDeviceDate');
    setFormValues({...formValues, [name]: dayjs(newDate.$d).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')});
  }
  
  const handleErrorDateField = (error,value) =>  {
    console.log(error);
  }

  //--- Handle Form Field Changes
  const handleChangeSelectStandard = event => {
    const { name, value } = event.target;
    console.log('handleChangeSelectStandard');
    setFormValues({...formValues, [name]: value});
  }
  
  const handleChangeInputComponent = event => {
    const { name, value } = event.target;
    console.log(name + ' : '+ value);  
    setFormValues({...formValues, [name]: value});
  }

  // ** Handle Form Submit
  const  handleSubmitFormDeviceCreation = event => {
    event.preventDefault();
    console.log(event);

    try{
      //Check Errors
      let errors = validate(formValues);
      setFormErrors(errors);
      
      if ( !errors.lora_id  && !errors.prod_comp && 
           !errors.model_no && !errors.map_x && 
           !errors.map_y    && !errors.sound_text) {
        setIsSubmitting(true);
        fetchCreateDevice();
      } else {
        if(errors) console.error(errors);
      }

    } catch(error) {
      if(error !== undefined) console.error(error)
    }
    console.log(formValues);
    console.log('Creation');
  }

  const handleResetErrors = () => {
    setFormErrors(errorsBody);
  }
  
  const handleSubmitFormDeviceEdition = event => {
    event.preventDefault();
    console.log('Edition');
  }

  const restoreInitialValuesSelectedBody = () => {
    if (Object.keys(selectedDeviceBody).length > 1 ) {
      let tempObject = {
        equi_num     : parseInt(selectedDevice),
        lora_id      : selectedDeviceBody.lora_id != null ? selectedDeviceBody.lora_id : '',
        prod_comp    : selectedDeviceBody.Equipment.prod_comp != null ? selectedDeviceBody.Equipment.prod_comp : '', 
        model_no     : selectedDeviceBody.Equipment.model_no,
        prod_no      : dayjs(selectedDeviceBody.Equipment.prod_no,      'YYYY-MM-DD').isValid() ? selectedDeviceBody.Equipment.prod_no : null,
        support_type : selectedDeviceBody.Equipment.support_type,
        support_size : dayjs(selectedDeviceBody.Equipment.support_size, 'YYYY-MM-DD').isValid() ? selectedDeviceBody.Equipment.support_size : null,
        prod_type    : selectedDeviceBody.Equipment.prod_type,
        button_type  : dayjs(selectedDeviceBody.Equipment.button_type,  'YYYY-MM-DD').isValid() ? selectedDeviceBody.Equipment.button_type : null,
        cpu_version  : selectedDeviceBody.Equipment.cpu_version != null ? selectedDeviceBody.Equipment.cpu_version : '',
        neoiotnum    : selectedDeviceBody.Equipment.neoiotnum   != null ? selectedDeviceBody.Equipment.neoiotnum : '',
        neoblenum    : selectedDeviceBody.Equipment.neoblenum   != null ? selectedDeviceBody.Equipment.neoblenum : '',
        prod_date    : dayjs(selectedDeviceBody.Equipment.prod_date,     'YYYY-MM-DD').isValid() ? selectedDeviceBody.Equipment.prod_date : null,
        install_date : dayjs(selectedDeviceBody.Equipment.install_date,  'YYYY-MM-DD').isValid() ? selectedDeviceBody.Equipment.install_date : null ,
        install_man  : selectedDeviceBody.Equipment.install_man != null ? selectedDeviceBody.Equipment.install_man : '',
        check_man    : selectedDeviceBody.Equipment.check_man   != null ? selectedDeviceBody.Equipment.check_man : '',
        sound_text   : selectedDeviceBody.Equipment.sound_text  != null ? selectedDeviceBody.Equipment.sound_text: '',
        map_x        : selectedDeviceBody.Equipment.map_x != null ? selectedDeviceBody.Equipment.map_x : '',
        map_y        : selectedDeviceBody.Equipment.map_y != null ? selectedDeviceBody.Equipment.map_y : '',
        bigo         : selectedDeviceBody.Equipment.bigo  != null ? selectedDeviceBody.Equipment.bigo  : ''
      };
      setFormValues(tempObject);
    } else {
      let tempObject = {
        equi_num     : parseInt(selectedDevice),
        lora_id      : '',
        prod_comp    : '', 
        model_no     : 0,
        prod_no      : null,
        support_type : 0,
        support_size : null,
        prod_type    : 0,
        button_type  : null,
        cpu_version  : '',
        neoiotnum    : '',
        neoblenum    : '',
        prod_date    : null,
        install_date : null,
        install_man  : '',
        check_man    : '',
        sound_text   : '',
        map_y        : '',
        map_x        : '',
        bigo         : ''
      };
      setFormValues(tempObject);
    }
  }

  const validate = formValues => {
    let errors = {};

    if(formValues.lora_id == '' || formValues.lora_id.length < 12 ){
      errors.lora_id = true;
    } else errors.lora_id = false;
    if(formValues.local_num == '' || formValues.local_num == 0 || formValues.local_num == undefined){
      errors.local_num = true;
    } else errors.local_num = false;
    if(formValues.equi_num == '' || formValues.equi_num == 0 || formValues.equi_num == undefined){
      errors.equi_num = true
    } else errors.equi_num = false;
    if(formValues.controller_number == '' || formValues.controller_number == 0 || formValues.controller_number == undefined){
      errors.controller_number = true
    } else errors.controller_number = false;
    if(formValues.prod_comp == '' || formValues.prod_comp == undefined) {
      errors.prod_comp = true;
    } else errors.prod_comp = false;
    if(formValues.model_no == '' || formValues.model_no == undefined){
      errors.model_no = true;
    } else errors.model_no = false;
    if(formValues.sound_text == '' || formValues.sound_text == undefined){
      errors.sound_text = true;
    } else errors.sound_text = false;
    if(formValues.map_x == '' || formValues.map_x == 0 || formValues.map_x == undefined || typeof(formValues.map_x) != 'number'){
      errors.map_x = true;
    } else errors.map_x = false;
    if(formValues.map_y == '' || formValues.map_y == 0 || formValues.map_y == undefined || typeof(formValues.map_y) != 'number'){
      errors.map_y = true;
    } else errors.map_y = false;

    return (errors);
  }

  // ** UseEffects
  useEffect(()=>{
    restoreInitialValuesSelectedBody();
  },[])

  useEffect(() => {
  },[formValues]) 
  
  useEffect(() => {
    if(hasPageBeenRendered.current['effect1'] && selectedDevice != undefined) {
      restoreInitialValuesSelectedBody();
    }
    hasPageBeenRendered.current['effect1'] = true;
  }, [selectedDevice])

  useEffect(() => {
    setFormValues({...formValues, map_x: parseFloat(deviceLat), map_y: parseFloat(deviceLng)});
  },[deviceLat,deviceLng])

  return(
    <Box>
      <Box>
        <ToggleButtonGroup
          color='primary'
          value={1}
          exclusive
          aria-label={'시설물 수정'}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#f1f4f9',
            '& .toggleTitle.Mui-disabled': {
              color: '#392d2d'
            }
          }}
        >
          <ToggleButton
            className='toggleTitle'
            value= 'title'
            sx={{
              backgroundColor: '#e6e0eb'
            }}
            disabled
          >
            { selectedDevice != 0 && selectedDevice != null ?
            '시설물 수정 - 상태:' : '시설물 추가: '}
          </ToggleButton>
          <ToggleButton
            sx={{
              backgroundColor: 'white',
              border: 'solid 1px #3a35412e'
              }}
            value='area'
          > 
          { selectedDevice != 0 && selectedDevice != null ?
            <CheckStateValue stateValue={ selectedDeviceBody.state_code } />
          :'#'}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <form
        onSubmit={ selectedDevice != 0 && selectedDevice != null ? handleSubmitFormDeviceEdition : handleSubmitFormDeviceCreation }
      >
        <FormGroup>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              '& .formColumn': {
                width: '50%',
                margin: '2% 1%',
                paddingRight: '5px',
                borderRight: 'dashed 1px #dbdce3'
              },
              '& .formColumn:last-child': {
                border: 0
              },
              '& .MuiInputBase-input, & .MuiOutlinedInput-input, & .MuiTypography-root':{
                fontSize: '0.875rem'
              },
              '& .MuiInputBase-input, & .MuiOutlinedInput-input': {
                padding: '10px 14px'
              },
              '& .selectInput fieldset legend': {
                height: 'auto',
                '& span': {
                  opacity: 100
                }
              },
              '& .DateSelectionContainer': {
                '& label.Mui-error' : {
                    color: 'rgba(58, 53, 65, 0.87)'
                },
                '& div.MuiOutlinedInput-root fieldset.MuiOutlinedInput-notchedOutline' : {
                    borderColor: 'rgba(58, 53, 65, 0.22)'
                }
              }
            }}
            >
            {/* Left Panel Form */}
            <Box
              className={'formColumn'}
              >
              {/* 1.  부착번호 */}
              <Box
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <InputLabel id={'deviceEquiNum'} >{'부착번호'}</InputLabel>
                <FormControl error={formErrors.equi_num}>
                  <Select
                    name={'equi_num'}
                    className={'selectInput'}
                    labelID={'deviceEquiNum'}
                    label={formErrors.equi_num ? '부착번호 입력하세요':'부착번호'}
                    onChange={handleChangeSelectStandard}
                    value={formValues.equi_num != undefined ? parseInt(formValues.equi_num) : selectedDevice }
                    required
                  >
                    <MenuItem disabled selected ={selectedDevice == null || selectedDevice == 0 ? true : false } value={0}>{'선택: '}</MenuItem>
                    <MenuItem disabled= {devices.includes(1)}  value={1}>{'1'}</MenuItem>
                    <MenuItem disabled= {devices.includes(2)}  value={2}>{'2'}</MenuItem>
                    <MenuItem disabled= {devices.includes(3)}  value={3}>{'3'}</MenuItem>
                    <MenuItem disabled= {devices.includes(4)}  value={4}>{'4'}</MenuItem>
                    <MenuItem disabled= {devices.includes(5)}  value={5}>{'5'}</MenuItem>
                    <MenuItem disabled= {devices.includes(6)}  value={6}>{'6'}</MenuItem>
                    <MenuItem disabled= {devices.includes(7)}  value={7}>{'7'}</MenuItem>
                    <MenuItem disabled= {devices.includes(8)}  value={8}>{'8'}</MenuItem>
                    <MenuItem disabled= {devices.includes(9)}  value={9}>{'9'}</MenuItem>
                    <MenuItem disabled= {devices.includes(10)} value={10}>{'10'}</MenuItem>
                    <MenuItem disabled= {devices.includes(11)} value={11}>{'11'}</MenuItem>
                    <MenuItem disabled= {devices.includes(12)} value={12}>{'12'}</MenuItem>
                  </Select>
                </FormControl>
              </Box>  
              {/* 2.  LoRa ID  */}
              <TextAndInputComponent 
                required = {true}
                name = {'lora_id'}
                inputTxt = {'LoRa ID'}
                valueTxt = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.lora_id : ''}
                error = {formErrors.lora_id}
                textError = {'LoRa ID 입력하세요 '}
                labelTxt = {'LoRa ID:'}
                edit   = {true}
                create = {false}
                onChange={handleChangeInputComponent}
                value = { formValues.lora_id }
              />
              {/* 3.  제조사 ----> TODO: Needs to be Changed to Select ?? */}
              <TextAndInputComponent 
                required = {true}
                name = {'prod_comp'}
                inputTxt ={'제조사'}
                valueTxt = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.prod_comp : ''}
                error = {formErrors.prod_comp}
                textError = {'제조사 입력하세요'}
                labelTxt ={'제조사'}
                edit   = {true}
                create = {false}
                onChange={handleChangeInputComponent}
                value = { formValues.prod_comp }
              />
              {/* 4.  모듈 모델명 */}
              <Box
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'모듈 모델명'}</Typography>
                <FormControl error={formErrors.model_no}>
                  <Select
                    name = {'model_no'}
                    className={'selectInput'}
                    labelID={'moduleModelName'}
                    label={'모듈 모델명'}
                    onChange={handleChangeSelectStandard}
                    value = { formValues.model_no != null ? parseInt(formValues.model_no) : 0}
                  >
                    <MenuItem disabled selected ={selectedDevice == null || selectedDevice == 0 ? true : false } value={0}>{'선택: '}</MenuItem>
                    {
                      deviceModels.filter(modelCode => modelCode.model_code == '0007').map(model => (
                        <MenuItem key={'model-'+model.id} value={model.model_subcode}>{model.model_name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
              {/* 5.  모듈 교체일자 */}
              <Box
                className={'DateSelectionContainer'}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'모듈 교체일자'}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name = {'prod_no'}
                    defaultValue={null}
                    timezone='system'
                    label={'모듈 교체일자'}
                    onChange={(newDate, validationError) => handleChangeReplacementDeviceDate({ name: "prod_no", newDate: newDate, validationError: validationError })}
                    value={ dayjs(formValues.prod_no) }
                    onError={ handleErrorDateField }
                  />
                </LocalizationProvider>
              </Box>
              {/* 6.  파워 모델명 ----> TODO: Needs to be get possible Values to fill select accordingly */}
              <Box
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'파워 모델명'}</Typography> 
                <Select
                  name = {'support_type'}
                  className={'selectInput'}
                  labelID={'powerModelName'}
                  label={'파워 모델명'}
                  onChange={handleChangeSelectStandard}
                  value={ formValues.support_type != null ? parseInt(formValues.support_type) : 0}
                >
                  <MenuItem disabled selected ={selectedDevice == null || selectedDevice == 0 ? true : false } value={0}>{'선택: '}</MenuItem>
                  {
                    deviceModels.filter(modelCode => modelCode.model_code == '0006').map(model => (
                      <MenuItem key={'powerModel-'+model.id} value={model.model_subcode}>{model.model_name}</MenuItem>
                    ))
                  }
                </Select>
              </Box>
              {/* 7.  파워 교체일자 */}
              <Box
                className={'DateSelectionContainer'}
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'파워 교체일자'}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name={'support_size'}
                    value={ dayjs(formValues.support_size) }
                    label={'파워 교체일자'}
                    onChange={(newDate, validationError) => handleChangeReplacementDeviceDate({ name: "support_size", newDate: newDate, validationError: validationError })}
                  />
                </LocalizationProvider>
              </Box>
              {/* 9.  부품교체 */}
              <Box
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'부품교체'}</Typography> 
                <Select
                  name = {'prod_type'}
                  className={'selectInput'}
                  labelID={'partReplacement'}
                  label={'부품교체'}
                  onChange={handleChangeSelectStandard}
                  value={ formValues.prod_type != null ? parseInt(formValues.prod_type) : 0 }
                >
                  <MenuItem disabled selected ={selectedDevice == null || selectedDevice == 0 ? true : false } value={0}>{'선택: '}</MenuItem>
                  {
                    deviceModels.filter(modelCode => modelCode.model_code == '0005').map(model => (
                      <MenuItem key={'partReplacementModel-'+model.id} value={model.model_subcode}>{model.model_name}</MenuItem>
                    ))
                  }
                </Select>
              </Box>
              {/* 10. 부품교체일자 */}
              <Box
                className={'DateSelectionContainer'}
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'부품교체일자'}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name={'button_type'}
                    value={ dayjs(formValues.button_type)}
                    label={'부품교체일자'}
                    onChange={(newDate, validationError) => handleChangeReplacementDeviceDate({ name: "button_type", newDate: newDate, validationError: validationError })}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            {/* Midle Panel Form */}
            <Box
              className={'formColumn'}
            >
              {/* 8.  CPU Version */}
              <TextAndInputComponent 
                required = {false} 
                name = {'cpu_version'}
                inputTxt = {'CPU Version'}
                labelTxt = {'CPU Version'}
                textError= {'text Error'}
                valueTxt = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.cpu_version : ''}
                edit   = {true}
                create = {false}
                onChange={ handleChangeInputComponent }
                value = { formValues.cpu_version }
                error = {false}
              />
              {/* 11. 네오 IoT No. */}
              <TextAndInputComponent 
                required = {false}
                name = {'neoiotnum'}
                inputTxt = {'네오 IoT No.'}
                labelTxt = {'네오 IoT No.'}
                textError= {'text Error'}
                valueTxt = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.neoiotnum : ''}
                edit   = {true}
                create = {false}
                onChange={ handleChangeInputComponent }
                value = { formValues.neoiotnum }
                error = {false}
              />
              {/* 12. 네오 BLE No. */}
              <TextAndInputComponent 
                required = {false}
                name = {'neoblenum'}
                inputTxt ={'네오 BLE No.'}
                value = { formValues.neoblenum }
                labelTxt ={'네오 BLE No.'}
                edit   = {true}
                create = {false}
                textError = {'text Error'}
                onChange={ handleChangeInputComponent }
                error = {false}
              />
              {/* 13. 제조일자 */}
              <Box
                className={'DateSelectionContainer'}
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'제조일자'}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name={'prod_date'}
                    value={ dayjs(formValues.prod_date) }
                    label={'제조일자'}
                    onChange={(newDate, validationError) => handleChangeReplacementDeviceDate({ name: "prod_date", newDate: newDate, validationError: validationError })}
                  />
                </LocalizationProvider>
              </Box>
              {/* 14. 설치일자 */}
              <Box
                className={'DateSelectionContainer'}
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'설치일자'}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name={'install_date'}
                    value={ dayjs(formValues.install_date) }
                    label={'설치일자'}
                    onChange={(newDate, validationError) => handleChangeReplacementDeviceDate({ name: "install_date", newDate: newDate, validationError: validationError })}
                  />
                </LocalizationProvider>
              </Box>
              {/* 15. 설치담당 */}
              <TextAndInputComponent 
                required = {false}
                name = {'install_man'}
                value = { formValues.install_man }
                inputTxt ={'설치담당'}
                labelTxt ={'설치담당'}
                edit   = {true}
                create = {false}
                textError = {'text Error'}
                onChange={ handleChangeInputComponent }
                error = {false}
              />
              {/* 16. 검사담당 */}
              <TextAndInputComponent 
                name  = {'check_man'}
                required = {false}
                value = { formValues.check_man }
                inputTxt ={'검사담당'}
                labelTxt ={'검사담당'}
                edit   = {true}
                create = {false}
                textError = {'text Error'}
                onChange={ handleChangeInputComponent }
                error = {false}
              />
              {/* 17. 음원텍스트 */}
              <TextAndInputComponent 
                name = {'sound_text'}
                required = {false}
                value = { formValues.sound_text }
                inputTxt ={'음원텍스트'}
                labelTxt ={'음원텍스트'}
                edit   = {true}
                create = {false}
                textError = {'음원텍스트 입력하세요'}
                multiline ={ true }
                onChange={ handleChangeInputComponent }
                error = { formErrors.sound_text }
              />
            </Box>
            {/* Midle Panel Form */}
            <Box
              className={'formColumn'}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  '& button.ButtonIconSVG': {
                    display:'flex',
                    marginLeft: '10px',
                    position: 'relative',
                    alignItems:'center',
                    backgroundColor: '#dfdfdf',
                    minWidth: '1.6em',
                    marginTop: '11px',
                    ':hover':{ cursor: 'pointer', backgroundColor: 'rgba(241, 74, 74, 0.9)', '& svg':{ color: '#fff'}},
                    '& svg':{ color: '#777'}
                  },
                  '& button.MapIcon':{backgroundColor: (formErrors.map_x || formErrors.map_y ? 'rgba(241, 74, 74, 0.9)': '#a188b5fa'),
                    '& svg':{ color: 'white'}
                  },
                  '& button.MapIcon:hover':{ backgroundColor: '#3d7a6b'}
                }}
              >
                {/* 18. 죄표 */}
                <TextAndInputComponent 
                  required = {true}
                  name = {'map_x'}
                  inputTxt  = {'죄표 X : ' }
                  valueTxt  = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.map_x : ''}
                  error ={ formErrors.map_x }
                  textError = {'지도에서 위치 저장하세요'}
                  labelTxt  = {'죄표 X'}
                  edit ={false}
                  create = {false}
                  onChange = {handleChangeInputComponent}
                  value = { typeof(formValues.map_x) != 'number' ? '' : parseFloat(formValues.map_x) }
                />
                <TextAndInputComponent
                  name = {'map_y'}
                  required = {true}
                  value = { typeof(formValues.map_y) != 'number' ? '' : parseFloat(formValues.map_y) }
                  inputTxt  = {'죄표 Y'}
                  labelTxt  = {'죄표 Y'}
                  valueTxt  = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.map_y : ''}
                  textError = {'지도에서 위치 저장하세요'}
                  edit   = {false}
                  create = {false}
                  onChange = {handleChangeInputComponent}
                  error = {formErrors.map_y }
                />
                { formErrors.map_x || formErrors.map_y ? '지도에서 위치 저장하세요': '' }
                <Tooltip>
                  <Button
                    className = { 'ButtonIconSVG MapIcon' }
                  >
                    <MapMarker />
                  </Button>
                </Tooltip>
              </Box>
              {/* 19. 비고 */}
              <TextAndInputComponent 
                name = {'bigo'}
                required = {false}
                value = { formValues.bigo }
                inputTxt ={'비고'}
                labelTxt ={'비고'}
                edit   = {true}
                create = {false}
                textError = {'text Error'}
                multiline ={ true }
                onChange={ handleChangeInputComponent }
                error = {false}
              />
              <Box 
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly'
                }}
              >
                <Button
                  color={'error'}
                  variant={'outlined'}
                  onClick={ restoreInitialValuesSelectedBody }
                >{'최소'}</Button>
                <Button
                  color={'success'}
                  variant={'contained'}
                  type={'submit'}
                >{'저장'}</Button>
              </Box>
            </Box>
          </Box>
        </FormGroup>
      </form>
  </Box>
  )
}

export { FormEditSelectedDevice }