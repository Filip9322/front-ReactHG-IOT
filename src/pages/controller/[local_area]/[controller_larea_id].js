// ** React imports
import { useState, useEffect, useRef } from 'react';
import { Map,
  MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
  
// ** Material Components Imports
import { Box, Typography } from '@mui/material'

// ** Utils
import { getFetchURL } from 'src/@core/utils/fetchHelper';

const ControllerInformation = props => {

  const refButton = useRef(null);

  const { controller, openEquiState, setOpenEquiStatus } = props;
  const [lat, setLat] = useState(controller.map_x);
  const [lng, setLng] = useState(controller.map_y);

  const [kakaoInitated, setKakaoInitiated] = useState(false);

  async function fetchEquiState(){
    //setSpinner(true);
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/equi_state/${controller.local_area_id}/${controller.id}`
    ).then(response => {
      if(response) {
        response.map ( equi_state => {
          console.log(equi_state.id);
        })
      }
    }).catch(error => {
      console.error('error: '+ error);
    }).finally(() => {
      //setSpinner(false);
    })
  }

  useEffect(() => {
    if(controller.local_area_id && controller.id) {
      fetchEquiState();
    } else {
      console.error('Missing local_area id or controller ID');
    }
    //console.log(bIsKakaoMapLoaded());

    /*const element = document.querySelectorAll("button[title='스카이뷰']")[1];
    refButton = element;
    //refButton.click();
    */
  },[]);

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
        <Map
        center={{ lat: lat, lng: lng }}
        style={{
          width: "1240px",
          height: "505px",
          border: 'solid 1px #aaa'
        }}
        draggable = {false}
      >
        <MapTypeControl />
        <ZoomControl />
      </Map>
      
      </Box>
    </Box>
  )
}

//<MapTypeId type={kakao.maps.MapTypeId.SKYVIEW} />

export { ControllerInformation };