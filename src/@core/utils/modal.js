// ** React Imports
import { useState, useEffect } from 'react'


// ** MUI Components
import { Box, Button, IconButton } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogContentText } from '@mui/material'


// ** Icon Imports
import Close from 'mdi-material-ui/Close'

export const Modal = props => {

  const { openModal, larea, dialogAction, dialogTitle, dialogDescription, btnLeftDialog, btnRightDialog,
          handleClose, handleActionDialog } = props;

  return(
    <Dialog 
      open={openModal}
      onClose={handleClose}
      aria-labelledby ='alert ....'
      aria-describedby='alert ...'
    >
      {/** Dialog Title ----*/}
      <DialogTitle id='dialog-modal'>
        {dialogTitle + ' ' +larea}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx ={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      {/** Dialog Content ----*/}
      <DialogContent>
        <DialogContentText id='dialog-modal'>
          {dialogDescription}
        </DialogContentText>
      </DialogContent>
      {/** Dialog Actions ----*/}
      <DialogActions>
        <Button
         onClick={handleClose}
        >
          {btnLeftDialog}
        </Button>
        <Button
         onClick={handleActionDialog}
         data-action={dialogAction}
         autofocus
        >
          {btnRightDialog}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const ModalBackground = () => {
  const clickGrayBg = event => {
    event.preventDefault();
    
    console.log('click gray BG');
  }
  return (
    <Box
      sx = {{
        display: {xs: 'block', sm: 'none'},
        position: 'absolute',
        zIndex: 1,
        width: '100%', height: '100%',
        background: 'rgb(100,100,100)',
        background: 'linear-gradient(0deg, rgba(100,100,100,1) 0%, rgba(136,136,136,1) 35%, rgba(186,186,186,0) 100%)'
      }}
      onClick= {clickGrayBg}
    >
    </Box>
  );
}
