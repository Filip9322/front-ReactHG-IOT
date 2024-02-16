// ** React Imports
import { useState, useEffect } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { rootActions } from 'src/@core/redux/reducer'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Typography } from '@mui/material'



const LoraManagement = () => {
  // ** Hooks
  const router = useRouter();

  // ** Redux
	const dispatch  = useDispatch();

  useEffect(() => {
    // ** Set Page Name and MetaData
    dispatch(rootActions.updateTitle("망연동관리"));
  },[]);

  return(
    <Typography>
      {router.query.local_area} +  {router.query.device_type}
      망연동관리
    </Typography>
  );
}

export default LoraManagement;