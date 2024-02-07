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
      교차로등록
      신호등 구역등록
      이벤트관리
      일괄등록
      운영제어
      교차로별 운영제어
      망연동관리
    </Typography>
  );
}

export default EquiManagement;