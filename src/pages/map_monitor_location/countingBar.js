// ** React Imports
import { useState, useEffect }  from 'react';

// **  Material Components Imports
import { Box, Typography } from '@mui/material';



const CountingBar = props => {

  const [normal, setNormal]      = useState(0);
  const [abnormal, setAbnormal]  = useState(0);
  const [school, setSchool]      = useState(0);
  const [unistall, setUninstall] = useState(0);

  const { controllers, filterMapType } = props;

  const onClickFilter = event => {
    let typo = event.currentTarget;
    let type = typo.getAttribute('data-type');

    filterMapType(type);
  }

  useEffect(() => {
    //console.log(controllers.length)
    countByType(controllers)
  },[props])

  const countByType = controllers => {
    let filter_1 = controllers.filter(controller => 
      controller.is_installed && controller.is_active && !controller.has_abnormalities );
    setNormal(filter_1.length);

    let filter_2 = controllers.filter(controller => 
      controller.is_installed && controller.is_active && controller.has_abnormalities );
    setAbnormal(filter_2.length);

    let filter_3 = controllers.filter(controller => 
      controller.is_installed && controller.is_active && controller.is_school_zone );
    setSchool(filter_3.length);

    let filter_4 = controllers.filter(controller => 
      !controller.is_installed || !controller.is_active );
    setUninstall(filter_4.length);
  }

  return (
    <Box
      sx={{
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
        data-type= {0}
        onClick={onClickFilter}
      >전체지점: {controllers.length}</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="normalCount"
        gutterBottom
        data-type= {1}
        onClick={onClickFilter}
      >정상: { normal }</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="abnormalCount"
        gutterBottom
        data-type= {2}
        onClick={onClickFilter}
      >이상: { abnormal }</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="schoolCount"
        gutterBottom
        data-type= {3}
        onClick={onClickFilter}
      >스쿨존: { school }</Typography>
      <Typography 
        variant="overline"
        display="block"
        className='tyCounter'
        id="uninstallCount"
        gutterBottom
        data-type= {6}
        onClick={onClickFilter}
      >미설치: { unistall }</Typography>
    </Box>
  );
}
  
export {
  CountingBar
};