// ** React Imports
import { useState, useEffect } from "react";

// ** Material UI Import
import Box from '@mui/material/Box'
import {DataGrid, GridRow, GridColumnHeaders, GridTollbar } from  '@mui/x-data-grid'
//import { DataGrid, GridPreProcessEditCellProps, GridColumnHeaders } from '@mui/x-data-grid'

const TableLocals = props => {

  let bulkInsert = Array.apply(null, Array(35)).map((row,i)=>{
    let rowObj = {}
    if(i < 21) {
      rowObj = {
        id: i+1,
        larea_id: i+1,
        device_type_id: 1,
        user_mod: 1,
        is_deleted: false,
        createdAt: '2023-05-24 00:00:00',
        updatedAt: '2023-05-24 00:00:00'
      }
    } else {
      rowObj = {
        id: i,
        larea_id: i-20,
        device_type_id: 2,
        user_mod: 1,
        is_deleted: false,
        createdAt: '2023-05-24 00:00:00',
        updatedAt: '2023-05-24 00:00:00'
      }
    }
    return rowObj;
    });

  const { wareas } = props;
  
  const {data} = {
    'colums':[{field:'id'}, {field:'name'}],
    'rows':[{id: 0, name: 'Felipe'}],
    'initialState':{}
  }

  useEffect(() =>{
    console.log(bulkInsert);
  },[])

  return (
    <DataGrid 
      columns = {[{field:'name'}, {field:'age'}]} 
      rows={[{id: 1, name: 'NN', age: 20}]} 
      slots={{toolbar: GridTollbar}} 
    />
  )
}

export default TableLocals;