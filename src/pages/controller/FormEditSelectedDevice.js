// ** Reacts Imports
import { useState, useEffect, useRef } from 'react';

// **  Material Components Imports
import { Box, Button, Tooltip, FormGroup, FormControlLabel, Checkbox, Fade,
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

const FormEditSelectedDevice = props => {
  
  const { selectedDevice, selectedDeviceBody, deviceModels, devices } = props;
  
  const [equinumSelect, setEquinumSelect] = useState(selectedDevice);
  
  // ** Form Delivery
  const [formValues, setFormValues] = useState({id: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ** UseRef
  const hasPageBeenRendered = useRef({
    effect1: false
  });

  // ** Handlers Functions
  const handleChangeReplacementDeviceDate = (event) => {
    const { name, newDate, validationError } = event;
    console.log(name);
    console.log(newDate);
    console.log(validationError);
  }
  
  //--- Handle Form Field Changes
  const handleChangeEquiNum = event => {
    setEquinumSelect(event.target.value);
  }

  const handleChangeSelectStandard = event => {
    const { name, value } = event.target;
    setFormValues({...formValues, [name]: value});
  }
  
  const handleChangeInputComponent = event => {
    const { name, value } = event.target;
    setFormValues({...formValues, [name]: value});
  }

  // ** Handle Form Submit
  const  handleSubmitFormDeviceCreation = event => {
    event.preventDefault();
    console.log(event);

    try{
      let validateSubmit = false;

      //Check Errors
      //let errors = validate
    } catch(error) {
      if(error !== undefined) console.error(error)
    }

    console.log('Creation');
  }
  
  const handleSubmitFormDeviceEdition = event => {
    event.preventDefault();
    console.log('Edition');
  }

  const restoreInitialValuesSelectedBody = () => {
    if (Object.keys(selectedDeviceBody).length > 1 ) {
      let tempObject = {
        lora_id      : selectedDeviceBody.lora_id,
        prod_comp    : selectedDeviceBody.Equipment.prod_comp, 
        model_no     : selectedDeviceBody.Equipment.model_no,
        prod_date    : selectedDeviceBody.Equipment.prod_date,
        support_type : selectedDeviceBody.Equipment.support_type,
        support_size : selectedDeviceBody.Equipment.support_size,
        prod_type    : selectedDeviceBody.Equipment.prod_type,
        button_type  : selectedDeviceBody.Equipment.button_type,
        cpu_version  : selectedDeviceBody.Equipment.cpu_version,
        neoiotnum    : selectedDeviceBody.Equipment.neoiotnum,
        neoblenum    : selectedDeviceBody.Equipment.neoblenum,
        prod_date    : selectedDeviceBody.Equipment.prod_date,
        install_date : selectedDeviceBody.Equipment.install_date,
        install_man  : selectedDeviceBody.Equipment.install_man,
        check_man    : selectedDeviceBody.Equipment.check_man,
        sound_text   : selectedDeviceBody.Equipment.sound_text,
        map_y        : selectedDeviceBody.Equipment.map_y,
        map_x        : selectedDeviceBody.Equipment.map_x,
        bigo         : selectedDeviceBody.Equipment.bigo
      };
      setFormValues(tempObject);
    } else {
      setFormValues({id: null });
    }
  }

  useEffect(()=>{
    restoreInitialValuesSelectedBody();
  },[])

  useEffect(() => {
    console.log(formValues)
  },[formValues])

  useEffect(() => {
    setEquinumSelect(selectedDevice);
        
    restoreInitialValuesSelectedBody();
  }, [selectedDevice])
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
                <Select
                  className={'selectInput'}
                  labelID={'deviceEquiNum'}
                  label={'부착번호'}
                  onChange={handleChangeEquiNum}
                  value={equinumSelect}
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
              </Box>  
              {/* 2.  LoRa ID  */}
              <TextAndInputComponent 
                required = {false}
                name = {'lora_id'}
                inputTxt = {'LoRa ID'}
                valueTxt = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.lora_id : ''}
                labelTxt = {'LoRa ID'}
                textError = {'text Error'}
                edit   = {true}
                create = {false}
                onChange={handleChangeInputComponent}
                value = { Object.keys(selectedDeviceBody).length > 1 ? formValues.lora_id : ''}
                error = {false}
              />
              {/* 3.  제조사 ----> TODO: Needs to be Changed to Select ?? */}
              <TextAndInputComponent 
                required = {false}
                name = {'prod_comp'}
                inputTxt ={'제조사'}
                valueTxt = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.prod_comp : ''}
                labelTxt ={'제조사'}
                textError = {'text Error'}
                edit   = {true}
                create = {false}
                onChange={handleChangeInputComponent}
                value = { Object.keys(selectedDeviceBody).length > 1 ? formValues.prod_comp : ''}
                error = {false}
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
                <Select
                  name = {'model_no'}
                  className={'selectInput'}
                  labelID={'moduleModelName'}
                  label={'모듈 모델명'}
                  onChange={handleChangeSelectStandard}
                  value = { Object.keys(selectedDeviceBody).length > 1 ? (formValues.model_no != null ? formValues.model_no : 0) : 0}
                >
                  <MenuItem disabled selected ={selectedDevice == null || selectedDevice == 0 ? true : false } value={0}>{'선택: '}</MenuItem>
                  {
                    deviceModels.filter(modelCode => modelCode.model_code == '0007').map(model => (
                      <MenuItem key={'model-'+model.id} value={model.model_subcode}>{model.model_name}</MenuItem>
                    ))
                  }
                </Select>
              </Box>
              {/* 5.  모듈 교체일자 */}
              <Box
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'모듈 교체일자'}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    timezone='system'
                    name = {'prod_no'}
                    label={'모듈 교체일자'}
                    onChange={(newDate, validationError) => handleChangeReplacementDeviceDate({ name: "prod_no", newDate: newDate, validationError: validationError })}
                    value={ Object.keys(selectedDeviceBody).length > 1 ? (formValues.prod_date != null ? dayjs(formValues.prod_date) : null) : null}
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
                  value={ Object.keys(selectedDeviceBody).length > 1 ? (formValues.support_type != null ? formValues.support_type : 0 ) : 0}
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
                    value={ Object.keys(selectedDeviceBody).length > 1  ? (selectedDeviceBody.Equipment.support_size != null ? dayjs(selectedDeviceBody.Equipment.support_size) : null) : null}
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
                  value={ Object.keys(selectedDeviceBody).length > 1 ? (formValues.prod_type != null ? formValues.prod_type : 0 ) : 0}
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
                sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}
              >
                <Typography
                  sx = {{
                    paddingRight: '5px'
                  }}
                >{'부품교체일자'}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name={'partReplacementDate'}
                    value={ Object.keys(selectedDeviceBody).length > 1   ? (formValues.button_type != null ? dayjs(formValues.button_type) : null) : null}
                    label={'부품교체일자'}
                    onChange={(newDate, validationError) => handleChangeReplacementDeviceDate({ name: "partReplacementDate", newDate: newDate, validationError: validationError })}
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
                inputTxt ={'CPU Version'}
                value = { Object.keys(selectedDeviceBody).length > 1 ? (formValues.cpu_version != null ? formValues.cpu_version : '-') : ''}
                labelTxt ={'CPU Version'}
                edit   = {true}
                create = {false}
                textError = {'text Error'}
                onChange={ handleChangeInputComponent }
                error = {false}
              />
              {/* 11. 네오 IoT No. */}
              <TextAndInputComponent 
                required = {false}
                name = {'neoiotnum'}
                inputTxt ={'네오 IoT No.'}
                value = { Object.keys(selectedDeviceBody).length > 1 ? (formValues.neoiotnum  != null ? formValues.neoiotnum : '-' ) : ''}
                labelTxt ={'네오 IoT No.'}
                edit   = {true}
                create = {false}
                textError = {'text Error'}
                onChange={ handleChangeInputComponent }
                error = {false}
              />
              {/* 12. 네오 BLE No. */}
              <TextAndInputComponent 
                required = {false}
                name = {'neoblenum'}
                inputTxt ={'네오 BLE No.'}
                value = { Object.keys(selectedDeviceBody).length > 1 ? (formValues.neoblenum  != null ? formValues.neoblenum  : '-' ): ''}
                labelTxt ={'네오 BLE No.'}
                edit   = {true}
                create = {false}
                textError = {'text Error'}
                onChange={ handleChangeInputComponent }
                error = {false}
              />
              {/* 13. 제조일자 */}
              <Box
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
                    value={ Object.keys(selectedDeviceBody).length > 1  ? ( selectedDeviceBody.Equipment.prod_date != null ? dayjs(selectedDeviceBody.Equipment.prod_date) : null): null}
                    label={'제조일자'}
                    onChange={(newDate, validationError) => handleChangeReplacementDeviceDate({ name: "prod_date", newDate: newDate, validationError: validationError })}
                  />
                </LocalizationProvider>
              </Box>
              {/* 14. 설치일자 */}
              <Box
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
                    value={ Object.keys(selectedDeviceBody).length > 1 ? ( formValues.install_date != null ? dayjs(formValues.install_date) : null): null}
                    label={'설치일자'}
                    onChange={(newDate, validationError) => handleChangeReplacementDeviceDate({ name: "install_date", newDate: newDate, validationError: validationError })}
                  />
                </LocalizationProvider>
              </Box>
              {/* 15. 설치담당 */}
              <TextAndInputComponent 
                required = {false}
                name = {'install_man'}
                value = { Object.keys(selectedDeviceBody).length > 1 ? (formValues.install_man != null ? formValues.install_man : '-') : ''}
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
                value = { Object.keys(selectedDeviceBody).length > 1 ? (formValues.check_man  != null ? formValues.check_man  : '-'): ''}
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
                value = { Object.keys(selectedDeviceBody).length > 1 ? (formValues.sound_text != null ? formValues.sound_text : '-') : ''}
                inputTxt ={'음원텍스트'}
                labelTxt ={'음원텍스트'}
                edit   = {true}
                create = {false}
                textError = {'text Error'}
                multiline ={ true }
                onChange={ handleChangeInputComponent }
                error = {false}
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
                  }
                }}
              >
                {/* 18. 죄표 */}
                <TextAndInputComponent 
                  required = {false}
                  name 
                  value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.map_x : ''}
                  inputTxt ={'죄표 X'}
                  labelTxt ={'죄표 X'}
                  edit ={false}
                  create = {false}
                  textError = {'text Error'}
                  error = {false}
                />
                <TextAndInputComponent 
                  required = {false}
                  name 
                  value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.map_y : ''}
                  inputTxt ={'죄표 Y'}
                  labelTxt ={'죄표 Y'}
                  edit   = {false}
                  create = {false}
                  textError = {'text Error'}
                  error = {false}
                />
                <Tooltip>
                  <Button
                    className = { 'ButtonIconSVG' }
                  >
                    <MapMarker />
                  </Button>
                </Tooltip>
              </Box>
              {/* 19. 비고 */}
              <TextAndInputComponent 
                required = {false}
                name 
                value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.bigo : ''}
                inputTxt ={'비고'}
                labelTxt ={'비고'}
                edit   = {true}
                create = {false}
                textError = {'text Error'}
                error = {false}
                multiline ={ true }
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
                >{'최소'}</Button>
                <Button
                  color={'success'}
                  variant={'contained'}
                  type='submit'
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