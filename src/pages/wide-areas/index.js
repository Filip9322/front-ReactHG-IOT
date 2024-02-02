// ** React Imports
import { useState, useRef, useEffect } from 'react';

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components
import TableWideAreas from 'src/pages/wide-areas/table'

// ** Helpers
import { getFetchURL } from 'src/@core/utils/fetchHelper'
import { getWithExpiry } from 'src/@core/layouts/utils';
import { decodeToken } from 'react-jwt';

const WAreasPage = () => {
  // ** User Authentication
  const [user_id, setUser_id] = useState([]);
  const [access_token, setAccess_token] = useState([]);
  const [userAuthenticated, setUserAuthenticated] = useState([]);

  // ** API Responses
  const [wideAreaList, updateWideAreasList] = useState([]);
  const [localAreaList, updateLocalAreaList] = useState([]);
  const [isAdmin, updateIsAdmin] = useState(false);

  // ** UseRef
  const hasPageBeenRendered = useRef({ effect1: false, effect2: false, effect3: false });

  // ** Fetch API
  async function fetchWide_Areas(){
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/api/wide_areas`,
      {user_ID: user_id, access_token: access_token}
    ).then((response) => {
      updateWideAreasList(response);
    }).catch((error) => console.error('error: ' + error));
  }

  async function fetchLocal_Areas(){
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/api/local_areas`,
      {user_ID: user_id, access_token: access_token}
    ).then((response) => {
      updateLocalAreaList(response);
    }).catch((error) => console.error('error: ' + error));
  }

  async function fetchGetUserRoles(){
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/login/${user_id}`,
      {user_ID: user_id, access_token: access_token}
    ).then((response) => {
      updateIsAdmin(response);
    }).catch(error => console.error('error: ' + error));
  }

  // ** Groups locals by wide A
  const groupLocals = (wareas) => {
    wareas.map(warea => {
      let localAreas = [];
      localAreaList.map(larea => {
        if(larea.wide_area_id == warea.id){
          localAreas.push(larea);
        }
      })
      Object.assign(warea,{locals: localAreas})
    })
    return wareas;
  }

  // ** Initial Load -> Authenticate
  // TODO! ONLY admins should be able to get here
  useEffect(() => {
    let token = localStorage.getItem('accessToken');

    setAccess_token(token);
    setUser_id(getWithExpiry('user_ID'));
  },[]);

  // ** Verifying Credentials
  useEffect(()=>{
    if(hasPageBeenRendered.current['effect1']) {
      const myDecodeToken = decodeToken(access_token);

      if( myDecodeToken.user_ID == user_id ){
        setUserAuthenticated(true);
      } else {
        setUserAuthenticated(false);
      }
    }
    
    hasPageBeenRendered.current['effect1'] = true;
  }, [access_token])

  // ** User Authentication
  useEffect(() => {
    if(hasPageBeenRendered.current['effect2']) {
      if(userAuthenticated){
        //fetchWide_AreasUser();
        fetchGetUserRoles(user_id);
  
        if(user_id === 'admin'){
          fetchWide_Areas();
          fetchLocal_Areas();
        }
      }else console.error('Authentication Error')
    }

    hasPageBeenRendered.current['effect2'] = true;
  },[userAuthenticated])

  // ** Group locals in wide area
  useEffect(() => {
    if(hasPageBeenRendered.current['effect3']) {
      updateWideAreasList(groupLocals(wideAreaList));
    }

    hasPageBeenRendered.current['effect3'] = true;
  },[localAreaList])

  let tempInput = '서울';
  var seoul = tempInput.match(/[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]/g)
    return (
      <Box className="content-center">
        <Grid item xs={12} sm={9}>
          <Card>
            <CardHeader title='구역'>
            </CardHeader>
            <CardContent>
              <TableWideAreas wareas={wideAreaList} lareas={localAreaList} isAdmin={isAdmin}/>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    );
}

export default WAreasPage;