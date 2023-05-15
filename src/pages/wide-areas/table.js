// ** Reactr Imports
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

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import MapMarkerRadiusOutline from 'mdi-material-ui/MapMarkerRadiusOutline'
import MapMarkerMinusOutline  from 'mdi-material-ui/MapMarkerMinusOutline'
import MapMarkerMultipleOutline from 'mdi-material-ui/MapMarkerMultipleOutline'
import ChevronUp   from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const TableWideAreas =  props => {

  // ** Props *
  const {wareas, lareas} = props;
  const [wareasList,updateWareasList] = useState([])

  const clickListLocals = event =>{
    let action = event.currentTarget.getAttribute('data-action');
    let warea  = event.currentTarget.getAttribute('data-warea')
    
    console.log(action+' '+warea);
  }

  const downListLocals = event =>{
    let action = event.currentTarget.getAttribute('data-action');
    let warea  = event.currentTarget.getAttribute('data-warea')
    
    console.log(action+' '+warea);
  }

  const Row = props => {
    const { row, listID } = props;
    const [open,setOpen] = useState(false);

    return (
      <>
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
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}} onClick={()=> setOpen(!open)}>
            <Link 
              sx={{':hover':{cursor: 'pointer'}}}
              data-action='list-lareas'
              data-warea={row.id}
              onMouseDown={downListLocals}
            >
              {row.locals ? row.locals.length : lareas.length}: Areas
            </Link>
          </TableCell>
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
        </TableRow>
        <TableRow  sx={{borderBottom: open? '1px solid rgba(58, 53, 65, 0.12)': '0px solid transparent', boxSizing:'content-box'}}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: '1px solid transparent' }} colSpan={6}>
            <Collapse in={open} timeout="auto" mountOnEnter unmountOnExit>
            {!row.locals.length > 0? (
              <Typography sx={{textAlign: 'center', fontSize:'1.2rem', padding:'1rem 0'}} >No local Areas</Typography>
            ):(
              <Table aria-label='list locals'>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell># Users</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {!row.locals? 'No local Areas': row.locals.map((larea, localID) =>(
                  <TableRow sx={{backgroundColor: larea.is_IOT ? '#fffeef':'white'}} key={localID}>
                    <TableCell sx={{'& span':{color:'red'}}}>{localID+1}<span>{larea.is_IOT ?'  IOT':''}</span></TableCell>
                    <TableCell>{larea.local_name}</TableCell>
                    <TableCell>{larea.local_type}</TableCell>
                    <TableCell>{larea.local_address}</TableCell>
                    <TableCell>{10}</TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            )}
            </Collapse>
          </TableCell>
        </TableRow>
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
    <Table  aria-label='List all Provincies'>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>로고</TableCell>
          <TableCell>#</TableCell>
          <TableCell>구역</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>종료</TableCell>
          <TableCell sx={{display:{xs:'none',sm:'table-cell'}}}>Total Areas</TableCell>
          <TableCell sx={{display:'flex', justifyContent:'space-around'}}
          ><span>설정</span> / <span>제공</span>
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
  </TableContainer>
  )
}

export default TableWideAreas;