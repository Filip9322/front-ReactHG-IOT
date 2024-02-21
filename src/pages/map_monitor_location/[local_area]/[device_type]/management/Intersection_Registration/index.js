// ** React Imports
import { useState, useEffect, useRef, useMemo } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Box, Typography, CircularProgress, Tooltip, Button, Checkbox } from '@mui/material'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel } from '@mui/material'
import { Reload, Plus, MicrosoftExcel } from 'mdi-material-ui'

// ** Utils
import { getFetchURL }  from 'src/@core/utils/fetchHelper'
import { SearchBar } from 'src/pages/map_monitor_location/searchBar'
import { visuallyHidden } from '@mui/utils'


const headCells = [
  {
    id: 'local_area_controller_number',
    numeric: true,
    disablePadding: true,
    label: '관리번호',
    classes: 'TableCellSmall'
  },
  {
    id: 'controller_name',
    numeric: false,
    disablePadding: false,
    label: '교차로명',
    classes: ''
  },
  {
    id: 'controller_type_name',
    numeric: false,
    disablePadding: false,
    label: '교차로명형태',
    classes: 'TableCellMinimun'
  },
  {
    id: 'inse_type',
    numeric: false,
    disablePadding: false,
    label: '도로형태',
    classes: 'TableCellMinimun'
  },
  {
    id: 'local_goverment_controller_number',
    numeric: false,
    disablePadding: false,
    label: '제어기 No.',
    classes: 'TableCellMinimun'
  },
  {
    id: 'controller_management_department',
    numeric: false,
    disablePadding: false,
    label: '관리부서',
    classes: 'TableCellMinimun'
  },
  {
    id: 'controller_address',
    numeric: false,
    disablePadding: false,
    label: '주소',
    classes: 'TableCellMedium'
  },
  {
    id: 'map_x',
    numeric: false,
    disablePadding: false,
    label: '좌표 X',
    classes: 'TableCellMinimun'
  },
  {
    id: 'map_y',
    numeric: false,
    disablePadding: false,
    label: '좌표 Y',
    classes: 'TableCellMinimun'
  },
  {
    id: 'filteredState',
    numeric: false,
    disablePadding: false,
    label: '상태',
    classes: 'TableCellMinimun'
  },
  {
    id: 'bigo',
    numeric: false,
    disablePadding: false,
    label: '비고',
    classes: 'TableCellSmall'
  }
]

