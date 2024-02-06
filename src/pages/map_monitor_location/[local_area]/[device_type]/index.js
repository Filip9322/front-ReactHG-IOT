// ** React Imports
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Map, MarkerClusterer, 
	MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
	
// ** Material Components Imports
import { Box, CircularProgress } from '@mui/material'

// ** Utils
import { KakaoInit } from 'src/@core/utils/kakao_map_api'
import { getFetchURL }  from 'src/@core/utils/fetchHelper'
import { MapDeviceMarker } from '../../mapDeviceMarker'
import { SearchBar } from '../../searchBar'
import { DrawerListControllers } from '../../drawerListControllers'
import { CountingBar } from '../../countingBar'
import { LateralDetailPanel } from '../../lateralDetailPanel'
import { set_ControllerStatusAndLogo, BtLateralMenu,
  filterControllerMapMarkersByType } from '../../commons'

// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

const Map_Monitor_Location_Page = () => {

  // ** States
  const [spinner, setSpinner] = useState(true);
  const [localArea, setLocalArea] = useState({lat:0, lng:0});
  const [controllers, setControllers] = useState([]);
  const [filteredControllers, updateFilteredControllers] = useState([]);
  const [controllersNames, SetControllerNames] = useState([{id: 1, name: 'test'}]);
  const [kakaoInitated, setKakaoInitiated] = useState(false);
  const [lat, setLat] = useState(33.5563);
  const [lng, setLng] = useState(126.79581);

  const [controllerSelected, setControllerSelected] = useState({});
  const [openDrawerSelController, SetOpenDrawerSelController] = useState(false);
  const [searchedController, setSearchedController] = useState({});

  const [filterMapMarker, setFilterMapMarker] = useState(1);
  
  // ** UseRef
  const hasPageBeenRendered = useRef({ 
      effect1: false, 
      effect2: false ,
      effect3: false,
      effect4: false
  });

	// ** Redux
	const dispatch  = useDispatch();

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
				
				// Update Redux Current Local Area
				dispatch(rootActions.updateCurrentLA_ID(localArea.id));
				dispatch(rootActions.updateCurrentLA_Name(localArea.local_name));
				dispatch(rootActions.updateCurrentLA_Logo(localArea.local_logo));
      }
    }).catch(error => { console.error('error: '+error)
    }).finally(() => {
			// Update Redux Current Local Area
			dispatch(rootActions.updateCurrentLA_ID(localArea.id));
			dispatch(rootActions.updateCurrentLA_Name(localArea.local_name));
			dispatch(rootActions.updateCurrentLA_Logo(localArea.local_logo));
			setSpinner(false)}
		);
  }

  async function fetchControllers(){
    setSpinner(true);
    getFetchURL(
       `${process.env.REACT_APP_APIURL}/map_controllers/${router.query.local_area}/${router.query.device_type}`
    ).then(response => {
      if(response) {
        response.map(controller => {
          //  Creating State and Logo key & values
          let body = set_ControllerStatusAndLogo(controller);
          Object.assign(controller, {state: body.state});
          Object.assign(controller, {logo:  body.logo});
        })
        setControllers(response);

        setFilterMapMarker(parseInt(0));
      }
    }).catch(error=> { console.error('error: '+ error)
    }).finally(() => {
      setSpinner(false);
    });
   }
  
  // ** Custom Functions
  const updateCoordinates = (x = 2.1 ,y = 2.1) => {
    setLng(x);
    setLat(y);
  }

  const clickController = (controller) => {
    setControllerSelected(controller);
    SetOpenDrawerSelController(true);
  }

  const updateSearchedController = controllerID => {
    const controller_s = controllers.find(controller => 
      controller.id == controllerID
    );
    
    setControllerSelected(controller_s);
    setSearchedController(controllerID);
  }

  const set_ControllerName = controller =>{
    let body = {};
    let name = controller.local_area_controller_number+'범 '+ controller.controller_name;

    Object.assign(body, {id: controller.id });
    Object.assign(body, {number: controller.local_area_controller_number});
    Object.assign(body, {name: name });

    return body; 
  }

  const filterMapType = type => {
    setFilterMapMarker(parseInt(type));
  }

  const changeOpenDrawerController = setOpen => {
    SetOpenDrawerSelController(setOpen);
  }

  // ** TODO: Scroll map for mobile with drag events
  const updateCenter = (event) => {
    //console.log('Lat: ' + lat + ' Lng: '+ lng);
    //console.log(event);
  }

  
  // ** Update Triggers useEffect
  useEffect(() => {
    // ** Set Page Name and MetaData
    dispatch(rootActions.updateTitle("모니토링"));

    setSpinner(true);
    SetOpenDrawerSelController(false);
  },[])
  
  useEffect(() => {
    if(hasPageBeenRendered.current['effect1']) {
      if(router.query.local_area) {
        fetchLocalAreaByID();
        fetchControllers();
      }
    }

    hasPageBeenRendered.current['effect1'] = true;
  },[router])

  useEffect(()=> {
    if(hasPageBeenRendered.current['effect2']) {
      // ** Arrange names for easy look up on the autocomplete textfield
      let names = [];
      controllers.map(controller => {
        // Creatte Array of controllers with name
        let controllerName = set_ControllerName(controller);
        names.push(controllerName);
      });
      SetControllerNames(names);
    }

    hasPageBeenRendered.current['effect2'] = true;
  },[controllers])

  useEffect(() =>{
    if(hasPageBeenRendered.current['effect3']) {
      setLng(controllerSelected.map_y);
      setLat(controllerSelected.map_x);
      SetOpenDrawerSelController(true);
    }

    hasPageBeenRendered.current['effect3'] = true;
  },[controllerSelected])

  useEffect (() => {
    if(hasPageBeenRendered.current['effect4']) {
      //** Apply filter on Map Markers */
      let filteredMapMarkers = filterControllerMapMarkersByType( controllers, filterMapMarker );
      updateFilteredControllers(filteredMapMarkers);

      setKakaoInitiated(true);
    }

    hasPageBeenRendered.current['effect4'] = true;
  },[filterMapMarker]);

  useEffect(() => {},[kakaoInitated]);
  
  return (
    <Box className="content-center" sx={{position: 'relative'}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}
      >
        <SearchBar 
          controllersNames = {controllersNames} 
          updateSearchedController = { updateSearchedController }
        />
        <CountingBar controllers={controllers} filterMapType={filterMapType}/>
      </Box>
    { kakaoInitated && !spinner ? (
      <Map
        center={{ lat: lat, lng: lng }}
        style={{
          width: "100%",
          height: "800px",
          border: 'solid 1px #aaa'
        }}
        onDragEnd = {updateCenter}
        draggable = {true}
      >
        <MapTypeControl />
        <ZoomControl />
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
          {/* 1,2,3,4 .png - red, yellow, green, blue - 1076  x 1428 filteredControllers */}
          {
            filteredControllers.map((controller, listID) =>{
              return(
                (controller.map_x != null)?(
                <MapDeviceMarker 
                  controller={controller} 
                  listID={listID} 
                  key={listID} 
                  clickController={clickController}
                  searchedController={searchedController}
                />
              ): ("")
              )
            })
          }
          
        </MarkerClusterer>
      </Map>
      ): 
        <CircularProgress />
      }
      <KakaoInit />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <DrawerListControllers controllers = {controllers}/>
      </Box>
        <LateralDetailPanel 
          controller = {controllerSelected} 
          openDrawer={openDrawerSelController}
          setOpenDrawer={changeOpenDrawerController}
        />
      <BtLateralMenu />
    </Box>
  );
};

export default Map_Monitor_Location_Page;