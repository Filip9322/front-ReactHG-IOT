// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ControllerMonitorTopMenu from  'src/pages/map_monitor_location/top_header_menu'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Grid container spacing={1}
      sx={{ 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: '10px 10px'
      }}
    >
      <Grid item xs={9} className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        { hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null }
        <ControllerMonitorTopMenu hidden = {hidden} toggleNavVisibility = {toggleNavVisibility} />
      </Grid>
      <Grid item xs={2} className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown />
      </Grid>
    </Grid>
  )
}

export default AppBarContent
