// ** React imports
import { useState, useEffect } from 'react';

// ** Material Components Imports
import { Box, Typography } from '@mui/material'

const ControllerInformation = props => {

  const { controller, openEquiState, setOpenEquiStatus } = props;

  return(
    <Box 
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(241, 244, 249, 1)'
      }}
    >
      <Typography
        sx={{
          width: '100%',
          fontSize: '22px',
          paddingRight: '5px',
          justifySelf: 'center',
          marginTop: 10,
          marginBottom: 5
        }}
        variant='h6'
      >{controller.local_area_controller_number}번 {controller.controller_name}</Typography>
      <Box
        sx={{
          backgroundColor: 'rgba(241,244,249,1)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 30px'
        }}
      >
        
      </Box>
    </Box>
  )
}

export { ControllerInformation };