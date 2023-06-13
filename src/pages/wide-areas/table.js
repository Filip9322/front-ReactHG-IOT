// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Custom Components Import
import TableLocals from './local-table'
import { Modal, ModalBackground } from '../../@core/utils/modal'

// ** Icons Imports
import AccountSupervisor from 'mdi-material-ui/AccountSupervisor'
import FormatListChecks from 'mdi-material-ui/FormatListChecks'
import MapMarkerRadiusOutline from 'mdi-material-ui/MapMarkerRadiusOutline'
import MapMarkerMultipleOutline from 'mdi-material-ui/MapMarkerMultipleOutline'
import ChevronUp   from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

//** SVG Imports */
import VoiceTrafficLight from 'public/images/misc/hangil-signal-border.svg'
import VoiceGuidance from 'public/images/misc/hangil-voice-guidance.svg'

const TableWideAreas =  props => {

  // ** Props *
  const {wareas, lareas, isAdmin} = props;

  // ** States
  const [openModal, setOpenModal] = useState(false);
  const [dialogAction, setDialogAction] = useState('');
  const [dialogLArea,  setDialogLArea ] = useState(1);
  const [wareasList,updateWareasList] = useState([])

  const handleOpenModal = event => {
    //let action = event.currentTarget.getAttribute('')
    setOpenModal(true);
    console.log('Open Modal');
  }
  const handleCloseModal = event => {
    setOpenModal(false);
    console.log('Close Modal');
  }

  const clickListLocals = event =>{
    let action = event.currentTarget.getAttribute('data-action')
    let larea  = event.currentTarget.getAttribute('data-larea')
    let device = event.currentTarget.getAttribute('data-device')
    
    console.log(action+' '+larea+ ' '+device);
  }

  const downListLocals = event =>{
    let action = event.currentTarget.getAttribute('data-action')
    let larea  = event.currentTarget.getAttribute('data-larea')
    let device = event.currentTarget.getAttribute('data-device')
    
    console.log(action+' '+larea+ ' '+device);
  }

  const clickActionButton = event => {
    event.preventDefault()
    let action = event.currentTarget.getAttribute('data-action')
    let larea  = event.currentTarget.getAttribute('data-larea')

    setOpenModal(true);
    setDialogAction(action);
    setDialogLArea (larea);
    console.log( 'action: ' + action + ' larea: ' + larea )
  }

  const Row = props => {
    const { row, listID } = props;
    const [ open,setOpen ] = useState(false);

    return (
      <>
        {/* WIDE TABLE Body BEGIN ---------------------------------------------------------*/}
        <TableRow key={listID} sx={{boxSizing:'content-box'}}>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={()=> setOpen(!open)}
            >
              {open ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
          </TableCell>
          <TableCell sx={{display:{xs:'none',sm:'table-cell', position:'relative'}}}>
            <Box 
            sx={{
              minWidth: 38, display:'flex', justifyContent: 'center', 
              position: 'absolute', borderRadius:'50%', top:'10px',
              flexShrink: 0, overflow:'hidden', userSelect:'none', width:'65px', height:'52px'
            }}>
              <img src={`${row.wa_logo.replace('_','-')}`} alt={row.wa_name} width='100%' height='100%'  
                sx={{objectFit:'cover', textAlign:'center', color:'transparent', textIndent:'10000px'}}
              />
            </Box>
          </TableCell>
          <TableCell>{listID+1}</TableCell>
          <TableCell>{row.wa_name}</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>{row.country_wa_term}</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'none', md:'table-cell'}}} onClick={()=> setOpen(!open)}>
            <Link sx={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
              <Box sx={{display:'flex', alignItems:'center',':hover':{cursor: 'pointer'}}}
                onMouseDown={downListLocals}
                onClick={downListLocals}
                data-action='list-lareas'
                data-warea={row.id}
                data-device={'acustic-traffic-light'}
              >
                <Box sx={{ display: 'inline-block', position: 'relative',  width:{xs:'16px', sm :'16px'}, paddingRight:'1rem'}}>
                  <VoiceTrafficLight max-height={100} max-width={100} color={'#686868'} arial-label="음향신호기"/>
                </Box>
                5522: {row.locals ? row.locals.length : lareas.length} 구역
              </Box>
              <Box sx={{display:'flex', alignItems:'center',':hover':{cursor: 'pointer'}}}
                onMouseDown={downListLocals}
                onClick={downListLocals}
                data-action='list-lareas'
                data-warea={row.id}
                data-device={'voice-inductor'}
              >
                <Box sx={{ display: 'inline-block', position: 'relative',  width:{xs:'16px', sm :'16px'}, paddingRight:'1rem'}}>
                  <VoiceGuidance max-height={100} max-width={100} color={'#686868'} arial-label="음향신호기"/>
                </Box>
                8200: {row.locals ? row.locals.length : lareas.length} 시/구
              </Box>
            </Link>
          </TableCell>
        </TableRow>
        <TableRow  sx={{borderBottom: open? '1px solid rgba(58, 53, 65, 0.12)': '0px solid transparent', boxSizing:'content-box'}}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: '1px solid transparent' }} colSpan={6}>
            <Collapse in={open} timeout="auto" mountOnEnter unmountOnExit>
            {!row.locals.length > 0? (
              <Typography sx={{textAlign: 'center', fontSize:'1.2rem', padding:'1rem 0'}} >No local Areas</Typography>
              ):(
              /* LOCAL TABLE BEGIN ---------------------------------------------------------*/
              <TableLocals lareas={row.locals} wareaID={row.id} clickActionButton={clickActionButton}/>
              /* LOCAL TABLE END ---------------------------------------------------------*/
            )}
            </Collapse>
          </TableCell>
        </TableRow>
        {/* WIDE TABLE Body END ---------------------------------------------------------*/}
      </>
    );
  }

  // As takes times to arragne warea.locals, trigger adittional 
  // update after updating locals NOT wareas
  useEffect(() => {
    updateWareasList(wareas);
  },[lareas])

  return(
  <TableContainer component={ Paper }>
    <Table wareas={wareasList} aria-label='List all Provincies'>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>로고</TableCell>
          <TableCell>#</TableCell>
          <TableCell>구역</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>종료</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'none', md:'table-cell'}}}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
              Device & Areas
            </Box> 
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {/* Listing all Wide Areas ---------- */}
      {wareasList.map((row,listID) =>  (
        <Row key={listID} row={row} listID={listID}/>
      ))}
      </TableBody>
    </Table>
    <Modal
      openModal = {openModal}
      larea = {dialogLArea}
      dialogAction      = {dialogAction}
      dialogTitle       = {'Title '}
      dialogDescription = {'Description'}
      btnLeftDialog     = {'Close'}
      btnRightDialog    = {'Save'}
      handleClose       = {handleCloseModal}
      handleActionDialog= {handleOpenModal} 
    />
    <ModalBackground />
  </TableContainer>
  )
}

export default TableWideAreas;