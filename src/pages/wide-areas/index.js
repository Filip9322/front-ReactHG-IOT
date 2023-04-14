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

//** Icons Imports */
import VoiceTrafficLight from 'public/images/misc/hangil-signal-border.svg'
import VoiceTrafficLight_1 from 'public/images/misc/hangil-signal.svg'


//** Utils  */
import { getWithExpiry } from "src/@core/layouts/utils"
import { isExpired, decodeToken } from "react-jwt"


const WideAreasPage = () => {
    // ** Check Authenticity of access token and user_Id
    const [access_token, user_id, userAuthenticated] = useState([]);
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

  return (
    <Box className='content-center'>
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <Card>
                    <CardContent sx={{ minWidth: 275, display: 'flex', justifyContent: 'space-between' }} >
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', flex: 20 }}>
                            <CardMedia
                                component='img'
                                sx={{ width: 100 }}
                                image='/images/wide-areas/1-서울특별시.png'
                                alt='image test'
                            />
                            <Typography sx={{ fontSize: 16 }} variant='h5' color="text.secondary" gutterBottom>
                                서울
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 80}}>
                            <Box sx={{ display: 'flex',  justifyContent: 'space-between'}}>
                                <Typography sx={{ fontSize: 14 }} variant='h7' >서울특별시</Typography>
                                <Typography sx={{ fontSize: 14 }} variant='h7' >특별시</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Box sx={{ display: 'flex', flex: '70'}}>
                                    <Box sx={{ position: 'relative'}}>    
                                        <VoiceTrafficLight height={50} width={50} color="red"/>
                                    </Box>
                                    음성유도기: 1200 / 900 / 200 / 100
                                    음향신호기: 1200 / 900 / 200 / 100
                                </Box>
                                <Box sx={{ display: 'flex', flex: '30', flexDirection: 'column'}}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                        <Typography sx={{ fontSize: 30 }}>#</Typography>
                                        <Typography sx={{ fontSize: 14 }}>local_areas</Typography>
                                    </Box>
                                    <Box>
                                        <CardActions>
                                            <Button variant="outlined" sx={{ fontSize: 14 }}>자세히</Button>
                                        </CardActions>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            123
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button>Tell</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            123
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button>Tell</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            123
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button>Tell</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </Box>
  );
}

export default WideAreasPage;