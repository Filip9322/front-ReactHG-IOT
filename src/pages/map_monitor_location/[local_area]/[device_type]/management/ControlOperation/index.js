// ** React Imports
import { useState, useEffect } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Typography } from '@mui/material'



const ControlOperation = () => {
  // ** Hooks
  const router = useRouter();
  // ** Redux
	const dispatch  = useDispatch();

  useEffect(() => {
    // ** Set Page Name and MetaData
    dispatch(rootActions.updateTitle("운영제어"));
  },[]);

  return(
    <Typography>
      {router.query.local_area} +  {router.query.device_type}
      운영제어
    </Typography>
  );
}

export default ControlOperation;