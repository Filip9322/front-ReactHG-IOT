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
import { ChevronDown } from 'mdi-material-ui'

import { TextAndInputComponent } from 'src/pages/map_monitor_location/lateralDetailPanel'

const FormEditSelectedDevice = props => {

  const { selectedDevice, devices } = props;
  const [replacementDeviceDate, setReplacementDeviceDate] = useState(dayjs('2022-04-17'))
  const [anchorEl, setAnchorEl] = useState();
  const [selectMenuTitle, setSelectMenuTitle] = useState('활성');
  //const [openActivationSelect, updateOpenActivationSelect] = useState(false);
  const openActivationSelect = Boolean(anchorEl);


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
                <ChevronDown fontsize="small" />
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
            justifyContent: 'space-between',
            '& .formColumn': {
              width: '50%',
              margin: '0 10%'
            },
            '& .MuiInputBase-input, & .MuiOutlinedInput-input, & .MuiTypography-root':{
              fontSize: '0.875rem'
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
              >
                <MenuItem value={1}>{'1'}</MenuItem>
                <MenuItem value={2}>{'2'}</MenuItem>
                <MenuItem value={3}>{'3'}</MenuItem>
                <MenuItem value={4}>{'4'}</MenuItem>
                <MenuItem value={5}>{'5'}</MenuItem>
                <MenuItem value={6}>{'6'}</MenuItem>
                <MenuItem value={7}>{'7'}</MenuItem>
                <MenuItem value={8}>{'8'}</MenuItem>
                <MenuItem value={9}>{'9'}</MenuItem>
                <MenuItem value={10}>{'10'}</MenuItem>
                <MenuItem value={11}>{'11'}</MenuItem>
                <MenuItem value={12}>{'12'}</MenuItem>
              </Select>
            </Box>
            {/* 2.  LoRa ID */}
            <TextAndInputComponent 
              required = {false}
              name 
              value
              inputTxt ={'LoRa ID'}
              labelTxt ={'LoRa ID'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
            />
            {/* 3.  제조사 */}
            <TextAndInputComponent 
              required = {false}
              name 
              value
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
              >
                <MenuItem value={1}>{'008A'}</MenuItem>
                <MenuItem value={2}>{'0010A'}</MenuItem>
                <MenuItem value={3}>{'3'}</MenuItem>
                <MenuItem value={4}>{'4'}</MenuItem>
                <MenuItem value={5}>{'5'}</MenuItem>
                <MenuItem value={6}>{'6'}</MenuItem>
                <MenuItem value={7}>{'7'}</MenuItem>
                <MenuItem value={8}>{'8'}</MenuItem>
                <MenuItem value={9}>{'9'}</MenuItem>
                <MenuItem value={10}>{'10'}</MenuItem>
                <MenuItem value={11}>{'11'}</MenuItem>
                <MenuItem value={12}>{'12'}</MenuItem>
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
                  value={replacementDeviceDate}
                  label={'모듈 교체일자'}
                  onChange={handleChangeReplacementDeviceDate}
                />
              </LocalizationProvider>
            </Box>
            {/* 6.  파워 모델명 */}
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
              >
                <MenuItem value={1}>{'HG - 17A'}</MenuItem>
                <MenuItem value={2}>{'0010A'}</MenuItem>
                <MenuItem value={3}>{'3'}</MenuItem>
                <MenuItem value={4}>{'4'}</MenuItem>
                <MenuItem value={5}>{'5'}</MenuItem>
                <MenuItem value={6}>{'6'}</MenuItem>
                <MenuItem value={7}>{'7'}</MenuItem>
                <MenuItem value={8}>{'8'}</MenuItem>
                <MenuItem value={9}>{'9'}</MenuItem>
                <MenuItem value={10}>{'10'}</MenuItem>
                <MenuItem value={11}>{'11'}</MenuItem>
                <MenuItem value={12}>{'12'}</MenuItem>
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
                  value={replacementDeviceDate}
                  label={'파워 교체일자'}
                  onChange={handleChangeReplacementDeviceDate}
                />
              </LocalizationProvider>
            </Box>
            {/* 8.  CPU Version */}
            <TextAndInputComponent 
              required = {false} 
              name 
              value
              inputTxt ={'CPU Version'}
              labelTxt ={'CPU Version'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
            />
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
              >
                <MenuItem value={1}>{'HG - 17A'}</MenuItem>
                <MenuItem value={2}>{'0010A'}</MenuItem>
                <MenuItem value={3}>{'3'}</MenuItem>
                <MenuItem value={4}>{'4'}</MenuItem>
                <MenuItem value={5}>{'5'}</MenuItem>
                <MenuItem value={6}>{'6'}</MenuItem>
                <MenuItem value={7}>{'7'}</MenuItem>
                <MenuItem value={8}>{'8'}</MenuItem>
                <MenuItem value={9}>{'9'}</MenuItem>
                <MenuItem value={10}>{'10'}</MenuItem>
                <MenuItem value={11}>{'11'}</MenuItem>
                <MenuItem value={12}>{'12'}</MenuItem>
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
                  value={replacementDeviceDate}
                  label={'부품교체일자'}
                  onChange={handleChangeReplacementDeviceDate}
                  name={'partReplacementDate'}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        {/* Right Panel Form */}
        <Box
          className={'formColumn'}
          >
          {/* 11. 네오 IoT No. */}
          <TextAndInputComponent 
            required = {false}
            name 
            value
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
            value
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
                value={replacementDeviceDate}
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
                value={replacementDeviceDate}
                label={'설치일자'}
                onChange={handleChangeReplacementDeviceDate}
              />
            </LocalizationProvider>
          </Box>
          {/* 15. 설치담당 */}
          <TextAndInputComponent 
            required = {false}
            name 
            value
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
            value
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
            value
            inputTxt ={'음원텍스트'}
            labelTxt ={'음원텍스트'}
            edit   = {true}
            create = {false}
            textError = {'text Error'}
            error = {false}
            type
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            {/* 18. 죄표 */}
            <TextAndInputComponent 
              required = {false}
              name 
              value
              inputTxt ={'죄표 X'}
              labelTxt ={'죄표 X'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
            />
            <TextAndInputComponent 
              required = {false}
              name 
              value
              inputTxt ={'죄표 Y'}
              labelTxt ={'죄표 Y'}
              edit   = {true}
              create = {false}
              textError = {'text Error'}
              error = {false}
              type
            />
          </Box>
          {/* 19. 비고 */}
          <TextAndInputComponent 
            required = {false}
            name 
            value
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