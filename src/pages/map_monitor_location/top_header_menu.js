// ** React Imports
import { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Next Import
import { useRouter } from 'next/router'
import Router from 'next/router'
import Link from 'next/link'

// ** Redux
import { useDispatch, useSelector } from 'react-redux';
import { rootActions } from 'src/@core/redux/reducer';

// ** MUI Components
import { Box, Button, Grid, Card, CardContent, CardMedia, 
         Typography, IconButton, Paper, Menu, MenuItem } from '@mui/material';
import { ClickAwayListener } from '@mui/base'

// ** Icons Imports
import Monitor from 'mdi-material-ui/Monitor'
import ReceiptTextClockOutline from 'mdi-material-ui/ReceiptTextClockOutline'
import Cog from 'mdi-material-ui/Cog'

//** SVG Imports */
import IconReport from 'public/images/misc/icon_report.svg'
import IconManage from 'public/images/misc/icon_manage.svg'

const ControllerMonitorTopMenu = props => {

  //** --------------> SubComponent START -------------------------------------------------------- */
  const MenuComponent = props =>{
    
    const { id, link, title, hasSubmenu, submenu } = props;

    const buttonRef= useRef();
    
    //** React UseState
    const [ openMenu, setOpenMenu ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    
    const handleClickAway = () => {
      setOpenMenu(false);
    }
    
    // ** Click Event Functions
    const handleClickTitleSubMenu = event => {
      setOpenMenu(!openMenu);
      setAnchorEl(buttonRef.current);
    }

    const handleClickSubMenItem = event => {
      let button = event.currentTarget;
      let href = button.getAttribute('data-href');
      Router.push(href);
    }
    
    const handleCloseSubMenu = () => {
      handleClickAway();
      setAnchorEl(null);
    }

    useEffect(() =>{
      setAnchorEl(buttonRef.current);
    },[])

    return (
      <ClickAwayListener onClickAway={handleClickAway} >
        <Button 
          sx = {{ display:'flex', position: 'relative', alignItems:'center',':hover':{cursor: 'pointer'}}}
          href = {id == 'monitoring'?(`${ basePath }${ link }`): ''}
          component={id == 'monitoring'?('a'): 'div'}
          data-href = {`${ basePath }${ link }`}
          onClick = { handleClickTitleSubMenu }
          ref = { buttonRef }
        >
          <IconButton
            edge='end'
            title={ title }
            arial-label={ title }
            aria-haspopup='true'
            aria-controls={ openMenu ? 'long-menu' : undefined }
            aria-expanded={ openMenu ? 'true' : undefined }
          >
            {id == 'monitoring'?(
              <Monitor sx={{fontSize: '3.5rem'}} />
            ):''}
            {id == 'management'?(
              <IconManage height={56} max-width={100} color={'#686868'} arial-label={ title }/>
            ):''}
            {id == 'history'?(
              <ReceiptTextClockOutline sx={{fontSize: '3.5rem'}} />
            ):''}
            {id == 'reports'?(
              <IconReport height={56} max-width={100} color={'#686868'} arial-label="보고서출력"/>
            ):''}
            {id == 'preferences'?(
              <Cog sx={{fontSize: '3.5rem'}} />
            ):''}
          </IconButton>
          <Typography sx={{ textAlign: 'center'}}>
            {title}
          </Typography>
          { hasSubmenu && openMenu ?
            (<Menu
              elevation = { 0 }
              open = { openMenu }
              anchorEl = { anchorEl }
              onClose  = { handleCloseSubMenu }
              sx={{
                '& .MuiMenuItem-root:hover':{
                  backgroundColor: '#f14a4a',
                  '& a.MenuLink': { color: '#fff' }
                },
                '& .MuiMenuItem-root a.MenuLink':{
                  textDecoration: 'none',
                  color: '#3a3541de'
                }
              }}
            >
              { submenu.map(( subItem, row )=>(
                <MenuItem key={ row } 
                  onClick={ handleClickSubMenItem } 
                  data-href={ `${ basePath }${ link }/${ subItem.link }` }
                >
                  <Link href={ `${ basePath }${ link }/${ subItem.link }`}  className={'MenuLink'}>
                    { subItem.name }
                  </Link>
                </MenuItem>
              ))}
            </Menu>) :''
          }
        </Button>
      </ClickAwayListener>
    );
  }
  //** --------------> SubComponent END ------------------------------------------------ */

  const { hidden, toggleNavVisibility } = props;

  const subMenuManagement = 
  [
    {id: 1, name: '교차로등록' , link: 'Intersection_Registration'},
    {id: 2, name: '신호등 구역등록' , link: 'TrafficLight_Registration'},
    {id: 3, name: '이벤트관리' , link: 'EventManagement'},
    {id: 4, name: '일괄등록' , link: 'BatchRegistration'},
    {id: 5, name: '운영제어' , link: 'ControlOperation'},
    {id: 6, name: '교차로별 운영제어' , link: 'ControlOperation_Intersection'},
    {id: 7, name: '망연동관리' , link: 'Lora_Management'}
  ]

  const subMenuHistory = 
  [
    {id: 1, name: '이벤트이력' , link: 'Event_History'},
    {id: 2, name: '시설물이력' , link: 'Facility_History'},
    {id: 3, name: '주기정보이력' , link: 'PeriodicInformation_History'},
    {id: 4, name: '민원등록이력' , link: 'ComplaintRegistration_History'},
    {id: 5, name: '이벤트전파이력' , link: 'EventPropagation_History'},
    {id: 6, name: '운영제어이력' , link: 'ControlOperation_History'},
    {id: 7, name: '시스켐접속이력' , link: 'SystemConnection_History'},
    {id: 8, name: '주기정보백업' , link: 'PeriodInformation_Backup'}
  ]

  const subMenuReports = 
  [
    {id: 1, name: '교차로별 시설물현황' , link: 'FacilityStatus_Intersection'},
    {id: 2, name: '이벤트발생 집계' , link: 'Total_EventOccurrences'},
    {id: 3, name: '주기보고발생 집계' , link: 'Total_ReportOccurrences'},
    {id: 4, name: '민원발생 현황' , link: 'CurrentStatus_CivilComplaint'},
    {id: 5, name: '상황전파 현황' , link: 'SituationSpread_Status'},
    {id: 6, name: '운영제어 현황' , link: 'OperationControl_Status'},
    {id: 7, name: '교차로별 시설물수량집계' , link: 'QuantityFacilities_Intersection'},
    {id: 8, name: '이상발생 현황' , link: 'ErrorOccurrence_Status'},
    {id: 9, name: '전체 이상발생 현황' , link: 'TotalError_Status'},
    {id: 10, name: 'IOT/BLE정보 찾기' , link: 'IOTBLE_Information'},
    {id: 11, name: '보고중단 내역' , link: 'ReportSuspension'}
  ]

  const subMenuPreferences = 
  [
    {id: 1, name: '협력사관리' , link: 'Partner_Management'},
    {id: 2, name: '협력사직원관리' , link: 'PartnerEmployee_Management'},
    {id: 3, name: '사용자관리' , link: 'User_Management'},
    {id: 4, name: '환경설정' , link: 'Preferences'},
    {id: 5, name: '지자체관리' , link: 'LocalGoverment_Management'},
    {id: 6, name: '코드관리' , link: 'Code_Management'}
  ]

  //** React UseState 
  const [ hiddeTopMenu, setHiddeTopMenu ] = useState(true);

  // ** Hook
  const responsiveMenu = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // ** Redux Test
  const { id, la_name, logo } = useSelector(state => state.currentLA);
  const { count } = useSelector(state => state.counter);
  const dispatch  = useDispatch();

  // ** Hooks
  const router = useRouter();
  const { asPath } = useRouter()
  const basePath = `/map_monitor_location/${router.query.local_area}/${router.query.device_type}/`;

  const clickLogoLocalArea = event => {
    event.preventDefault();
    dispatch(rootActions.increment());
  }

  //** React Use Effect
  useEffect(() => {
    if(asPath.includes('map_monitor_location')){
      setHiddeTopMenu(false)
    } else setHiddeTopMenu(true)
  },[])

  return(
    !hiddeTopMenu ? (
    <Box 
      sx={{
        width: '100%',
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          '& .MuiPaper-root':{
            width: '100%',
            margin: '0 5px'
          },
          '& .MuiButton-root':{
            minWidth: 130,
            maxWidth: 220,
            display: 'flex',
            ...(responsiveMenu ? {}:{flexDirection: 'column'}),
            paddingBottom:5,
            alignItems: 'center',
            padding: '20px 40px',
            ':hover':{backgroundColor: '#96d3e433', color: 'blue', cursor: 'pointer'}
          },
          '& .MuiIconButton-root':{
            color:'#686868'
          },
          ...(!responsiveMenu ? {}:{flexDirection: 'column'})
        }}
      >
        {hidden ? (
          <Card
            onClick={ clickLogoLocalArea }
            className={'logo-header-card'}
            data-larea={ id }
            data-title={ la_name }
            sx={{ width: 'fit-content', height: 'auto' }}
          >
            <CardContent
              sx={{ minWidth: 50, display: 'flex', flexDirection: 'column', padding: 0 }}
            >
              <CardMedia
                component={'picture'}
                sx={{display: 'flex', alignItems: 'center'}}
                alt={`logo`}
              >
                <source
                  srcSet={`${logo} 300w, 
                          ${logo} 768w, 
                          ${logo} 1280w`}
                  sizes={'(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px'}
                />
                <img src={`${logo}`}/>
              </CardMedia>
              <Typography>
                { la_name }
              </Typography>
            </CardContent>
          </Card>
        ): null }
        <Paper elevation={6}>
          <MenuComponent id={'monitoring'} link={''} title={'모니토링'} hasSubmenu={false} />
        </Paper>
        <Paper elevation={6}>
          <MenuComponent id={'management'} link={'management'} title={'시설관리'} hasSubmenu={true} submenu={subMenuManagement} />
        </Paper>
        <Paper elevation={6}>
          <MenuComponent id={'history'} link={'history'} title={'이력관리'} hasSubmenu={true} submenu={subMenuHistory} />
        </Paper>
        <Paper elevation={6}>
          <MenuComponent id={'reports'} link={'reports'} title={'보고서출력'} hasSubmenu={true} submenu={subMenuReports} />
        </Paper>
        <Paper elevation={6}>
          <MenuComponent id={'preferences'} link={'preferences'} title={'환경설정'} hasSubmenu={true} submenu={subMenuPreferences} />
        </Paper>
      </Grid>
    </Box>
  ): ''
  );
}

export default ControllerMonitorTopMenu;