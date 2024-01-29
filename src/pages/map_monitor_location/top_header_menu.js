// ** React Imports
import { useState, useEffect } from 'react';

// ** Redux
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount, rootActions } from 'src/@core/redux/reducer'

import { Box, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ControllerMonitorTopMenu = props => {

  const {} = props;

  // dull variables
  //const id = 1;
  //const la_name = 'test';
  //const logo = '/images/wide-areas/1-서울특별시.png';
  const clickLogoLocalArea = event => {
    event.preventDefault();
    dispatch(rootActions.increment());
  }
  	 
  // ** Redux Test
  const { id, la_name, logo } = useSelector(state => state.currentLA);
	const { count } = useSelector(state => state.counter);
	const dispatch  = useDispatch();

  return(
    <Box>
      <Grid>
        <Card
          onClick={ clickLogoLocalArea }
          className={'logo-header-card'}
          data-larea={ id }
          data-title={ la_name }
          sx={{ width: 'fit-content', height: 'auto', 
            "&:hover": { backgroundColor: '#96d3e433', color: 'blue', cursor: 'pointer'}
          }}
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
                srcSet={`${logo.replace('_','-')} 300w, ${logo.replace('_','-')} 768w, ${logo.replace('_','-')} 1280w`}
                sizes={'(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px'}
              />
              <img src={`${logo}`}/>
            </CardMedia>
            <Typography>
              {logo.name}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <Typography sx={{ textAlign: 'center'}}>  
            신호등 모니토링 { count }
          </Typography>
        </Card>
        <Card>
          <Typography sx={{ textAlign: 'center'}}>
            시설관리
          </Typography>
        </Card>
        <Card>
          <Typography sx={{ textAlign: 'center'}}>
            이력관리
          </Typography>
        </Card>
        <Card>
          <Typography sx={{ textAlign: 'center'}}>
            보고서출력
          </Typography>
        </Card>
        <Card>
          <Typography sx={{ textAlign: 'center'}}>
            환경설정
          </Typography>
        </Card>
      </Grid>
    </Box>
  );
}

export default ControllerMonitorTopMenu;