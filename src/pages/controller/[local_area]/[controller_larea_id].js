// ** React imports
import { useState, useEffect, useRef } from 'react';
import { Map, MapMarker, MapTypeId,
  MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
  
// ** Material Components Imports
import { Box, Typography, CircularProgress } from '@mui/material'
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material'

// ** Utils
import { getFetchURL } from 'src/@core/utils/fetchHelper';

const ControllerInformation = props => {

  const refButton = useRef(null);

  const { controller, openEquiState, setOpenEquiStatus } = props;

  const [spinner, setSpinner] = useState(true);
  const [devices, setDevices] = useState([]);
  const [deviceLocations, setDevicesLocations] = useState([]);
  const [lat, setLat] = useState(controller.map_x);
  const [lng, setLng] = useState(controller.map_y);

  const [kakaoInitated, setKakaoInitiated] = useState(false);

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
      setSpinner(false);
    })
  }

  useEffect(() => {
    if(controller.local_area_id && controller.id) {
      fetchEquiState();
    } else {
      console.error('Missing local_area id or controller ID');
    }
    /*const element = document.querySelectorAll("button[title='스카이뷰']")[1]; refButton = element; //refButton.click();*/
  },[]);

  useEffect(() => {
    setKakaoInitiated(true);
  },[devices]);
  useEffect(() => {},[kakaoInitated]);
  
  //** -- Custom Marker Component */
  const CustomMarkerComponent = props => {

    const {equi_state, rowID} = props;
    const [hoverMarker, setHoverMarker] = useState(false);

    useEffect(()=>{
      console.log(equi_state.id)
    },[])

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
          src: `/icon/numberMapMarker/b_${equi_state.equi_num}.png`,
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
          <span>발생일시: 2023-12-12 10:07:53</span>
          <span>시설물상태: 정상</span>
          <span>보행등상태: 정상</span>
          <span>스피커상태: 정상</span>
          <span>버튼상태: 정상</span>
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
      { (kakaoInitated && !spinner ) ? (
      <Map
        center={{ lat: lat, lng: lng }}
        style={{
          width: "1240px",
          height: "505px",
          border: 'solid 1px #aaa'
        }}
        draggable = {false}
        level={1}
      >
        <MapTypeControl />
        <ZoomControl />
        {/* -- Listing All Equi_states -- */}
        {
          devices.map((row, rowID) => (
            //*********** */
            <CustomMarkerComponent key={rowID} equi_state ={row} rowID ={rowID}/>
            ))  
        }
        <MapTypeId type={kakao.maps.MapTypeId.HYBRID} />
      </Map>
      ):
      <CircularProgress /> 
    }
      </Box>
      <EquipmentTableDetails />
    </Box>
  )
}


const EquipmentTableDetails = props => {

  return (
    <TableContainer component={ Paper }>
      <TableHead sx={{ 
        '& tr th.MuiTableCell-head, & tr th.MuiTableCell-head.MuiTableCell-head:first-of-type':{
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
          <TableCell align='center' colSpan={2}>{"주기"}</TableCell>
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
          <TableCell align='center'>{"상판"}<br/>{"열림"}<br/>{"횟수"}</TableCell>
          <TableCell align='center'>{"버튼"}<br/>{"동작"}<br/>{"횟수"}</TableCell>
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
      <TableBody>
        {/* Listing All Equipment ------ */}
      </TableBody>
    </TableContainer>
  );
}

export { ControllerInformation };