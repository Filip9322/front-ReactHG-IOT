// ** React Imports
import { useState, useEffect } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Box, Button, Tooltip, Typography } from '@mui/material'
import { Table, TableContainer, TableBody, TableCell, TableRow } from '@mui/material'
import { EnhancedTableHead, ChecboxListItem, tableContainerCSS } from '../../tableComponents'
import { PencilOutline } from 'mdi-material-ui'

// [POST] - editor/getEventData.do { occur_time, inse_num, equi_num }
// [POST] - editor/updateEventData.do
const headCells = [
  {
    id: 'No',
    numeric: true,
    disablePadding: true,
    label: 'No.',
    classes: ''
  },
  {
    id: 'event_gubn',
    numeric: false,
    disablePadding: false,
    label: '구분',
    classes: 'TableCellMinimun'
  },
  {
    id: 'inse_num',
    numeric: false,
    disablePadding: false,
    label: '관리번호',
    classes: 'TableCellMinimun'
  },
  {
    id: 'inse_name',
    numeric: false,
    disablePadding: false,
    label: '교차로명',
    classes: 'TableCellSmall'
  },
  {
    id: 'equi_num',
    numeric: false,
    disablePadding: false,
    label: '부착번호',
    classes: 'TableCellSmall'
  },
  {
    id: 'occur_time',
    numeric: false,
    disablePadding: false,
    label: '발생일자',
    classes: 'TableCellMedium'
  },
  {
    id: 'content ',
    numeric: false,
    disablePadding: false,
    label: '내역',
    classes: 'TableCellMedium'
  },
  {
    id: 'action_content',
    numeric: false,
    disablePadding: false,
    label: '조치내역',
    classes: 'TableCellMedium'
  },
  {
    id: 'action_name',
    numeric: false,
    disablePadding: false,
    label: '담당자',
    classes: 'TableCellSmall'
  },
  {
    id: 'result',
    numeric: false,
    disablePadding: false,
    label: '결과',
    classes: 'TableCellSmall'
  },
  {
    id: 'edit',
    numeric: false,
    disablePadding: false,
    label: '설정',
    classes: 'TableCellSmall'
  }
]

const EventManagement = () => {
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
    dispatch(rootActions.updateTitle("이벤트관리"));
  },[]);

  return(
    <Box>
      {router.query.local_area} +  {router.query.device_type}
      <Typography variant='h3' sx={{ fontSize: '20pt !important'}}>
        { '이벤트관리' }
      </Typography>
      <TableContainer
        sx = { tableContainerCSS }
      >
        <Table stickyHeader>
          <EnhancedTableHead 
            headCells = { headCells }
            indeterminateMCheckbox = { indeterminateMCheckbox }
            numSelected ={0} // TODO: Update
            order = { order } 
            orderBy ={ orderBy }
            onSelectAllClick = { handleSelectAllClick }
            onRequestSort = { handleRequestSort }
            rowCount = { 0 }
            masteredCheckBoxChecked = { masterCheckBoxChecked }
          />
          <TableBody>
            <TableRow>
              <TableCell>
                <ChecboxListItem 
                />
              </TableCell>
              <TableCell className={'TableCellMinimun'}>No 3/6 </TableCell>
              <TableCell className={'TableCellMinimun'}>500</TableCell>
              <TableCell className={'TableCellMinimun'}>담청</TableCell>
              <TableCell className={'TableCellMinimun'}>3'600'000</TableCell>
              <TableCell className={'TableCellMinimun'}>180'000</TableCell>
              <TableCell className={'TableCellMinimun'}>60</TableCell>
              <TableCell className={'TableCellMinimun'}>3</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>전체</TableCell>
              <TableCell className={'TableCellMinimun'}>{3600000+180000+60+3}</TableCell>
              <TableCell className={'TableCellMinimun'}>
                <Tooltip title={'설정'}>
                  <Button>
                    <PencilOutline />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <ChecboxListItem 
                />
              </TableCell>
              <TableCell className={'TableCellMinimun'}>No 1/6</TableCell>
              <TableCell className={'TableCellMinimun'}>1000</TableCell>
              <TableCell className={'TableCellMinimun'}>담청</TableCell>
              <TableCell className={'TableCellMinimun'}>13'500'000</TableCell>
              <TableCell className={'TableCellMinimun'}>1'125'000</TableCell>
              <TableCell className={'TableCellMinimun'}>247'500</TableCell>
              <TableCell className={'TableCellMinimun'}>45</TableCell>
              <TableCell className={'TableCellMinimun'}>9</TableCell>
              <TableCell className={'TableCellMinimun'}>전체</TableCell>
              <TableCell className={'TableCellMinimun'}>{13500000+1125000+247500+45+9}</TableCell>
              <TableCell className={'TableCellMinimun'}>
                <Tooltip title={'설정'}>
                  <Button>
                    <PencilOutline />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <ChecboxListItem 
                />
              </TableCell>
              <TableCell className={'TableCellMinimun'}>No 2/12</TableCell>
              <TableCell className={'TableCellMinimun'}>2000</TableCell>
              <TableCell className={'TableCellMinimun'}>담청</TableCell>
              <TableCell className={'TableCellMinimun'}>11'200'000</TableCell>
              <TableCell className={'TableCellMinimun'}>2'800'000</TableCell>
              <TableCell className={'TableCellMinimun'}>110'000</TableCell>
              <TableCell className={'TableCellMinimun'}>200</TableCell>
              <TableCell className={'TableCellMinimun'}>24</TableCell>
              <TableCell className={'TableCellMinimun'}>8</TableCell>
              <TableCell className={'TableCellMinimun'}>전체</TableCell>
              <TableCell className={'TableCellMinimun'}>{11200000+2800000+110000+200+24+8}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default EventManagement;