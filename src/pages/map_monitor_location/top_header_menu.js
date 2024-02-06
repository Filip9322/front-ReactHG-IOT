// ** React Imports
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Next Import
import { useRouter } from 'next/router'

// ** Redux
import { useDispatch, useSelector } from 'react-redux';
import { rootActions } from 'src/@core/redux/reducer';

// ** MUI Components
import { Box, Button, Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';

// ** Icons Imports
import Monitor from 'mdi-material-ui/Monitor'
import ReceiptTextClockOutline from 'mdi-material-ui/ReceiptTextClockOutline'
import Cog from 'mdi-material-ui/Cog'

//** SVG Imports */
import IconReport from 'public/images/misc/icon_report.svg'
import IconManage from 'public/images/misc/icon_manage.svg'

const ControllerMonitorTopMenu = props => {

  const {hidden, toggleNavVisibility} = props;
  const [hiddeTopMenu, setHiddeTopMenu] = useState(true);

  // ** Hook
  const responsiveMenu = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // ** Redux Test
  const { id, la_name, logo } = useSelector(state => state.currentLA);
  const { count } = useSelector(state => state.counter);
  const dispatch  = useDispatch();

  // ** Hooks
  const router = useRouter();
  const basePath = `/map_monitor_location/${router.query.local_area}/${router.query.device_type}/`;

  const clickLogoLocalArea = event => {
    event.preventDefault();
    dispatch(rootActions.increment());
  }

  const clickMenuIcon = event => {
    //event.preventDefault();

    let button = event.currentTarget;
    let href = button.getAttribute('data-href');

    console.log(href);
  }

  useEffect(() => {
    if(basePath.includes('map_monitor_location')){
      setHiddeTopMenu(false)
    } else setHiddeTopMenu(true)
  },[])

  return(
    !hiddeTopMenu ? (
    <Box 
      sx={{
        width: '100%',
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          '& .MuiButton-root':{
            minWidth: 130,
            maxWidth: 220,
            display: 'flex',
            ...(responsiveMenu ? {}:{flexDirection: 'column'}),
            paddingBottom:5,
            alignItems: 'center',
            padding: '20px 40px',
            ':hover':{backgroundColor: '#96d3e433', color: 'blue', cursor: 'pointer'}
          },
          '& .MuiIconButton-root':{
            color:'#686868'
          },
          ...(!responsiveMenu ? {}:{flexDirection: 'column'})
        }}
      >
        {hidden ? (
          <Card
            onClick={ clickLogoLocalArea }
            className={'logo-header-card'}
            data-larea={ id }
            data-title={ la_name }
            sx={{ width: 'fit-content', height: 'auto' }}
          >
            <CardContent
              sx={{ minWidth: 50, display: 'flex', flexDirection: 'column', padding: 0 }}
            >
              <CardMedia
                component={'picture'}
                sx={{display: 'flex', alignItems: 'center'}}
                alt={`logo`}
              >
                <source
                  srcSet={`${logo} 300w, 
                          ${logo} 768w, 
                          ${logo} 1280w`}
                  sizes={'(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px'}
                />
                <img src={`${logo}`}/>
              </CardMedia>
              <Typography>
                { la_name }
              </Typography>
            </CardContent>
          </Card>
        ): null }
        <Button
          href={`${ basePath }`}
          data-href={`${ basePath }`}
          onClick={ clickMenuIcon }
        >
          <IconButton
            edge='end'
            title='모니토링'
            arial-label='모니토링'
          >
            <Monitor sx={{fontSize: '3.5rem'}} />
          </IconButton>
          <Typography sx={{ textAlign: 'center'}}>
             모니토링
          </Typography>
        </Button>
        <Button 
          sx={{display:'flex', alignItems:'center',':hover':{cursor: 'pointer'}}}
          href={`${ basePath }management`}
          data-href={`${ basePath }management`}
          onClick={ clickMenuIcon }
         >
          <IconButton
            edge='end'
            title='시설관리'
            arial-label='시설관리'
          >
            <IconManage height={56} max-width={100} color={'#686868'} arial-label="시설관리"/>
          </IconButton>
          <Typography sx={{ textAlign: 'center'}}>
            시설관리
          </Typography>
        </Button>
        <Button
          href={`${ basePath }history`}
          data-href={`${ basePath }history`}
          onClick={ clickMenuIcon }
        >
          <IconButton
            edge='end'
            title='이력관리'
            arial-label='이력관리'
          >
            <ReceiptTextClockOutline sx={{fontSize: '3.5rem'}} />
          </IconButton>
          <Typography sx={{ textAlign: 'center'}}>
            이력관리
          </Typography>
        </Button>
        <Button
          href={`${ basePath }report`}
          data-href={`${ basePath }report`}
          onClick={ clickMenuIcon }
        >
          <IconButton
            edge='end'
            title='보고서출력'
            arial-label='보고서출력'
          >
            <IconReport height={56} max-width={100} color={'#686868'} arial-label="보고서출력"/>
          </IconButton>
          <Typography sx={{ textAlign: 'center'}}>
            보고서출력
          </Typography>
        </Button>
        <Button
          href={`${ basePath }preferences`}
          data-href={`${ basePath }preferences`}
          onClick={ clickMenuIcon }
        >
          <IconButton
            edge='end'
            title='환경설정'
            arial-label='환경설정'
          >
            <Cog sx={{fontSize: '3.5rem'}} />
          </IconButton>
          <Typography sx={{ textAlign: 'center'}}>
            환경설정
          </Typography>
        </Button>
      </Grid>
    </Box>
  ): ''
  );
}

export default ControllerMonitorTopMenu;