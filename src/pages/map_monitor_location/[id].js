// ** React Imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Map, MapMarker } from "react-kakao-maps-sdk"

// ** Material Components Imports
import { Box } from '@mui/material'
import { CircularProgress }  from '@mui/material'

// ** Utils
import { KakaoInit } from 'src/@core/utils/kakao_map_api'
import { handleURLQueries } from 'src/@core/layouts/utils'
import { getFetchURL }  from 'src/@core/utils/fetchHelper'

const Map_Monitor_Location_Page = () => {
  
  // ** States
  const [spinner, setSpinner] = useState(true);
  const [kakaoInitated, setKakaoInitiated] = useState(false);
  const [localArea, setLocalArea] = useState({lat:0, lng:0});
  const [lat, setLat] = useState(33.5563);
  const [lng, setLng] = useState(126.79581);
  
  // ** Hooks
  const router = useRouter();

  
  // ** Fetch
  async function fetchLocalAreaByID() {
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/api/local_areas/${router.query.id}`
    ).then((response) => {
      if(response) {
        setLocalArea(response);
        updateCoordinates(parseFloat(response.map_x), parseFloat(response.map_y));
      }
    }).catch(error => { console.error('error: '+error)
    }).finally(() => setSpinner(false));
  }
  
  // ** Custom Functions
  const updateCoordinates = (x = 2.1 ,y = 2.1) => {
    setLng(x);
    setLat(y);
  }
  
  // ** Update Triggers useEffect
  useEffect(() => {
    setSpinner(true);
    setKakaoInitiated(true);
  },[])

  useEffect(() => {
    if(router.query.id) fetchLocalAreaByID();
  },[router])
  
  return (
    <Box className="content-center">
    {spinner.toString()}
    { kakaoInitated && !spinner ? (
      <Map
        center={{ lat: lat, lng: lng }}
        style={{ width: "100%", height: "360px" }}
      >
        <MapMarker position={{ lat: lat, lng: lng }}>
          <Box style={{ color: "#000" }}>{`lat: ${lat}, lng: ${lng}`}</Box>
        </MapMarker>
      </Map>
      ): 
        <CircularProgress />
      }
      <KakaoInit />
    </Box>
  );
};

export default Map_Monitor_Location_Page;