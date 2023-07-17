// ** React Imports
import { useState, useEffect }  from 'react';

// **  Material Components Imports
import { Box, Typography,
    Drawer
  } from '@mui/material';



const CountingBar = props => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0, right: 0,
        zIndex: 2,
        backgroundColor:'white',
        border: 'solid 1px #aaa',
        borderRadius: '20px',
        textAlign: 'center',
        width: 'fit-content',
        padding : '0 20px',
        display: 'flex',
        flexDirection: 'row',
        '& .tyCounter': {
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Nanum Gothic, dotum, Verdana',
          cursor: 'pointer',
          lineHeight: '50px',
          margin: '0 5px',
          borderWidth: '0px 0px 1px 0px'
        },
        '& #totalCount':{
          color: '#666',
          borderBottom: 'solid 1px #666'
        },
        '& #normalCount':{
          color: 'green',
          borderBottom: 'solid 1px green'
        },
        '& #abnormalCount':{
          color: 'red',
          borderBottom: 'solid 1px red'
        },
        '& #schoolCount':{
          color: 'orange',
          borderBottom: 'solid 1px orange'
        },
        '& #uninstallCount':{
          color: '#777',
          borderBottom: 'solid 1px #777'
        }
      }}
    >
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="totalCount"
        gutterBottom
      >전체지점: 259</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="normalCount"
        gutterBottom
      >정상: 250</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="abnormalCount"
        gutterBottom
      >이상: 9</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="schoolCount"
        gutterBottom
      >스쿨존: 10</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="uninstallCount"
        gutterBottom
      >미설치: 2</Typography>
    </Box>
  );
}
  
export {
  CountingBar
};