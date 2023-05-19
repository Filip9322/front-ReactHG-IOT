// ** React Imports
import { useState, useEffect } from "react";

// ** Material UI Import
import Box from '@mui/material/Box'
import {DataGrid, GridRow, GridColumnHeaders, GridTollbar } from  '@mui/x-data-grid'
//import { DataGrid, GridPreProcessEditCellProps, GridColumnHeaders } from '@mui/x-data-grid'

const TableLocals = props => {

  const { wareas } = props;
  
  const {data} = {
    'colums':[{field:'id'}, {field:'name'}],
    'rows':[{id: 0, name: 'Felipe'}],
    'initialState':{}
  }

  return (
    <DataGrid 
      columns = {[{field:'name'}, {field:'age'}]} 
      rows={[{id: 1, name: 'NN', age: 20}]} 
      slots={{toolbar: GridTollbar}} 
    />
  )
}

export default TableLocals;