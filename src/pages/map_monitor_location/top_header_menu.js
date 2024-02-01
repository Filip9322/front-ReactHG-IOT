// ** React Imports
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Redux
import { useDispatch, useSelector } from 'react-redux';
import { rootActions } from 'src/@core/redux/reducer';

// ** MUI Components
import { Box, Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';

// ** Icons Imports
import Monitor from 'mdi-material-ui/Monitor'
import ReceiptTextClockOutline from 'mdi-material-ui/ReceiptTextClockOutline'
import Cog from 'mdi-material-ui/Cog'

//** SVG Imports */
import IconReport from 'public/images/misc/icon_report.svg'
import IconManage from 'public/images/misc/icon_manage.svg'

const ControllerMonitorTopMenu = props => {

  const {hidden, toggleNavVisibility} = props;

  // ** Hook
  const responsiveMenu = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // ** Redux Test
  const { id, la_name, logo } = useSelector(state => state.currentLA);
  const { count } = useSelector(state => state.counter);
  const dispatch  = useDispatch();

  const clickLogoLocalArea = event => {
    event.preventDefault();
    dispatch(rootActions.increment());
  }
  	 

  return(
    <Box 
      sx={{
        width: '100%'
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          '& .MuiCard-root':{
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
        <Card>
          <IconButton
            edge='end'
            title='모니토링'
            arial-label='모니토링'
          >
            <Monitor sx={{fontSize: '3.5rem'}} />
          </IconButton>
          <Typography sx={{ textAlign: 'center'}}>
            모니토링 { count }
          </Typography>
        </Card>
        <Card sx={{display:'flex', alignItems:'center',':hover':{cursor: 'pointer'}}}>
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
        </Card>
        <Card>
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
        </Card>
        <Card>
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
        </Card>
        <Card>
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
        </Card>
      </Grid>
    </Box>
  );
}

export default ControllerMonitorTopMenu;