const EnhancedTableHead = props => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox 
            color = {'primary'}
            //indeterminate = { }
            checked = { false }
            onChange = {onSelectAllClick}
            inputProps = {{
              'aria-label': '모드 기기 선택'
            }}
          />
        </TableCell>
        { headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false }
            className={headCell.classes?headCell.classes:'notFOUND'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component={'span'} sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending': 'sorted ascending'}
                </Box>
              ):null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const IntersectionRegistration = () => {
  // ** States
  const [spinner, setSpinner] = useState(true);
  const [controllers, setControllers] = useState([]);
  const [filteredControllers, setFilteredControllers] = useState([]);
  const [controllersNames, SetControllersNames] = useState([{id: 1, name: 'test'}]);
  const [controllersDirections, SetcontrollersDirections] = useState([{id: 1, name: 'test'}]);
  const [controllerSelected, setControllerSelected] = useState({});
  const [cleanSearchField1, setCleanSearchField1] = useState(0);
  const [cleanSearchField2, setCleanSearchField2] = useState(2);
  
  // ** Table States
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('local_area_controller_number');
  const [rowsSelected, setRowsSelected] = useState([]);

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) { return -1; }
    if (b[orderBy] > a[orderBy]) { return 1;  }
    return 0;
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
  }

  var visibleRows = useMemo(()=>filteredControllers.slice().sort(getComparator(order, orderBy)),[order,orderBy,filteredControllers]);

  // ** Variables that change
  var names = [];
  var numbers = [];

  // ** Hooks
  const router = useRouter();
  const checBoxMaster = useRef();

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
    visibleRows = [controller_s];
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
    visibleRows = controllers;
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

  const handleClickExcelDownload = event => {
    event.preventDefault();
  }

  const handleChangeCheckBoxItem = event => {
    event.preventDefault();
    console.log(event.currentTarget)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      //const newSelected = controllers.map((n) => n.id);
      //setControllerSelected(n)
      return;
    }
    setRowsSelected([])
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  // ** Async Functions
  async function fetchControllers(){
    setSpinner(true);
    getFetchURL(
       `${process.env.REACT_APP_APIURL}/map_controllers/${router.query.local_area}/${router.query.device_type}`
    ).then(response => {
      if(response) {
        setControllers(response);
        response.map((controller) => {
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
          Object.assign(controller,{filteredState: controllerStatus});
          Object.assign(controller,{filteredStateColor: controllerStatusColor});
        });
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
          padding: '20px 10px 20px 0',
          '& button.IconButtonSVG':{
            display:'flex',
            marginLeft: '10px',
            position: 'relative',
            alignItems:'center',
            border: 'solid 1px #aaa',
            boxShadow: '0 2px 10px 0 rgba(58, 53, 65, 0.1)',
            backgroundColor: '#fff',
            ':hover':{ cursor: 'pointer', backgroundColor: 'rgba(241, 74, 74, 0.9)', '& svg':{ color: '#fff'}},
            '& svg':{ color: '#777'}
          }
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
              className={'IconButtonSVG'}
              onClick = { handleClickClear }
            >
              <Reload />
            </Button>
          </Tooltip>
          <Tooltip title={"설정값 엑셀다운"}>
            <Button 
              className={'IconButtonSVG'}
              onClick = { handleClickExcelDownload }
            >
              <MicrosoftExcel />
            </Button>
          </Tooltip>
        </Box>
        <Tooltip title={"추가"}>
          <Button 
            onClick = { handleClickAdd }
            className={'IconButtonSVG'}
          >
            <Plus />
          </Button>
        </Tooltip>
      </Box>
      )}
      <TableContainer
        sx={{
          maxHeight: 800,
          '& th.MuiTableCell-head':{
            boxSizing: 'content-box'
          },
          '& th.TableCellMinimun':{
            width: '5rem'
          },
          '& th.TableCellMedium':{
            width: '18rem'
          },
          '& th.TableCellMedium':{
            width: '30rem'
          }
        }}
      >
        <Table stickyHeader >
          <EnhancedTableHead
            numSelected ={0} // TODO: Update
            order ={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={controllers.length}
          />
          <TableBody>
            {visibleRows.map((controller, rowKey) => {
              
              return(
              <TableRow key={rowKey} 
                sx={{
                  '& td.MuiTableCell-root.ControllerStatus': {color: controller.filteredStateColor}
                }}
              >
                <TableCell><Checkbox  onChange={ handleChangeCheckBoxItem } value={controller.id}/></TableCell>
                <TableCell className={'TableCellMinimun'}>{controller.local_area_controller_number}</TableCell>
                <TableCell>{controller.controller_name}</TableCell>
                <TableCell className={'TableCellMinimun'}>{controller.controller_type_name}</TableCell>
                <TableCell className={'TableCellMinimun'}>4</TableCell>
                <TableCell className={'TableCellMinimun'}>{controller.local_goverment_controller_number}</TableCell>
                <TableCell className={'TableCellMinimun'}>{controller.controller_management_department}</TableCell>
                <TableCell>{controller.controller_address}</TableCell>
                <TableCell className={'TableCellMinimun'}><Tooltip title={controller.map_x}><span>{parseFloat(controller.map_x).toFixed(3)}</span></Tooltip></TableCell>
                <TableCell className={'TableCellMinimun'}><Tooltip title={controller.map_y}><span>{parseFloat(controller.map_y).toFixed(3)}</span></Tooltip></TableCell>
                <TableCell className={'TableCellMinimun ControllerStatus'}>{controller.filteredState}</TableCell>
                <TableCell className={'TableCellMedium'}>{controller.bigo}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default IntersectionRegistration;