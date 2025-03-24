// ** React Imports
import { useState, useEffect } from 'react'
  
// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Box, Button, Tooltip, Typography } from '@mui/material'
import { Table, TableContainer, TableBody, TableFooter, TableCell, TableRow, TablePagination } from '@mui/material'
import { EnhancedTableHead, ChecboxListItem, tableContainerCSS } from '../../tableComponents'
import { PencilOutline, SeatPassenger } from 'mdi-material-ui'

// ** Utils
import { postFetchURL } from 'src/@core/utils/fetchHelper'
import { getFetchURL }  from 'src/@core/utils/fetchHelper'

//import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'

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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [masterCheckBoxChecked, setMasterCheckBoxChecked ] = useState(false);
  const [indeterminateMCheckbox, setIndeterminateMCheckbox] = useState(false);

  const [eventsArray, setEventsArray] = useState([{}]);

  const fetchEventsByLocalArea = async () => {
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/event_history/byLocalArea/${router.query.local_area}/${page}`
    ).then((response) => {
      if(response){
        setEventsArray(response);
      }
      console.log(response);
    }).catch(error => { console.error('error: '+error)

    }).finally(() => {
      //setSpinner(false);
    })
  }

  const handleSelectAllClick = event => {
    console.log(event);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  useEffect(() => {
    // ** Set Page Name and MetaData
    dispatch(rootActions.updateTitle("이벤트관리"));
    fetchEventsByLocalArea();
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
              <TableCell className={'TableCellMinimun'}>No</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>-</TableCell>
              <TableCell className={'TableCellMinimun'}>
                <Tooltip title={'설정'}>
                  <Button>
                    <PencilOutline />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
            </TableRow>
          </TableFooter>
        </Table>
        <TablePagination
          component={'div'}
          rowsPerPageOptions={[5,10,25, {label: '전체', value: -1}]}
          colSpan={3}
          count={100}
          rowsPerPage={rowsPerPage}
          page={page}
          slotProps={{
            select: {
              'aria-label': 'rows per page'
            },
            native: true
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}

          //ActionsComponent={TablePaginationActions}
        />
      </TableContainer>
    </Box>
  );
}

export default EventManagement;