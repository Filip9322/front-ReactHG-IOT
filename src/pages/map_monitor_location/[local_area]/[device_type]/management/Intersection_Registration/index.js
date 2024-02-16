// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Box, Typography, CircularProgress, Tooltip, Button, IconButton } from '@mui/material'
import { Plus } from 'mdi-material-ui'

// ** Utils
import { getFetchURL }  from 'src/@core/utils/fetchHelper'
import { SearchBar } from 'src/pages/map_monitor_location/searchBar'


const IntersectionRegistration = () => {
  // ** States
  const [spinner, setSpinner] = useState(true);
  const [controllers, setControllers] = useState([]);
  const [controllersNames, SetControllersNames] = useState([{id: 1, name: 'test'}]);
  const [controllersDirections, SetcontrollersDirections] = useState([{id: 1, name: 'test'}]);
  const [controllerSelected, setControllerSelected] = useState({});
  const [searchedController, setSearchedController] = useState({});

  // ** Hooks
  const router = useRouter();
  // ** Redux
	const dispatch  = useDispatch();

  // ** UseRef
  const hasPageBeenRendered = useRef({ 
    effect1: false, 
    effect2: false ,
    effect3: false,
    effect4: false
  });

  // ** Custom Functions
  const updateSearchedController = controllerID => {
    const controller_s = controllers.find(controller => 
      controller.id == controllerID
    );
    
    setControllerSelected(controller_s);
    setSearchedController(controllerID);
  }

  const set_ControllerName = controller =>{
    let body = {};
    let name = controller.local_area_controller_number+'범 - '+ controller.controller_name;

    Object.assign(body, {id: controller.id });
    Object.assign(body, {number: controller.local_area_controller_number});
    Object.assign(body, {name: name });

    return body; 
  }

  const set_controllersDirections = controller =>{
    let body = {};

    Object.assign(body, {id: controller.id });
    Object.assign(body, {number: controller.local_area_controller_number});
    Object.assign(body, {name: controller.controller_address });

    return body; 
  }

  // ** Handler Functions
  const handleClickAdd = () => {
    event.preventDefault();
    
  }

  // ** Async Functions
  async function fetchControllers(){
    setSpinner(true);
    getFetchURL(
       `${process.env.REACT_APP_APIURL}/map_controllers/${router.query.local_area}/${router.query.device_type}`
    ).then(response => {
      if(response) {
        
        setControllers(response);

        setFilterMapMarker(parseInt(0));

        console.log(response)
      }
    }).catch(error=> { console.error('error: '+ error)
    }).finally(() => {
      setSpinner(false);
    });
  }

  // ** Use Effects
  useEffect(() => {
    // ** Set Page Name and MetaData
    dispatch(rootActions.updateTitle("교차로등록"));
  },[]);
  

  useEffect(() => {
    if(hasPageBeenRendered.current['effect1']) {
      if(router.query.local_area) {
        fetchControllers();
      }
    }

    hasPageBeenRendered.current['effect1'] = true;
  },[router])

  useEffect(()=> {
    if(hasPageBeenRendered.current['effect2']) {
      // ** Arrange names for easy look up on the autocomplete textfield
      let names = [];
      let numbers = [];

      controllers.map(controller => {
        // Creatte Array of controllers with name
        let controllerName = set_ControllerName(controller);
        let controllerNumber = set_controllersDirections(controller);

        names.push(controllerName);
        numbers.push(controllerNumber)
      });

      SetControllersNames(names);
      SetcontrollersDirections(numbers);

      setSpinner(false);
    }

    hasPageBeenRendered.current['effect2'] = true;
  },[controllers])

  return(
    <Box>
      <Typography variant="h3" sx={{ fontSize: '20pt !important' }}>
        { '교차로등록' }
      </Typography>
      { spinner ? (<CircularProgress />) : (
      <Box
        sx= {{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '50%'
        }}
      >
        <SearchBar
          title={ '관리번호 / 교차로면' }
          controllersNames = {controllersNames} 
          updateSearchedController = { updateSearchedController }
        />
        <SearchBar
          title={ '설치장소' }
          controllersNames = {controllersDirections} 
          updateSearchedController = { updateSearchedController }
        />
        <Tooltip title={"추가"}>
         <Button 
          sx = {{ 
            display:'flex',
            position: 'relative',
            alignItems:'center',
            boxShadow: '0 2px 10px 0 rgba(58, 53, 65, 0.1)',
            border: 'solid 1px rgba(58, 53, 65, 0.22)',
            backgroundColor: '#fff',
            ':hover':{ cursor: 'pointer', backgroundColor: 'rgba(241, 74, 74, 0.9)'}
          }}
          onClick = { handleClickAdd }
        >
            <IconButton
                title={ '추가' }
                arial-label={ '추가' }
              >
              <Plus />
            </IconButton>
          </Button>
        </Tooltip>
      </Box>
      )}
    </Box>
  );
}

export default IntersectionRegistration;