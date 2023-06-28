// ** React Imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk"

// ** Material Components Imports
import { Box, Link } from '@mui/material'
import { CircularProgress }  from '@mui/material'

// ** Utils
import { KakaoInit } from 'src/@core/utils/kakao_map_api'
import { handleURLQueries } from 'src/@core/layouts/utils'
import { getFetchURL }  from 'src/@core/utils/fetchHelper'

const Map_Monitor_Location_Page = () => {
  
  // ** States
  const [spinner, setSpinner] = useState(true);
  const [localArea, setLocalArea] = useState({lat:0, lng:0});
  const [controllers, setControllers] = useState([]);
  const [kakaoInitated, setKakaoInitiated] = useState(false);
  const [lat, setLat] = useState(33.5563);
  const [lng, setLng] = useState(126.79581);
  
  // ** Hooks
  const router = useRouter();

  
  // ** Fetch
  async function fetchLocalAreaByID() {
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/api/local_areas/${router.query.local_area}`
    ).then((response) => {
      if(response) {
        setLocalArea(response);
        updateCoordinates(parseFloat(response.map_x), parseFloat(response.map_y));
      }
    }).catch(error => { console.error('error: '+error)
    }).finally(() => setSpinner(false));
  }

  async function fetchControllers(){
    getFetchURL(
       `${process.env.REACT_APP_APIURL}/map_controllers/${router.query.local_area}/${router.query.device_type}`
    ).then(response => {
      if(response) setControllers(response);
    }).catch(error=> { console.error('error: '+ error)
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

    if(router.query.local_area) {
      fetchLocalAreaByID();
      fetchControllers();
    }
  },[router])
  
  return (
    <Box className="content-center">
    {spinner.toString()}
    { kakaoInitated && !spinner ? (
      <Map
        center={{ lat: lat, lng: lng }}
        style={{ width: "100%", height: "360px" }}
      >
        <MarkerClusterer 
          averageCenter = {true}
          minLevel = {7}
        >
          {/* 1,2,3,4 .png - red, yellow, green, blue - 1076 x 1428 */}
          {
            controllers.map((controller, listID) =>{
              console.log(controller.map_x);
              return(
                <MapMarker
                  key={listID}
                  className={'mapMarker'}
                  position  = {{ lat: controller.map_x, lng: controller.map_y }}
                  draggable = { false }
                  image={{
                    src: '/icon/2.png',
                    size: { width: 40, height: 50 },
                    option: {
                      spriteSize: { width: 36, height: 98 },
                      spriteOrigin: { x: 0, y: 0 }
                    }
                  }}
                >
                  <Box className={'customoverlay'} style={{ backgroundColor: "rgba(255,255,255,0.6)" }}>
                    <Link href='/map_monitor_location/3' target='_blank'>
                      {controller.controller_name}
                    </Link>
                  </Box>
                </MapMarker>
              )
            })
          }
          
        </MarkerClusterer>
      </Map>
      ): 
        <CircularProgress />
      }
      <KakaoInit />
    </Box>
  );
};

export default Map_Monitor_Location_Page;