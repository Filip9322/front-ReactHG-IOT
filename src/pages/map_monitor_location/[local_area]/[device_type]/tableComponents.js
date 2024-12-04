// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** MUI Components
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { Checkbox , Box } from '@mui/material';

// ** Utils
import { visuallyHidden } from '@mui/utils'

const tableContainerCSS = {
  maxHeight: 800,
  '& th.MuiTableCell-head':{
    boxSizing: 'content-box'
  },
  '& th.TableCellMinimun':{
    width: '5rem'
  },
  '& th.TableCellSmall':{
    width: '20rem'
  },
  '& th.TableCellMedium':{
    width: '30rem'
  }
}
// ** CheckBoxListItem CHeckALL --------
const ChecboxListItem = props => {
  const { dataID, handleChangeCheckBoxItem, cleanAllCheckbox, masterCheckBoxChecked } = props;
  const [ checkState, setCheckState ] = useState(false);

  const handleClickCheckBoxItem = event =>{
    event.preventDefault();
    
    console.log('subComponent: '+checkState);
    handleChangeCheckBoxItem(event, !checkState);
    
    setCheckState(!checkState);
  }

  useEffect(()=>{
    setCheckState(false);
  },[cleanAllCheckbox]);

  useEffect(() =>{
    setCheckState(masterCheckBoxChecked);
  },[masterCheckBoxChecked]);

  return (
    <Checkbox 
      data-id = { dataID }
      onClick={ handleClickCheckBoxItem }
      checked={ checkState }
      value={ dataID }
      name={ dataID +'_checkbox' }
    />
  );
}

// ** Enhanced Table Head ------------
const EnhancedTableHead = props => {
  
  const { headCells, onSelectAllClick, order, orderBy, indeterminateMCheckbox, 
    rowCount, onRequestSort, masterCheckBoxChecked } = props;
  const [stateMCheckBox, setStateMCheckBox] = useState(false);

  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  }

  useEffect(() =>{
    setStateMCheckBox(masterCheckBoxChecked);
  },[masterCheckBoxChecked])

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox 
            color = {'primary'}
            indeterminate = {indeterminateMCheckbox}
            checked={stateMCheckBox}
            onClick = {onSelectAllClick}
            aria-label='모드 기기 선택'
            name="allDevices_checkbox"
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

export { EnhancedTableHead, ChecboxListItem, tableContainerCSS }