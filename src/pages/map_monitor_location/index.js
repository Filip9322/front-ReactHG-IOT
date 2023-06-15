// ** React Imports
import { useState, useEffect } from 'react';
import { Map, MapMarker }from 'react-kakao-maps-sdk';

// ** Material Components Imports
import { Box } from '@mui/material'

// ** Custom Imports
import { kakao_api_Init } from '../../@core/utils/kakao_map_api'

const Map_Monitor_Location_Page = () => {
  
  const [kakaoInitated, setKakaoInitiated] = useState(false);
  
  const checkIsLoaded = () => {
    setKakaoInitiated(true);
  }
  
  useEffect(() => {
    kakao_api_Init().then((res)=>{
      console.log(res)
      checkIsLoaded();
      //res.addEventListener("load", checkIsLoaded);
    });
  },[])

  return (
    <Box className="content-center">
    { kakaoInitated ? (
      <Map 
        center={{lat: 33.5563, lng: 126.79581}}
        sx={{width: '100%', height: '360ppx'}}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841}}>
          <Box sx={{color: 'black'}}>
            {'Hello World'}
          </Box>
        </MapMarker>
        {'help'}
      </Map>
      ): 'good Baye'}
      <kakao_api_Init />
    </Box>
  );
};

export default Map_Monitor_Location_Page;