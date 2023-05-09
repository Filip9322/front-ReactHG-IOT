// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import MapMarkerRadiusOutline from 'mdi-material-ui/MapMarkerRadiusOutline'
import MapMarkerMultipleOutline from 'mdi-material-ui/MapMarkerMultipleOutline'
import MapMarkerMinusOutline from 'mdi-material-ui/MapMarkerMinusOutline'

const WAreasPage = () => {
    return (
      <Box classname="content-center">
        <Grid item xs={12} sm={9}>
          <Card>
            <CardHeader title='구역'>
            </CardHeader>
            <TableContainer component={ Paper }>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>Logo</TableCell>
                    <TableCell>#</TableCell>
                    <TableCell>구역</TableCell>
                    <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>type</TableCell>
                    <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>Total Areas</TableCell>
                    <TableCell sx={{display:'flex', justifyContent:'space-around'}}
                    ><span>설정</span> / <span>제공</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell sx={{display:{xs:'none',sm:'table-cell', position:'relative'}}}>
                    <Box 
                    sx={{
                      minWidth: 38, display:'flex', justifyContent: 'center', 
                      position: 'absolute', borderRadius:'50%', top:'10px',
                      flexShrink: 0, overflow:'hidden', userSelect:'none', width:'65px', height:'52px'
                    }}>
                      <img src='/images/wide-areas/1-서울특별시.png' alt='image' width='100%' height='100%'  
                        sx={{objectFit:'cover', textAlign:'center', color:'transparent', textIndent:'10000px'}}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>서울</TableCell>
                  <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>특별시</TableCell>
                  <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>
                    <Link sx={{':hover':{cursor: 'pointer'}}}>12: Areas</Link>
                  </TableCell>
                  <TableCell sx={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                    <IconButton
                      edge='end'
                      title='전체 구역'
                      arial-label='button list all local areas'
                      data-action='list-lareas'
                      data-user='1'
                    >
                      <MapMarkerMultipleOutline />
                    </IconButton>
                    <IconButton
                      edge='end'
                      title='전체 구역'
                      arial-label='button list all local areas'
                      data-action='list-lareas'
                      data-user='1'
                    >
                      <MapMarkerRadiusOutline />
                    </IconButton>
                    <IconButton
                      edge='end'
                      title='전체 구역'
                      arial-label='button list all local areas'
                      data-action='list-lareas'
                      data-user='1'
                    >
                      <MapMarkerMinusOutline />
                    </IconButton>
                  </TableCell>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Box>
    );
}

export default WAreasPage;