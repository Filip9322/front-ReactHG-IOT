// ** React Imports
import { useState, useEffect } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Typography } from '@mui/material'



const TrafficLightRegistration = () => {
  // ** Hooks
  const router = useRouter();
   // ** Redux
	const dispatch  = useDispatch();

  useEffect(() => {
    // ** Set Page Name and MetaData
    dispatch(rootActions.updateTitle("신호등 구역등록"));
  },[]);

  return(
    <Typography>
      {router.query.local_area} +  {router.query.device_type}   
      신호등 구역등록
    </Typography>
  );
}

export default TrafficLightRegistration;