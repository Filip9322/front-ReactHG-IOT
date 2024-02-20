// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Box, Typography, CircularProgress, Tooltip, Button, IconButton, Checkbox } from '@mui/material'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { Reload, Plus } from 'mdi-material-ui'

// ** Utils
import { getFetchURL }  from 'src/@core/utils/fetchHelper'
import { SearchBar } from 'src/pages/map_monitor_location/searchBar'


const IntersectionRegistration = () => {
  // ** States
  const [spinner, setSpinner] = useState(true);
  const [spinner1, setSpinner1] = useState(true);
  const [spinner2, setSpinner2] = useState(true);
  const [controllers, setControllers] = useState([]);
  const [filteredControllers, setFilteredControllers] = useState([]);
  const [controllersNames, SetControllersNames] = useState([{id: 1, name: 'test'}]);
  const [controllersDirections, SetcontrollersDirections] = useState([{id: 1, name: 'test'}]);
  const [controllerSelected, setControllerSelected] = useState({});
  const [cleanSearchField1, setCleanSearchField1] = useState(0);
  const [cleanSearchField2, setCleanSearchField2] = useState(2);

  var names = [];
  var numbers = [];

  // ** Hooks
  const router = useRouter();
  // ** Redux
	const dispatch  = useDispatch();

  // ** Custom Functions
  const updateSearchedController = (controllerID, fieldName) => {

    const controller_s = controllers.find(controller => 
      controller.id == controllerID
    );

    if(fieldName == 'field1'){
      setCleanSearchField2(cleanSearchField1+1);
    }
    if(fieldName == 'field2'){
      setCleanSearchField1(cleanSearchField2+1);
    }
    
    setControllerSelected(controller_s);
    setFilteredControllers([controller_s]);
  }

  const set_ControllerName = controller =>{
    let body = {};
    let name = controller.local_area_controller_number+'범 - '+ controller.controller_name;

    Object.assign(body, {value: controller.id });
    Object.assign(body, {number: controller.local_area_controller_number});
    Object.assign(body, {name: name });

    return body; 
  }

  const set_controllersDirections = controller =>{
    let body = {};

    Object.assign(body, {value: controller.id });
    Object.assign(body, {number: controller.local_area_controller_number});
    Object.assign(body, {name: controller.controller_address });

    return body; 
  }

  const BuildArraySearchBars = () => {
    // ** Arrange names for easy look up on the autocomplete textfield
    if(names.length == 0 || numbers.length == 0){
      controllers.map(controller => {
        // Creatte Array of controllers with name
        let controllerName = set_ControllerName(controller);
        let controllerNumber = set_controllersDirections(controller);
  
        names.push(controllerName);
        numbers.push(controllerNumber)
      });
    }

    SetControllersNames(names);
    SetcontrollersDirections(numbers);
    setFilteredControllers(controllers);
    setSpinner(false);
  }

  // ** Handler Functions
  const handleClickAdd = event => {
    event.preventDefault();
    
  }

  const handleClickClear = event => {
    event.preventDefault();
    BuildArraySearchBars();
    setCleanSearchField1(cleanSearchField2+1);
    setCleanSearchField2(cleanSearchField1+1);
  }

  // ** Async Functions
  async function fetchControllers(){
    setSpinner(true);
    getFetchURL(
       `${process.env.REACT_APP_APIURL}/map_controllers/${router.query.local_area}/${router.query.device_type}`
    ).then(response => {
      if(response) {
        setControllers(response);
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
    if(router.query.local_area) {
      fetchControllers();
    }
  },[router])

  useEffect(()=> {
    BuildArraySearchBars();
  },[controllers])

  useEffect(() =>{
    setSpinner(false);
  },[cleanSearchField1,cleanSearchField2])

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
          justifyContent: 'space-between',
          width: '100%',
          padding: '20px 10px 20px 0'
        }}
      >
        <Box sx={{ display: 'flex'}}>
          <SearchBar
            title={ '관리번호 / 교차로면' }
            controllersNames = {controllersNames} 
            updateSearchedController = { updateSearchedController }
            key = {cleanSearchField1}
            fieldName={'field1'}
          />
          <SearchBar
            title={ '설치장소' }
            controllersNames = {controllersDirections} 
            updateSearchedController = { updateSearchedController }
            key = {cleanSearchField2}
            fieldName={'field2'}
          />
          <Tooltip title={"지우기"}>
            <Button 
              sx = {{ 
                display:'flex',
                marginLeft: '10px',
                position: 'relative',
                alignItems:'center',
                border: 'solid 1px #aaa',
                backgroundColor: '#fff',
                ':hover':{ cursor: 'pointer', backgroundColor: 'rgba(241, 74, 74, 0.9)'}
              }}
              onClick = { handleClickClear }
            >
                <IconButton
                    className={'IconButtonSVG'}
                    title={ '지우기' }
                    arial-label={ '지우기' }
                  >
                  <Reload />
                </IconButton>
              </Button>
          </Tooltip>
        </Box>
        <Tooltip title={"추가"}>
         <Button 
          sx = {{ 
            display:'flex',
            position: 'relative',
            alignSelf: 'flex-end',
            alignItems:'center',
            boxShadow: '0 2px 10px 0 rgba(58, 53, 65, 0.1)',
            border: 'solid 1px #aaa',
            backgroundColor: '#fff',
            ':hover':{ cursor: 'pointer', backgroundColor: 'rgba(241, 74, 74, 0.9)'}
          }}
          onClick = { handleClickAdd }
        >
            <IconButton
                className={'IconButtonSVG'}
                title={ '추가' }
                arial-label={ '추가' }
              >
              <Plus />
            </IconButton>
          </Button>
        </Tooltip>
      </Box>
      )}
      <TableContainer
        sx={{
          maxHeight: 800,
          '& .MuiTableCell':{
            boxSizing: 'content-box'
          },
          '& .TableCellMinimun':{
            width: '5rem'
          },
          '& .TableCellSmall':{
            width: '18rem'
          },
          '& .TableCellMedium':{
            
          }
        }}
      >
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell><Checkbox  /></TableCell>
              <TableCell className={'TableCellMinimun'}>관리번호</TableCell>
              <TableCell>교차로명</TableCell>
              <TableCell className={'TableCellMinimun'}>교차로명형태</TableCell>
              <TableCell className={'TableCellMinimun'}>도로형태</TableCell>
              <TableCell className={'TableCellMinimun'}>제어기 No.</TableCell>
              <TableCell className={'TableCellMinimun'}>관리부서</TableCell>
              <TableCell>주소</TableCell>
              <TableCell className={'TableCellMinimun'}>좌표 X</TableCell>
              <TableCell className={'TableCellMinimun'}>좌표 Y</TableCell>
              <TableCell className={'TableCellMinimun'}>상태</TableCell>
              <TableCell className={'TableCellSmall'}>비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredControllers.map((controller, rowKey) => {
              let controllerStatus = '';
              let controllerStatusColor = '';

              if(!controller.is_active || !controller.is_installed){
                controllerStatus = '비활성';
                controllerStatusColor = '#666';
              } else {
                if(controller.has_abnormalities){
                  controllerStatus = '이상';
                  controllerStatusColor = '#d02020';
                } else {
                  controllerStatus = '정상';
                  controllerStatusColor = '#005826';
                }
              }
              return(
              <TableRow key={rowKey} 
                sx={{
                  '& td.MuiTableCell-root.ControllerStatus': {color: controllerStatusColor}
                }}
              >
                <TableCell><Checkbox  /></TableCell>
                <TableCell className={'TableCellMinimun'}>{controller.local_area_controller_number}</TableCell>
                <TableCell>{controller.controller_name}</TableCell>
                <TableCell className={'TableCellMinimun'}>{controller.controller_type_name}</TableCell>
                <TableCell className={'TableCellMinimun'}>4</TableCell>
                <TableCell className={'TableCellMinimun'}>{controller.local_goverment_controller_number}</TableCell>
                <TableCell className={'TableCellMinimun'}>{controller.controller_management_department}</TableCell>
                <TableCell>{controller.controller_address}</TableCell>
                <TableCell className={'TableCellMinimun'}><Tooltip title={controller.map_x}>{parseFloat(controller.map_x).toFixed(3)}</Tooltip></TableCell>
                <TableCell className={'TableCellMinimun'}><Tooltip title={controller.map_y}>{parseFloat(controller.map_y).toFixed(3)}</Tooltip></TableCell>
                <TableCell className={'TableCellMinimun ControllerStatus'}>{controllerStatus}</TableCell>
                <TableCell className={'TableCellSmall'}>{controller.bigo}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default IntersectionRegistration;