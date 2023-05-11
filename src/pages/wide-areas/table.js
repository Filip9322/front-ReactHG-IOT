// ** Reactr Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import MapMarkerRadiusOutline from 'mdi-material-ui/MapMarkerRadiusOutline'
import MapMarkerMultipleOutline from 'mdi-material-ui/MapMarkerMultipleOutline'
import MapMarkerMinusOutline from 'mdi-material-ui/MapMarkerMinusOutline'

const TableWideAreas =  props => {

  // ** Props *
  const {wareas, lareas} = props;

  return(
  <TableContainer component={ Paper }>
    <Table  aria-label='List all Provincies'>
      <TableHead>
        <TableRow>
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>로고</TableCell>
          <TableCell>#</TableCell>
          <TableCell>구역</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>종료</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>Total Areas</TableCell>
          <TableCell sx={{display:'flex', justifyContent:'space-around'}}
          ><span>설정</span> / <span>제공</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {/* Listing all Wide Areas ---------- */}
      {wareas.map((row,listID) =>  (
        <TableRow key={listID}>
          <TableCell sx={{display:{xs:'none',sm:'table-cell', position:'relative'}}}>
            <Box 
            sx={{
              minWidth: 38, display:'flex', justifyContent: 'center', 
              position: 'absolute', borderRadius:'50%', top:'10px',
              flexShrink: 0, overflow:'hidden', userSelect:'none', width:'65px', height:'52px'
            }}>
              <img src={`${row.wa_logo.replace('_','-')}`} alt={row.wa_name} width='100%' height='100%'  
                sx={{objectFit:'cover', textAlign:'center', color:'transparent', textIndent:'10000px'}}
              />
            </Box>
          </TableCell>
          <TableCell>{listID+1}</TableCell>
          <TableCell>{row.wa_name}</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>{row.country_wa_term}</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>
            <Link sx={{':hover':{cursor: 'pointer'}}}>{lareas.length}: Areas</Link>
          </TableCell>
          <TableCell sx={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
            <IconButton
              edge='end'
              title='전체 구역'
              arial-label='button list all local areas'
              data-action='list-lareas'
              data-warea={row.id}
            >
              <MapMarkerMultipleOutline />
            </IconButton>
            <IconButton
              edge='end'
              title='전체 구역'
              arial-label='button list all local areas'
              data-action='list-lareas'
              data-warea={row.id}
            >
              <MapMarkerRadiusOutline />
            </IconButton>
            <IconButton
              edge='end'
              title='전체 구역'
              arial-label='button list all local areas'
              data-action='list-lareas'
              data-warea={row.id}
            >
              <MapMarkerMinusOutline />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default TableWideAreas;