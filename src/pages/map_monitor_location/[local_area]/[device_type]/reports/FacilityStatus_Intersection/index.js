// ** React Imports
// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import { Typography } from '@mui/material'



const EquiManagement = () => {
  // ** Hooks
  const router = useRouter(); 

  return(
    <Typography>
      {router.query.local_area} +  {router.query.device_type}
      교차로별 시설물현황
    </Typography>
  );
}

export default EquiManagement;