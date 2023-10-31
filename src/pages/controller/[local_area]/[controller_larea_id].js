// ** React imports
import { useState, useEffect } from 'react';
import { Map, MapTypeId, 
  MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
  
// ** Material Components Imports
import { Box, Typography } from '@mui/material'

// ** Utils
import { KakaoInit } from 'src/@core/utils/kakao_map_api'


const ControllerInformation = props => {

  const { controller, openEquiState, setOpenEquiStatus } = props;
  const [lat, setLat] = useState(controller.map_x);
  const [lng, setLng] = useState(controller.map_y);

  const [kakaoInitated, setKakaoInitiated] = useState(false);

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
      >{controller.local_area_controller_number}번 {controller.controller_name}</Typography>
      <Box
        className="content-map"
        sx={{
          backgroundColor: 'rgba(241,244,249,1)',
          width: '100%',
          minWidth:' 400px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 30px'
        }}
      >
        <Map
        center={{ lat: lat, lng: lng }}
        style={{
          width: "100%",
          height: "800px",
          border: 'solid 1px #aaa'
        }}
        draggable = {false}
      >
        <MapTypeId type={kakao.maps.MapTypeId.SKYVIEW} />
        <MapTypeControl />
        <ZoomControl />
      </Map>
      
      </Box>
    </Box>
  )
}

export { ControllerInformation };