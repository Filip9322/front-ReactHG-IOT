// ** React Imports
import { useState, useEffect } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk"

// ** Material Components Imports
import { Box } from '@mui/material'

// ** Custom Imports
import { KakaoInit } from '../../@core/utils/kakao_map_api'

const Map_Monitor_Location_Page = () => {
  
  const [kakaoInitated, setKakaoInitiated] = useState(false);
  
  useEffect(() => {
    setKakaoInitiated(true);
  },[])

  return (
    <Box className="content-center">
    { kakaoInitated ? (
      <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "360px" }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
      ): 'good Baye'}
      <KakaoInit />
    </Box>
  );
};

export default Map_Monitor_Location_Page;