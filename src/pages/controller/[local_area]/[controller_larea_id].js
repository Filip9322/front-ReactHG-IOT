// ** React imports
import { useState, useEffect, useRef } from 'react';
import { Map, MapMarker, MapTypeId,
  MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
  
// ** Material Components Imports
import { Box, Typography, CircularProgress, Button } from '@mui/material'
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material'

// ** Utils
import { getFetchURL } from 'src/@core/utils/fetchHelper';
import { useKakaoLoader } from 'src/@core/utils/kakao_map_api'

const ControllerInformation = props => {
  // ** Load Kakao Maps SDK
  const [loading, error] = useKakaoLoader();
  
  const { controller, openEquiState, setOpenEquiStatus, draggable, action, 
    UpdateNewLocationMapMarker, handleClickSaveLocationMapMarker } = props;
  
  const [mapKey, setMapKey] = useState(0);
  const [lat, setLat] = useState(controller.map_x);
  const [lng, setLng] = useState(controller.map_y);
  const [spinner, setSpinner] = useState(true);
  const [devices, setDevices] = useState([]);
  const [deviceLocations, setDevicesLocations] = useState([]);
  const [mapStyles, setMapStyles] = useState({});
  
  const [kakaoInitated, setKakaoInitiated] = useState(false);
  
  // ** UseRef
  const hasPageBeenRendered = useRef({ effect1: false, effect2: false, effect3: false });

  // ** Async Functions
  async function fetchEquiState(){
    setSpinner(true);
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/equi_state/${controller.local_area_id}/${controller.local_area_controller_number}`
    ).then(response => {
      if(response) {
        let ArrayLocations = [];
        response.map((equi_state, rowID) => {
          let location = equi_state.gwl.split(',');
          let locObject = 
          {
            'id': rowID,
            'posX': location[0],
            'posY': location[1]
          }
          ArrayLocations.push(locObject);
          //console.log('posX: '+location[0]+' posY: '+location[1]);
        })
        setDevices(response);
        setDevicesLocations(ArrayLocations);
      }
    }).catch(error => {
      console.error('error: '+ error);
    }).finally(() => {
      setSpinner(true);
    })
  }

  // ** Handle Functions
  const handleDragStartMapMarker = () => {
    console.log('start dragging');
  }

  const handleDragEndMapMarker = event => {
    console.log(event.getPosition())
    setLat(event.getPosition().Ma);
    setLng(event.getPosition().La);
    UpdateNewLocationMapMarker({lat: event.getPosition().Ma, lng: event.getPosition().La});
    //console.log(refCreateMapMarker);
  }

  // ** UpdateMarkers Div Container
  const updateMapMarkers = () => {
    const divContainMapMarkers = document.getElementsByClassName('MessageMapMarker');

    if(divContainMapMarkers.length > 0){
      Array.from(divContainMapMarkers).map(marker => {
        const parent = marker.parentNode;
        parent.style['width']= '100%';

        const parentParent = parent.parentNode;
        parentParent.style['width']  = '170px';
        parentParent.style['height'] = 'auto';
        parentParent.style['border'] = 0;
        parentParent.style['text-align']  = 'center';
        parentParent.style['z-index']  = 10;
      })
    }
  }
  

  useEffect(() => {
    if(controller.local_area_id && controller.id) {
      if(action != 'create') fetchEquiState();
    } else {
      console.error('Missing local_area id or controller ID');
    }
    /*const element = document.querySelectorAll("button[title='스카이뷰']")[1]; refButton = element; //refButton.click();*/
  },[]);

  useEffect(() => {
    if(hasPageBeenRendered.current['effect1']) {
      setKakaoInitiated(true);
      
      setLat(controller.map_x);
      setLng(controller.map_y);
      if(devices.length){
        setSpinner(false);
        setLat(controller.map_x);
        setLng(controller.map_y);
        setMapKey(mapKey+1);
      }
    }

    
    hasPageBeenRendered.current['effect1'] = true;
  },[devices]);
  
  useEffect(() => {
    if(hasPageBeenRendered.current['effect2']) {
      setSpinner(false);
    }
    setMapStyles({
      minWidth: "1240px",
      width: "1240px",
      height: "505px",
      border: 'solid 1px #aab'});

    hasPageBeenRendered.current['effect2'] = true;
  },[kakaoInitated, lat, lng]);
  
  useEffect(() =>{
    if(loading){
      setSpinner(false);
    }
    setMapKey(mapKey+1);
  },[error])

  useEffect(() => {
    if(controller.map_x != '' && controller.map_y != ''){
      setSpinner(false);
      setDevices([{}]);
    }
  },[openEquiState, controller])

  useEffect(() => {
    if(hasPageBeenRendered.current['effect1']) {
      setMapStyles({
        minWidth: "1240px",
        width: "1240px",
        height: "505px",
        border: 'solid 1px #aaa'});
    }
    
  },[mapKey])
  
  //** -- Custom Marker Component */
  const CustomMarkerComponent = props => {

    const {equi_state, rowID, controller} = props;
    const [hoverMarker, setHoverMarker] = useState(false);
    const [iconState, setIconState] = useState('b');

    const prevController = useRef();
  
    useEffect(()=>{
      prevController.current = controller;
    },[])
    useEffect(()=>{
      if(equi_state.state_code != 0) {setIconState('o'); console.log('state_code: '+equi_state.state_code)}

      if(prevController.current !== controller) console.log(`${iconState}_${equi_state.equi_num}.png ${prevController.current} - ${controller}`)
    },[controller])

    return (
      <MapMarker 
        position={{
          lat: equi_state.map_y,
          lng: equi_state.map_x
        }}
        key={rowID}
        sx={{
          with: '100%',
          border: 0
        }}
        infoWindowOptions={{
          className: 'markerInfoWindow',
          style: {display: 'none', width: '100%'}
        }}
        clickable = {false}
        image={{
          src: `/icon/numberMapMarker/${iconState}_${equi_state.equi_num}.png`,
          size: {width: 30, height: 30},
          option: {
            spriteSize: { width: 36, height: 98 },
            spriteOrigin: {x: 0, y: 0}
          }
        }}
        onMouseOver={
          () => setHoverMarker(true)
        }
        onMouseOut={
          () => setHoverMarker(false)
        }
      >
        { hoverMarker && 
        <div style={{
            padding: "5px",
            color: "#000",
            display: "flex",
            flexDirection:'column',
            fontSize: 12,
            height: "120px"
            }}>
          <span>{`발생일시: ${equi_state.occur_time}`}</span>
          <span>{`시설물상태:`} <CheckStateValue stateValue ={equi_state.state_code}/></span>
          <span>{`보행등상태:`} <CheckLightStateValue lightState={equi_state.light_state}/></span>
          <span>{`스피커상태:`} <CheckSpeakeStateValue speakerState={equi_state.speaker_state}/></span>
          <span>{`버튼상태:`} <CheckButtonStateValue buttonState={equi_state.button_state}/></span>
        </div>}
      </MapMarker>
    )

  }

  return(
    <Box 
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(241, 244, 249, 1)'
      }}
    >
      <Typography
        sx={{
          width: '100%',
          fontSize: '22px',
          paddingRight: '5px',
          justifySelf: 'center',
          marginTop: 10,
          marginBottom: 5
        }}
        variant='h6'
      >{controller.local_area_controller_number}번 {controller.controller_name} Controllers: {deviceLocations.length}</Typography>
      <Box
        className="content-map"
        sx={{
          backgroundColor: 'rgba(241,244,249,1)',
          width: '100%',
          minWidth:' 400px',
          height: '505px',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 30px',
          '& #react-kakao-maps-sdk-map-container':
          {
            '& div:nth-of-type(3)':{
              '& div:nth-of-type(1)':{
                width: '130px !important',
                boxSizing: 'initial !important',
                '& button:nth-of-type(1)':{
                  width: '30px !important'
                }
              },
              '& div:nth-of-type(2) div':{
                width: 'initial !important',
                '& div':{
                  width: '32px !important',
                  '& div:nth-of-type(1), & div:nth-of-type(2)': { width: '4px !important' },
                  '& :nth-of-type(3)':{ width: '20px !important' }
                }
              }
            }
          }
        }}
      >
      { (kakaoInitated && !spinner && devices.length ) ? (
      <Map
        center={{ lat: lat, lng: lng }}
        style={ mapStyles }
        draggable = {draggable}
        level={1}
        key={mapKey}
        
      >
        <MapTypeControl />
        <ZoomControl />
        { /* -- Draggable Marker when creating -- */}
        { action == 'create' ? 
          <MapMarker
            position={{
              lat: lat,
              lng: lng
            }}
            draggable = { true }
            clickable = { true }
            onCreate={() => updateMapMarkers()}
            onDragStart= {handleDragStartMapMarker}
            onDragEnd  = {handleDragEndMapMarker}
            infoWindowOptions={{
              disableAutoPan: true
            }}
          >
            <div 
              className='MessageMapMarker'
              style={{
                width: '150px',
                color: "#000",
                fontSize: 12,
                border: 0,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
            <Button 
              label = {'저장'} 
              onClick = {handleClickSaveLocationMapMarker}
              className ='saveButton'
              sx={{ 
                backgroundColor: 'rgba(241,244,249,1)',
                color: 'black',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'white',
                  border: '1px solid #d02020 '
                }
              }}
            >{'저장하고 닫기 <-'}</Button>
          </div>
          </MapMarker>
        :''}
        {/* -- Listing All Equi_states -- */}
        { action == 'view' || action == 'edit' ?
        devices.map((row, rowID) => (
          //*********** */
          <CustomMarkerComponent controller={controller.local_area_id} key={rowID} equi_state ={row} rowID ={rowID}/>
          ))
          :''}
        {/* -- Map Type HYBRID for view or edit -- */}
        { action == 'view' || action == 'edit' ? 
          <MapTypeId type={kakao.maps.MapTypeId ? kakao.maps.MapTypeId.HYBRID : ''} />
        :''}

      </Map>
      ):
      <CircularProgress /> 
    }
      </Box>
      { action == 'view' || action == 'edit' ?
        <EquipmentTableDetails devices = {devices} />
      :''}
    </Box>
  )
}

const CheckStateValue = props => {
  
  const {stateValue} = props;
  var color, text;

  if (stateValue == 0){
    color = 'green';
    text = '정상';
  } else {
    color = 'red';    
    switch(stateValue){
      case 1: {
        text = '이상';
        break;
      }
      case 88: {
        text = '통신에러';
        break;
      }
      case 98: {
        text = '보고중단'
        break;
      } 
      default: { //  TODO: Check '이상' code: 99 ?
        text = '이상';
        break;
      }
    }
  }

  return (
    <span style={{color: color}}>{text}</span>
  );
}

const CheckButtonStateValue = props => {
  const {buttonState} = props;
  var color, text;
  if(buttonState == 1){
    color = 'green';
    text = '정상';
  }else {
    color = 'red';
    text = '이상';
  }
  return (
    <span style={{color: color}}>{text}</span>
  );
}

const CheckSpeakeStateValue = props => {
  const {speakerState} = props;
  var color, text;
  if(speakerState == 1){
    color = 'green';
    text = '정상';
  }else {
    color = 'red';
    text = '이상';
  }
  return (
    <span style={{color: color}}>{text}</span>
  );
}

const CheckLightStateValue = props => {
  const {lightState} = props;
  var color, text;

  switch(lightState){
    case 1: {
      color= 'green';
      text = '정상';
      break;
    }
    case 2: {
      color= 'red';
      text = '적색이상';
      break;
    }
    case 4: {
      color= 'red';
      text = '녹색이상';
      break;
    }
    case 6: {
      color= 'red';
      text = '전원이상';
      break;
    }
    default: {
      color= 'red';
      text = '전원이상';
      break;
    }
  }
  return (
    <span style={{color: color}}>{text}</span>
  );
}

const EquipmentTableDetails = props => {

  const { devices } = props;

  return (
    <TableContainer component={ Paper }>
      <Table>
        <TableHead sx={{ 
          '& tr th.MuiTableCell-head, & tr th.MuiTableCell-head:first-of-type':{
            fontSize: 12, 
            height: 29, 
            color: '#444', 
            fontWeight: '700', 
            border: '1px solid #9d9d9d', 
            padding: '2px 4px'
          }
        }}>
          <TableRow>
            <TableCell align='center' rowSpan={2}>{"부착"}<br/>{"번호"}</TableCell>
            <TableCell align='center' colSpan={5}>{"제품정보"}</TableCell>
            <TableCell align='center' colSpan={4}>{"제품상태"}</TableCell>
            <TableCell align='center' colSpan={3}>{"펌웨어정보"}</TableCell>
            <TableCell align='center' rowSpan={2}>{"상판"}<br/>{"열림"}<br/>{"횟수"}</TableCell>
            <TableCell align='center' rowSpan={2}>{"버튼"}<br/>{"동작"}<br/>{"횟수"}</TableCell>
            <TableCell align='center' colSpan={3}>{"통신상태"}</TableCell>
            <TableCell align='center' colSpan={3}>{"보행등상태"}</TableCell>
            <TableCell align='center' colSpan={6}>{"볼륨 및 소리 설정"}</TableCell>
            <TableCell align='center' colSpan={2}>{"신호세기"}</TableCell>
            <TableCell align='center' rowSpan={2}>{"주기"}</TableCell>
            <TableCell align='center' rowSpan={2}>{"스쿨존"}<br/>{"안전"}<br/>{"경고"}<br/>{"사용"}<br/>{"상태"}</TableCell>
            <TableCell align='center' rowSpan={2}>{"안전"}<br/>{"경고"}<br/>{"간격"}</TableCell>
            <TableCell align='center' rowSpan={2}>{"시간"}<br/>{"설정값"}<br/>{"확인"}</TableCell>
          </TableRow>
          <TableRow sx={{ '& th':{textTransform: 'none'}}}>
            <TableCell align='center'>{"Addr"}</TableCell>
            <TableCell align='center'>{"LoRa ID"}</TableCell>
            <TableCell align='center'>{"음원"}</TableCell>
            <TableCell align='center'>{"발생 시각"}</TableCell>
            <TableCell align='center'>{"상태"}</TableCell>
            <TableCell align='center'>{"버튼"}</TableCell>
            <TableCell align='center'>{"스피커"}</TableCell>
            <TableCell align='center'>{"그룹"}<br/>{"(횟수)"}</TableCell>
            <TableCell align='center'>{"전원"}</TableCell>
            <TableCell align='center'>{"본체"}</TableCell>
            <TableCell align='center'>{"LoRa"}</TableCell>
            <TableCell align='center'>{"BLE"}</TableCell>
            <TableCell align='center'>{"358"}<br/>{"신호"}</TableCell>
            <TableCell align='center'>{"358"}<br/>{"유도"}</TableCell>
            <TableCell align='center'>{"235"}<br/>{"상호"}</TableCell>
            <TableCell align='center'>{"적색"}</TableCell>
            <TableCell align='center'>{"녹색"}</TableCell>
            <TableCell align='center'>{"잔여"}</TableCell>
            <TableCell align='center'>{"안전"}<br/>{"경고"}<br/>{"횟수"}</TableCell>
            <TableCell align='center'>{"볼륨"}</TableCell>
            <TableCell align='center'>{"바탕음"}<br/>{"볼륨"}</TableCell>
            <TableCell align='center'>{"멜로디"}<br/>{"볼륨"}</TableCell>
            <TableCell align='center'>{"야간"}<br/>{"볼륨"}</TableCell>
            <TableCell align='center'>{"안전"}<br/>{"경고"}<br/>{"볼륨"}</TableCell>
            <TableCell align='center'>{"유도"}<br/>{"거리"}</TableCell>
            <TableCell align='center'>{"신호"}<br/>{"거리"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ 
          '& tr td.MuiTableCell-body, & tr td.MuiTableCell-body:first-of-type':{
            fontSize: 12, 
            height: 29, 
            color: '#777',  
            border: '1px solid #9d9d9d', 
            padding: '2px 4px'
          }
        }}>
          {/* Listing All Equipment ------ */}
          { devices.map((equi_state, rowID) =>(
            <TableRow key={rowID} sx={{boxSizing: 'content-box'}}>
              <TableCell align='center'>{equi_state.equi_num}</TableCell>
              <TableCell align='center'>{equi_state.address}</TableCell>
              <TableCell align='center'>{equi_state.lora_id}</TableCell>
              <TableCell align='center'>{equi_state.sound_text}</TableCell>
              <TableCell align='center'>{equi_state.occur_time}</TableCell>
              <TableCell align='center'><CheckStateValue stateValue={equi_state.state_code}/></TableCell>
              <TableCell align='center'><CheckButtonStateValue buttonState={equi_state.button_state}/></TableCell>
              <TableCell align='center'><CheckSpeakeStateValue speakerState={equi_state.speaker_state}/></TableCell>
              <TableCell align='center'>{equi_state.grid}<br/>{equi_state.guidecnt+"/"+equi_state.alertcnt}</TableCell>
              <TableCell align='center'><CheckLightStateValue lightState={equi_state.light_state}/></TableCell>
              <TableCell align='center'>{equi_state.equiversion ? equi_state.equiversion : '-'}</TableCell>
              <TableCell align='center'>{equi_state.loraversion ? equi_state.loraversion : '-'}</TableCell>
              <TableCell align='center'>{equi_state.bleversion ? equi_state.bleversion : '-'}</TableCell>
              <TableCell align='center'>{equi_state.cover_cnt}</TableCell>
              <TableCell align='center'>{equi_state.button_cnt}</TableCell>
              <TableCell align='center'>{equi_state.m358_cnt}</TableCell>
              <TableCell align='center'>{equi_state.m358i_cnt}</TableCell>
              <TableCell align='center'>{equi_state.m235_cnt}</TableCell>{/* TODO: Based on the count = 0  style changes */}
              <TableCell align='center'>{equi_state.rlstate == 1 ? '정상': '이상'}</TableCell>
              <TableCell align='center'>{equi_state.glstate == 1 ? '정상': '이상'}</TableCell>
              <TableCell align='center'>{equi_state.ulstate == 1 ? '정상': '이상'}</TableCell>
              <TableCell align='center'>{equi_state.redsoundcnt}</TableCell>
              <TableCell align='center'>{equi_state.volume}</TableCell>
              <TableCell align='center'>{equi_state.bvolume}</TableCell>
              <TableCell align='center'>{equi_state.mvolume}</TableCell>
              <TableCell align='center'>{equi_state.nvolume}</TableCell>
              <TableCell align='center'>{equi_state.svolume}</TableCell>
              <TableCell align='center'>{equi_state.induce}</TableCell>
              <TableCell align='center'>{equi_state.signal0}</TableCell>
              <TableCell align='center'>{equi_state.period}</TableCell>
              <TableCell align='center'>{equi_state.statewarning}</TableCell>
              <TableCell align='center'>{equi_state.termofwarning}</TableCell>
              <TableCell align='center'><a>{"시간"}<br/>{"설정값"}</a></TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { ControllerInformation };