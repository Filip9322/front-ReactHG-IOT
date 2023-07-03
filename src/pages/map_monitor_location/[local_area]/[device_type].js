// ** React Imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

// ** Material Components Imports
import { Box, Link } from '@mui/material'
import { CircularProgress }  from '@mui/material'

// ** Utils
import { KakaoInit } from 'src/@core/utils/kakao_map_api'
import { handleURLQueries } from 'src/@core/layouts/utils'
import { getFetchURL }  from 'src/@core/utils/fetchHelper'
import { LateralPanel } from '../commons'

const Map_Monitor_Location_Page = () => {
  
  // ** States
  const [spinner, setSpinner] = useState(true);
  const [localArea, setLocalArea] = useState({lat:0, lng:0});
  const [controllers, setControllers] = useState([]);
  const [kakaoInitated, setKakaoInitiated] = useState(false);
  const [lat, setLat] = useState(33.5563);
  const [lng, setLng] = useState(126.79581);

  const [controllerSelected, SetControllerSelected] = useState({});
  
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

  const clickController = (controller) => {
    SetControllerSelected(controller);
  }


  // ** TODO: Scroll map for mobile with drag events
  const updateCenter = (event) => {
    //console.log('Lat: ' + lat + ' Lng: '+ lng);
    //console.log(event);
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
        style={{
          width: "100%",
          height: "800px" 
        }}
        onDragEnd = {updateCenter}
      >
        <MarkerClusterer 
          averageCenter = {true}
          minLevel = {7}
          className={'markerCluster'}
          style={{
            '& div:has(.customOverlay)':{
              width: '100%',
              border: 0
            } 
          }}
        >
          {/* 1,2,3,4 .png - red, yellow, green, blue - 1076 x 1428 */}
          {
            controllers.map((controller, listID) =>{
              return(
                <MapDeviceMarker 
                  controller={controller} 
                  listID={listID} 
                  key={listID} 
                  clickController={clickController}
                />
              )
            })
          }
          
        </MarkerClusterer>
      </Map>
      ): 
        <CircularProgress />
      }
      <KakaoInit />
      <LateralPanel controller = {controllerSelected}/>
    </Box>
  );
};


const MapDeviceMarker = props =>{

  const [viewDeviceInfo, setViewDeviceInfo]= useState(false);

  const { controller, listID , clickController } = props;

  // ** UpdateMarkers Div Container
  const updateMapMarkers = () => {
    const divContainMapMarkers = document.getElementsByClassName('customOverlay');

    if(divContainMapMarkers.length > 0){
      Array.from(divContainMapMarkers).map(marker => {
        const parent = marker.parentNode;
        parent.style['width']= '100%';
      })
    }
  }

  useEffect(()=>{

  },[viewDeviceInfo]);

  return(
    <MapMarker
      position  = {{ lat: controller.map_x, lng: controller.map_y }}
      key={listID}
      sx={{
          width: '100%',
          border: 0
      }}
      infoWindowOptions ={{
        className: 'markerInfoWindow',
        style: {display: 'none', width:'100%'}
      }}
      clickable = { true }
      onClick ={() => {setViewDeviceInfo(!viewDeviceInfo); updateMapMarkers(); clickController(controller)}}
      draggable = { false }
      image={{
        src: '/icon/icon_on.png',
        size: { width: 50, height: 50 },
        option: {
          spriteSize: { width: 36, height: 98 },
          spriteOrigin: { x: 0, y: 0 }
        }
      }}
      title={controller.local_area_controller_number+'번 '+controller.controller_name}
    >
      {viewDeviceInfo && (
        <Box 
          className={'customOverlay'} 
          style={{
            width: '100%',
            padding: '5px',
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: "#005826", 
            color: 'white',
            display: 'inline-block',
            textAlign: 'center'
          }}
        >
          {controller.local_area_controller_number+'번 '+controller.controller_name}
        </Box>
      )}
    </MapMarker>
  )
}

export default Map_Monitor_Location_Page;