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

// ** Helpers
import { getFetchURL } from 'src/@core/utils/fetchHelper'
import { getWithExpiry } from 'src/@core/layouts/utils';
import { decodeToken } from 'react-jwt';

const WAreasPage = () => {
  // ** User Authentication
  const [access_token, user_id, userAuthenticated] = useState([])

  // ** API Responses
  const [wideAreaList, updateWideAreasList] = useState([]);

  // ** Fetch API
  async function fetchWide_Areas(){
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/api/wide_areas`,
      {userID: user_id, access_token: access_token}
    ).then((response) => {
      updateWideAreasList(response);
      console.log(response.length);
    }).catch((error) => console.error('error: ' + error));
  }

  // ** Initial Load -> Authenticate
  // TODO! ONLY admin should be able to get here
  useEffect(() => {
    access_token = localStorage.getItem('accessToken');
    user_id = getWithExpiry('user_ID');

    const myDecodeToken = decodeToken(access_token);
    if(myDecodeToken.user_ID == user_id){
      userAuthenticated = true;
    } else userAuthenticated = false;
  },[]);

  // ** User Authentication
  useEffect(() => {
    if(userAuthenticated){
      fetchWide_Areas();
    }else console.error('Authentication Error')
  },[userAuthenticated])

  let tempInput = '서울';
  var seoul = tempInput.match(/[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]/g)
    return (
      <Box className="content-center">
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
                {/* Listing all Wide Areas ---------- */}
                {wideAreaList.map((row,listID) =>  (
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
                      <Link sx={{':hover':{cursor: 'pointer'}}}>12: Areas</Link>
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
          </Card>
        </Grid>
      </Box>
    );
}

export default WAreasPage;