// ** React Imports
import { useState, useEffect } from 'react';
import { MapMarker } from "react-kakao-maps-sdk";

// ** Material Components Imports
import { Box } from '@mui/material'

const MapDeviceMarker = props =>{

  const [viewDeviceInfo, setViewDeviceInfo]= useState(true);

  const { controller, listID , clickController, searchedController } = props;

  // ** UpdateMarkers Div Container
  const updateMapMarkers = () => {
    const divContainMapMarkers = document.getElementsByClassName('customOverlay');

    if(divContainMapMarkers.length > 0){
      Array.from(divContainMapMarkers).map(marker => {
        const parent = marker.parentNode;
        parent.style['width']= '100%';

        const parentParent = parent.parentNode;
        parentParent.style['width']  = '170px';
        parentParent.style['height'] = 'auto';
        parentParent.style['border'] = 0;
        parentParent.style['text-align']  = 'center';
      })
    }
  }

  useEffect(()=>{
    if (controller.id == searchedController) {
      setViewDeviceInfo(true)
      //updateMapMarkers();
    }
  }, [searchedController])

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
      onCreate={() => updateMapMarkers()}
      onClick ={() => {setViewDeviceInfo(!viewDeviceInfo); updateMapMarkers(); clickController(controller)}}
      draggable = { false }
      image={{
        src: `/icon/${controller.logo}.png`,
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
            width: 'auto',
            padding: '2px 5px',
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

export {
  MapDeviceMarker
};