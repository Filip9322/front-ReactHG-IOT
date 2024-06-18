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
import { ChevronDown } from 'mdi-material-ui'

import { TextAndInputComponent } from 'src/pages/map_monitor_location/lateralDetailPanel'

const FormEditSelectedDevice = props => {

  
  const { selectedDevice, selectedDeviceBody, deviceModels, devices } = props;
  const [replacementDeviceDate, setReplacementDeviceDate] = useState(dayjs('2022-04-17'))
  const [anchorEl, setAnchorEl] = useState();
  const [selectMenuTitle, setSelectMenuTitle] = useState('활성');
  //const [openActivationSelect, updateOpenActivationSelect] = useState(false);
  const openActivationSelect = Boolean(anchorEl);
  
  // ** UseRef
  const hasPageBeenRendered = useRef({
    effect1: false
  });

  // ** Handlers Functions
  const handleClickActivationSelect = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseActivationSelect = event => {
    setAnchorEl(event.target.value)
  }

  const handleChangeActivationSelect = event => {
    let value = event.target.getAttribute('data-option');

    setSelectMenuTitle(value);
    handleCloseActivationSelect(event);
  }

  const handleChangeReplacementDeviceDate = event => {
    console.log(event);
  }
  
  //--- Select EquiNum
  const handleChangeEquiNum = event => {
    console.log(event);
  }

  useEffect(()=>{
    if(hasPageBeenRendered.current['effect1']){
      console.log(devices);
    }
    hasPageBeenRendered.current['effect1'] = true;  // TODO: COuld be deleted, not actually using
  },[])

  return(
    <Box>
      <Box>
        <ToggleButtonGroup
          color='primary'
          value={1}
          exvlusive
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
            {'시설물 수정'}

          </ToggleButton>
          <ToggleButton
            sx={{
              backgroundColor: 'white',
              border: 'solid 1px #3a35412e'
            }}
            value='area'
          > 
            <Box
              color={selectMenuTitle == '비활성'?'red':'#189127'}
              aria-controls = {openActivationSelect ? 'basic-menu': undefined}
              aria-haspopup = {true}
              aria-expanded = {openActivationSelect ? true: undefined}
              onClick ={handleClickActivationSelect}
            >
              {selectMenuTitle}
              <ListItemIcon>
                <ChevronDown fontSize="small" />
              </ListItemIcon>
            </Box>
            <Menu
              id= {'selectActivationDevice'}
              MenuListProps={{'aria-labelledby': 'fade-button'}}
              anchorEl={anchorEl}
              open={openActivationSelect}
              onClose={handleCloseActivationSelect}
              onClick={handleChangeActivationSelect}
              TransitionComponent={Fade}
              sx={{
                border: '0'
              }}
            >
              <MenuItem
                data-option={'활성'} sx={{color: '#189127'}}
              >{'활성'}</MenuItem>
              <MenuItem
                data-option={'비활성'} sx={{color: '#f00'}}
              >{'비활성'}</MenuItem>
            </Menu>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
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
              <Typography
                sx = {{
                  paddingRight: '5px'
                }}
              >{'부착번호'}</Typography>
              <InputLabel id={'deviceEquiNum'} >{'부착번호'}</InputLabel>
              <Select
                labelID={'deviceEquiNum'}
                label={'부착번호'}
                onChange={handleChangeEquiNum}
                value={selectedDevice}
              >
                <MenuItem disabled= {devices.includes(1)} value={1}>{'1'}</MenuItem>
                <MenuItem disabled= {devices.includes(2)} value={2}>{'2'}</MenuItem>
                <MenuItem disabled= {devices.includes(3)} value={3}>{'3'}</MenuItem>
                <MenuItem disabled= {devices.includes(4)} value={4}>{'4'}</MenuItem>
                <MenuItem disabled= {devices.includes(5)} value={5}>{'5'}</MenuItem>
                <MenuItem disabled= {devices.includes(6)} value={6}>{'6'}</MenuItem>
                <MenuItem disabled= {devices.includes(7)} value={7}>{'7'}</MenuItem>
                <MenuItem disabled= {devices.includes(8)} value={8}>{'8'}</MenuItem>
                <MenuItem disabled= {devices.includes(9)} value={9}>{'9'}</MenuItem>
                <MenuItem disabled= {devices.includes(10)} value={10}>{'10'}</MenuItem>
                <MenuItem disabled= {devices.includes(11)} value={11}>{'11'}</MenuItem>
                <MenuItem disabled= {devices.includes(12)} value={12}>{'12'}</MenuItem>
              </Select>
            </Box>
            {/* 2.  LoRa ID  */}
            <TextAndInputComponent 
              required = {false}
              name 
              value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.lora_id : ''}
              inputTxt ={'LoRa ID'}
              labelTxt ={'LoRa ID'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
            />
            {/* 3.  제조사 ----> TODO: Needs to be Changed to Select ?? */}
            <TextAndInputComponent 
              required = {false}
              name 
              value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.prod_comp : ''}
              inputTxt ={'제조사'}
              labelTxt ={'제조사'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
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
                labelID={'moduleModelName'}
                label={'모듈 모델명'}
                onChange={handleChangeEquiNum}
                value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.model_no : ''}
              >
                <MenuItem value={0} disable selected>{'선택: '}</MenuItem>
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
                  label={'모듈 교체일자'}
                  onChange={handleChangeReplacementDeviceDate}
                  value={ Object.keys(selectedDeviceBody).length > 1 ? (selectedDeviceBody.Equipment.prod_date != null ? dayjs(selectedDeviceBody.Equipment.prod_date) : null) : null}
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
                labelID={'powerModelName'}
                label={'파워 모델명'}
                onChange={handleChangeEquiNum}
                value={ Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.model_no : ''}
              >
                <MenuItem value={0} disable selected>{'선택: '}</MenuItem>
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
                  value={ Object.keys(selectedDeviceBody).length > 1  ? (selectedDeviceBody.Equipment.support_size != null ? dayjs(selectedDeviceBody.Equipment.support_size) : null) : null}
                  label={'파워 교체일자'}
                  onChange={handleChangeReplacementDeviceDate}
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
                labelID={'partReplacement'}
                label={'부품교체'}
                onChange={handleChangeEquiNum}
                value={ Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.prod_type : ''}
              >
                <MenuItem value={0} disable selected>{'선택: '}</MenuItem>
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
                  value={ Object.keys(selectedDeviceBody).length > 1   ? (selectedDeviceBody.Equipment.button_type != null ? dayjs(selectedDeviceBody.Equipment.button_type) : null) : null}
                  label={'부품교체일자'}
                  onChange={handleChangeReplacementDeviceDate}
                  name={'partReplacementDate'}
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
              name 
              value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.cpu_version : ''}
              inputTxt ={'CPU Version'}
              labelTxt ={'CPU Version'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
            />
            {/* 11. 네오 IoT No. */}
            <TextAndInputComponent 
              required = {false}
              name 
              value = { Object.keys(selectedDeviceBody).length > 1 ? (selectedDeviceBody.Equipment.neoiotnum  != null ? selectedDeviceBody.Equipment.neoiotnum  != null : '-' ) : ''}
              inputTxt ={'네오 IoT No.'}
              labelTxt ={'네오 IoT No.'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
            />
            {/* 12. 네오 BLE No. */}
            <TextAndInputComponent 
              required = {false}
              name 
              value = { Object.keys(selectedDeviceBody).length > 1 ? (selectedDeviceBody.Equipment.neoblenum  != null ? selectedDeviceBody.Equipment.neoblenum  != null : '-' ): ''}
              inputTxt ={'네오 BLE No.'}
              labelTxt ={'네오 BLE No.'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
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
                  value={ Object.keys(selectedDeviceBody).length > 1  ? ( selectedDeviceBody.Equipment.prod_date != null ? dayjs(selectedDeviceBody.Equipment.prod_date) : null): null}
                  label={'제조일자'}
                  onChange={handleChangeReplacementDeviceDate}
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
                  value={ Object.keys(selectedDeviceBody).length > 1 ? ( selectedDeviceBody.Equipment.install_date != null ? dayjs(selectedDeviceBody.Equipment.install_date) : null): null}
                  label={'설치일자'}
                  onChange={handleChangeReplacementDeviceDate}
                />
              </LocalizationProvider>
            </Box>
            {/* 15. 설치담당 */}
            <TextAndInputComponent 
              required = {false}
              name 
              value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.install_man : ''}
              inputTxt ={'설치담당'}
              labelTxt ={'설치담당'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
            />
            {/* 16. 검사담당 */}
            <TextAndInputComponent 
              required = {false}
              name 
              value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.check_man : ''}
              inputTxt ={'검사담당'}
              labelTxt ={'검사담당'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
            />
            {/* 17. 음원텍스트 */}
            <TextAndInputComponent 
              required = {false}
              name 
              value = { Object.keys(selectedDeviceBody).length > 1 ? selectedDeviceBody.Equipment.sound_text : ''}
              inputTxt ={'음원텍스트'}
              labelTxt ={'음원텍스트'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              multiline ={ true }
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
                //onClick={}
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
  </Box>
  )
}

export { FormEditSelectedDevice }