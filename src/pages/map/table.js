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

// ** Icons Imports
import AccountSupervisor from 'mdi-material-ui/AccountSupervisor'
import FormatListChecks from 'mdi-material-ui/FormatListChecks'
import MapMarkerRadiusOutline from 'mdi-material-ui/MapMarkerRadiusOutline'
import MapMarkerMinusOutline  from 'mdi-material-ui/MapMarkerMinusOutline'
import MapMarkerMultipleOutline from 'mdi-material-ui/MapMarkerMultipleOutline'
import ChevronUp   from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

//** SVG Imports */
import VoiceTrafficLight from 'public/images/misc/hangil-signal-border.svg'
import VoiceGuidance from 'public/images/misc/hangil-voice-guidance.svg'

const TableWideAreas =  props => {

  // ** Props *
  const {wareas, lareas} = props;
  const [wareasList,updateWareasList] = useState([])
  const [isAdmin, updatedIsAdmin] = useState(false);

  const clickListLocals = event =>{
    let action = event.currentTarget.getAttribute('data-action')
    let warea  = event.currentTarget.getAttribute('data-warea')
    let device = event.currentTarget.getAttribute('data-device')
    
    console.log(action+' '+warea+ ' '+device);
  }

  const downListLocals = event =>{
    let action = event.currentTarget.getAttribute('data-action')
    let warea  = event.currentTarget.getAttribute('data-warea')
    let device = event.currentTarget.getAttribute('data-device')
    
    console.log(action+' '+warea+ ' '+device);
  }

  const Row = props => {
    const { row, listID } = props;
    const [open,setOpen] = useState(false);

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
              { Object.values(row.subs).includes(1) ? 
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
              : '' }
              { Object.values(row.subs).includes(2) ? 
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
              : '' }
            </Link>
          </TableCell>
          {isAdmin ? 
          <TableCell sx={{display:'flex', justifyContent:'space-around', alignItems:'center', marginBottom:'-1px'}}>
            <IconButton
              edge='end'
              title='전체 구역'
              arial-label='button list all local areas'
              data-action='list-lareas'
              onClick={clickListLocals}
              onMouseDown={downListLocals}
              data-warea={row.id}
            >
              <MapMarkerMultipleOutline />
            </IconButton>
            <IconButton
              edge='end'
              title='전체 구역'
              arial-label='button list all local areas'
              data-action='Edit-Warea'
              onClick={clickListLocals}
              onMouseDown={downListLocals}
              data-warea={row.id}
            >
              <MapMarkerRadiusOutline />
            </IconButton>
            { /* TODO: only admins */ }
            <IconButton
              edge='end'
              title='전체 구역'
              arial-label='button list all local areas'
              data-action='Inactive-Warea'
              onClick={clickListLocals}
              onMouseDown={downListLocals}
              data-warea={row.id}
            >
              <MapMarkerMinusOutline />
            </IconButton>
          </TableCell>
          : ''}
        </TableRow>
        <TableRow  sx={{borderBottom: open? '1px solid rgba(58, 53, 65, 0.12)': '0px solid transparent', boxSizing:'content-box'}}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: '1px solid transparent' }} colSpan={6}>
            <Collapse in={open} timeout="auto" mountOnEnter unmountOnExit>
            {!row.locals.length > 0? (
              <Typography sx={{textAlign: 'center', fontSize:'1.2rem', padding:'1rem 0'}} >No local Areas</Typography>
            ):(
              /* LOCAL TABLE BEGIN ---------------------------------------------------------*/
              <Table aria-label='list locals'>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Address</TableCell>
                    {isAdmin ? 
                    <TableCell># Users</TableCell>
                    : ''}
                    <TableCell>Equipment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {!row.locals? 'No local Areas': row.locals.map((larea, localID) =>(
                  <TableRow sx={{backgroundColor: larea.is_IOT ? '#fffeef':'white', position:'relative',}} key={localID}>
                    <TableCell 
                      sx={{
                        '& span':{ color:'red', position:'absolute', top: 0, right: 0 }
                      }}
                    >{localID+1}<span>{larea.is_IOT ?'  IOT':''}</span></TableCell>
                    <TableCell>{larea.local_name}</TableCell>
                    <TableCell>{larea.local_type}</TableCell>
                    <TableCell>{larea.local_address}</TableCell>
                    {isAdmin ? 
                    <TableCell>
                      {10}
                      <IconButton
                        edge='end'
                        title='user with access'
                        arial-label='list users with Access'
                        data-action='list-users'
                        data-larea={larea.id}
                      >
                        <AccountSupervisor />
                      </IconButton>
                    </TableCell>
                    : ''}
                    <TableCell>
                    { Object.values(larea.subs).includes(3) ?
                    <IconButton
                      edge='end'
                      title='전체 구역'
                      arial-label='button list all local areas'
                      data-action='Inactive-Warea'
                      onClick={clickListLocals}
                      onMouseDown={downListLocals}
                      data-larea={larea.id}
                    >
                      <FormatListChecks />
                    </IconButton>
                    : ''}
                    {Object.values(larea.subs).includes(1) ?
                    <Box sx={{ display: 'inline-block', position: 'relative',  width:{xs:'16px', sm :'16px'}, paddingRight:'1rem'}}>
                      <VoiceTrafficLight max-height={100} max-width={100} color={'#686868'} arial-label="음향신호기"/>
                    </Box>
                    : ''}
                    {Object.values(larea.subs).includes(2) ?
                    <Box sx={{ display: 'inline-block', position: 'relative',  width:{xs:'16px', sm :'16px'}, paddingRight:'1rem'}}>
                      <VoiceGuidance max-height={100} max-width={100} color={'#686868'} arial-label="음향신호기"/>
                    </Box>
                    : ''}
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
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
    <TableLocals />
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
          {isAdmin ? 
          <TableCell sx={{display:'flex', justifyContent:'space-around'}}
          ><span>설정</span> / <span>제공</span>
          </TableCell>
          : ''}
        </TableRow>
      </TableHead>
      <TableBody>
      {/* Listing all Wide Areas ---------- */}
      {wareasList.map((row,listID) =>  (
        <Row key={listID} row={row} listID={listID}/>
      ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default TableWideAreas;