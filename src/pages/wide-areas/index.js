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
    const [access_token, user_id, userAuthenticated] = useState([]);
    const initialWideArea = [];
    const [wideAreasList, updateWideAreasList] = useState(initialWideArea);

    // ** Capture ewvent Click Wide Area
    const clickWideArea = event => {
        event.preventDefault();
        console.log('hola '+ event.currentTarget.getAttribute('data-warea'))
    }
    

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
        }
    }, [userAuthenticated]);


  return (
    <Box className='content-center'>
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6} >
                <Card>
                    <Box sx={{width: '500px'}}>
                        <KoreaMapComponent color1={lightGreen['200']} color2={lightGreen['200']} Hcolor={lightGreen['200']}/>
                    </Box>
                </Card>
            </Grid>


            {wideAreasList.map((row, listID) => (
            <Grid item xs={6} key = {listID}>
                <Card>
                    <CardContent sx={{ minWidth: 275, display: 'flex' }} >
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', flex: 20, cursor: 'pointer' }}>
                            <CardMedia
                                onClick={clickWideArea}
                                data-warea = {row.id}
                                component='img'
                                sx={{ width: 100 }}
                                image= {`${row.wa_logo}`}
                                alt='image test'
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
                                variant='h6' gutterBottom>
                                <Link href='#' onClick={clickWideArea} data-warea = {row.id}>
                                    {row.wa_name}
                                </Link>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 80}}>
                            <Box sx={{ display: 'flex',  justifyContent: 'space-between'}}>
                                <Typography sx={{ fontSize: 14 }} variant='h7' >{row.wa_long_name}</Typography>
                                <Typography sx={{ fontSize: 14 }} variant='h7' >{row.country_wa_term}</Typography>
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
                                                data-warea = {row.id}
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
             ))}
        </Grid>
    </Box>
  );
}

export default WideAreasPage;