// ** React Imports
import { useState, useEffect } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Box, Typography } from '@mui/material'
import { Table, TableContainer } from '@mui/material'
import { EnhancedTableHead } from '../../tableComponents'

const headCells = [
  {
    id: 'No',
    numeric: true,
    disablePadding: true,
    label: 'No.',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '구분',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '관리번호',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '교차로명',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '부착번호',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '발생일자',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '내역',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '조치내역',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '담당자',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '결과',
    classes: ''
  },
  {
    id: '',
    numeric: true,
    disablePadding: true,
    label: '설정',
    classes: ''
  }
]

const TrafficLightRegistration = () => {
  // ** Hooks
  const router = useRouter();

  // ** Redux
	const dispatch  = useDispatch();
  
  // ** States
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('No');
  const [masterCheckBoxChecked, setMasterCheckBoxChecked ] = useState(false);
  const [indeterminateMCheckbox, setIndeterminateMCheckbox] = useState(false);

  const handleSelectAllClick = event => {
    console.log(event);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  useEffect(() => {
    // ** Set Page Name and MetaData
    dispatch(rootActions.updateTitle("신호등 구역등록"));
  },[]);

  return(
    <Box>
      <TableContainer>
        <Table stickyHeader>
          <EnhancedTableHead 
            headCells = { headCells }
            indeterminateMCheckbox = { indeterminateMCheckbox }
            numSelected ={0}
            order = { order }
            orderBy ={ orderBy }
            onSelectAllClick = { handleSelectAllClick }
            onRequestSort = { handleRequestSort }
            rowCount = { 0 }
            masteredCheckBoxChecked = { masterCheckBoxChecked }
          />
        </Table>
      </TableContainer>
      <Typography>
        {router.query.local_area} +  {router.query.device_type}
        신호등 구역등록
      </Typography>
    </Box>
  );
}

export default TrafficLightRegistration;