//** React Imports */
import { useState,  useEffect } from "react";

//** Next Imports */
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

//** MUI Components */
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from "@mui/material/Button"
import CardMedia from '@mui/material/CardMedia'
import Typography from "@mui/material/Typography"
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

//** SVG Imports */
import VoiceTrafficLight from 'public/images/misc/hangil-signal-border.svg'
import VoiceTrafficLight_1 from 'public/images/misc/hangil-signal.svg'
import VoiceGuidance from 'public/images/misc/hangil-voice-guidance.svg'

//** Utils  */
import { getWithExpiry } from "src/@core/layouts/utils"
import { decodeToken } from "react-jwt"

// ** Custom Components Imports
import KoreaMapComponent from 'src/@core/components/maps/korea_division'

//** Styles */
import { lightGreen, red } from '@mui/material/colors';



const WideAreasPage = () => {

    // ** Check Authenticity of access token and user_Id
    const initialWideArea = [{id:1, wa_name: 'test', wa_logo: ''}];
    const initialMapSelected = {id: 1, wa_name: '서울'};
    const [searchMatchArea, updateSearchMatchArea] = useState({});
    const [showCardWidearea, setShowCardWidearea] = useState(false)
    const [access_token, user_id, userAuthenticated] = useState([]);
    const [wideAreasList, updateWideAreasList] = useState(initialWideArea);
    const [mapSelectedArea, updateMapSelectedArea] = useState(initialMapSelected);

    // ** Capture ewvent Click Wide Area
    const clickWideArea = event => {
        event.preventDefault();
        let warea = event.currentTarget;
        let id = warea.getAttribute('data-warea');
        let title = warea.getAttribute('data-title');
        console.log(title+' '+id)
        
        updateMapSelectedArea({id: parseInt(id), name: title});
    }

    const clickMapWideArea = (area_name, area_id) => {
        updateMapSelectedArea({id: parseInt(area_id), name: area_name});
    };

    // ** Fetch API
    async function fetchWide_Areas(){
        getFetchWide_Areas(
             `${process.env.REACT_APP_APIURL}/api/wide_areas`,
             {user_ID: user_id, access_token: access_token}
        ).then ((response) => {
            updateWideAreasList(response);
        }).catch((error) => {
            console.error('error: '+error);
        });
    }

    async function getFetchWide_Areas ( url = '', data = {}){
        const response = await fetch( url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'user_id': data.user_ID,
                'access_token': data.access_token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })

        return response.json();
    }
    


    useEffect(() => {
        access_token = localStorage.getItem('accessToken');
        user_id = getWithExpiry('user_ID');
        
        const myDecodeToken = decodeToken(access_token);
        if(myDecodeToken.user_ID == user_id){
            userAuthenticated = true;
        }else{
            userAuthenticated = false;
        }
    },[]);


    // ** IF Authenticated in order trigger Fetch
    useEffect(() => {
        if(userAuthenticated){
            fetchWide_Areas();
        }else {console.error('Error Authentication')}
    }, [userAuthenticated]);

    // ** Updated base on Area selected in the map
    useEffect(() => {
        console.log('Area: '+typeof(mapSelectedArea.id)+' '+mapSelectedArea.name);

        let searchArea = wideAreasList.find(warea => warea.id === mapSelectedArea.id);
        if(searchArea) {console.log('update'); updateSearchMatchArea(searchArea);}
    },[mapSelectedArea])
    
    useEffect(() => {
        if(searchMatchArea.wa_logo) {console.log(searchMatchArea); setShowCardWidearea(true)}
    },[searchMatchArea])

  return (
    <Box className='content-center'>
        <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 1, md: 1}}>
            <Grid item xs={6}>
                <Grid item xs={12} >
                    <Card>
                        <Box sx={{width: '500px'}}>
                            <KoreaMapComponent chooseArea={clickMapWideArea} color1='#a09f9f' color2='#434343' Hcolor={lightGreen['800']}/>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={6}  >         
                { showCardWidearea === true  ? (
                <Grid item xs={12} key = {searchMatchArea.id}>
                    <Card >
                        <CardContent sx={{ minWidth: 275, display: 'flex' }} >
                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', flex: 20, cursor: 'pointer' }}>
                                <CardMedia
                                    onClick={clickWideArea}
                                    data-warea = {searchMatchArea.id}
                                    component='img'
                                    sx={{ width: 100 }}
                                    image= {`${searchMatchArea.wa_logo}`}
                                    alt={`${searchMatchArea.wa_name} logo`}
                                />
                                <Typography sx={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    ':hover':{
                                        textDecoration: 'underline'
                                    },
                                    '& a':{
                                        color: 'primary',
                                        textDecoration: 'none'
                                    }
                                }}
                                    variant='h6' gutterBottom
                                >
                                    <Link href='#' onClick={clickWideArea} data-warea = {searchMatchArea.id}>
                                        {searchMatchArea.wa_name}
                                    </Link>
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 80}}>
                                <Box sx={{ display: 'flex',  justifyContent: 'space-between'}}>
                                    <Typography sx={{ fontSize: 14 }} variant='h7' >{searchMatchArea.wa_long_name}</Typography>
                                    <Typography sx={{ fontSize: 14 }} variant='h7' >{searchMatchArea.country_wa_term}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: '70'}}>
                                        <Box sx={{ position: 'relative'}}>
                                            <VoiceTrafficLight height={50} width={50} color={lightGreen['800']} arial-label="음향신호기"/>
                                            : 1200 / 900 / 200 / 100
                                        </Box>
                                        <Box sx={{ position: 'relative'}}>
                                            <VoiceGuidance     height={50} width={50} color={lightGreen['800']} arial-label="음성유도기"/>
                                            : 1200 / 900 / 200 / 100
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flex: '30', flexDirection: 'column', justifyContent: 'space-between'} }>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                            <Typography sx={{ fontSize: 24 }}>17시/구</Typography>
                                        </Box>
                                        <Box>
                                            <CardActions>
                                                <Button 
                                                    variant="outlined" 
                                                    onClick={clickWideArea}
                                                    data-warea = {searchMatchArea.id}
                                                    sx={{ fontSize: 14 }}
                                                >자세히</Button>
                                            </CardActions>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                ) : (<span />)}
                <Grid container columns={12} spacing={1}>
                {
                wideAreasList.map((row, listID) => {
                return(
                    <Grid item xs={2} key={listID}>
                        <Card 
                          onClick={clickWideArea}
                          data-warea = {row.id}
                          data-title = {row.wa_name}
                          sx={{"&:hover":{ backgroundColor: '#96d3e433', color: 'blue', cursor: 'pointer' }}}
                        >
                            <CardContent sx={{ minWidth: 50, display: 'flex', flexDirection:'column'}} >
                                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', flex: 20 }}>
                                    <CardMedia
                                        component='img'
                                        sx={{ width: 100 }}
                                        image= {`${row.wa_logo}`}
                                        alt={`${row.wa_name} logo`}
                                    />
                                </Box>
                                <Typography sx={{textAlign:'center'}}>
                                {row.wa_name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );})
                }
                </Grid>
            </Grid>
        </Grid>
    </Box>
  );
}

export default WideAreasPage;
