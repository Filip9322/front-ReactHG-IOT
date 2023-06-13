// ** React Imports
import { useState, useEffect } from "react";

// ** Import Icons
import FormatListChecks  from 'mdi-material-ui/FormatListChecks'
import AccountSupervisor from 'mdi-material-ui/AccountSupervisor'
import MapMarkerMinusOutline  from 'mdi-material-ui/MapMarkerMinusOutline'
import MapMarkerRadiusOutline from 'mdi-material-ui/MapMarkerRadiusOutline'

// ** Material UI Import
import { DataGrid, GridRow, GridColumnHeaders, GridTollbar } from '@mui/x-data-grid'
import { object } from "prop-types";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";


//import { DataGrid, GridPreProcessEditCellProps, GridColumnHeaders } from '@mui/x-data-grid'

const TableLocals = props => {

  const { lareas, wareaID , clickActionButton} = props;
  const [ rows, updateRows ] = useState([]);

  const localRowsUpdate = () => {
    let lrows = []
    lareas.map(larea => {
      let localRow = {}
      Object.assign(localRow, {id: larea.id});
      Object.assign(localRow, {name: larea.local_name});
      Object.assign(localRow, {type: larea.local_type});
      Object.assign(localRow, {iot: larea.is_IOT});
      Object.assign(localRow, {equipment: larea.id});
      Object.assign(localRow, {rol_users: larea.id});
      Object.assign(localRow, {settings:  larea.id});
      Object.assign(localRow, {delete: larea.id});

      Object.assign(localRow, {state: larea.local_state});
      Object.assign(localRow, {address: larea.local_address});
      lrows.push(localRow);
    })
    console.log('length: '+ lrows.length)
    updateRows(lrows);
  }
  
  const data = {
    'columns':[
      {field:'id',   headerName: '#'},
      {field:'name', headerName: 'Name', minWidth: 200},
      {field:'type', headerName: 'type'},
      {field:'iot',  headerName: 'IOT',
       renderCell: params => (
        params.value ?
        <Typography sx={{ color: 'red'}}>
          IOT
        </Typography>
        : ''
       )
      },
      {field:'equipment',    headerName:'구역 기기 종류',
       renderCell: params => (
        <IconButton
          edge='end'
          title='전체 구역'
          arial-label='button list equipment subcriptions'
          data-action='list-subs'
          onClick={clickActionButton}
          onMouseDown={clickActionButton}
          data-larea={params.value}
        >
          <FormatListChecks />
        </IconButton>
        )
      },
      {field:'rol_users',    headerName:'역할 및 사용자',
       renderCell: params => (
        <IconButton
          edge='end'
          title='user with access'
          arial-label='list users with Access'
          data-action='list-users'
          onClick={clickActionButton}
          onMouseDown={clickActionButton}
          data-larea={params.value}
        >
          <AccountSupervisor />
        </IconButton>
       )
      },
      {field:'settings',     headerName:'설정',
       renderCell: params => (
        <IconButton
          edge='end'
          title='settings'
          aria-label='open settings'
          onClick={clickActionButton}
          onMouseDown={clickActionButton}
          data-action='settings'
          data-larea={params.value}
        >
          <MapMarkerRadiusOutline />
        </IconButton>
       )
      },
      {field:'delete',       headerName:'삭제',
       renderCell: params => (
        <IconButton
          edge='end'
          title='전체 구역'
          arial-label='delete Local Area'
          data-action='Inactive-Warea'
          onClick={clickActionButton}
          onMouseDown={clickActionButton}
          data-warea={params.value}
        >
          <MapMarkerMinusOutline />
        </IconButton>
       )
      }
    ],
    'rows': rows,
    'initialState':{
      'columns': {
        'columnVisibilityModel':{
          id: true,
          name: true,
          type: true,
          iot: true,
          equipment: true,
          rol_users: true,
          settings: true,
          delete: true
        }
      }
    }
  }

  useEffect(() =>{
    //console.log(Object.keys(lareas[0]));
    localRowsUpdate();
  },[lareas])

  return (
    <DataGrid 
      {...data} 
      slots={{toolbar: GridTollbar}} 
    />
  )
}

export default TableLocals;