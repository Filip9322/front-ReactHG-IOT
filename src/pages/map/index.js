//** React Imports */
import { useState,  useEffect } from "react";

//** Next Imports */
import Link from 'next/link'

//** MUI Components */
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Fade from '@mui/material/Fade'
import Button from "@mui/material/Button"
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardMedia from '@mui/material/CardMedia'
import InputLabel from '@mui/material/InputLabel'
import Typography from "@mui/material/Typography"
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

//** SVG Imports */
import VoiceTrafficLight from 'public/images/misc/hangil-signal-border.svg'
import VoiceTrafficLight_1 from 'public/images/misc/hangil-signal.svg'
import VoiceGuidance from 'public/images/misc/hangil-voice-guidance.svg'

//** Utils  */
import { getWithExpiry } from "src/@core/layouts/utils"
import { decodeToken } from "react-jwt"

// ** Custom Components Imports
import KoreaMapComponent from 'src/@core/components/maps/korea_division'
import TableWideAreas from 'src/pages/wide-areas/table'

//** Class Manager & Helpers*/
import classNames from "classnames"
import { getFetchURL } from 'src/@core/utils/fetchHelper'
import { padding } from "@mui/system";

const WideAreasPage = () => {
  // ** Check Authenticity of access token and user_Id
  // -- Fetch Status
  const [access_token, user_id, userAuthenticated] = useState([]);
  // -- Tabs Status
  const [valueTab, setValueTab] = useState('0');
  // -- Map Status
  const initialMapSelected = {id: 1, wa_name: '서울'};
  const [mapSelectedArea, updateMapSelectedArea] = useState(initialMapSelected);
  // -- Highlight Card status
  const [highLightCard, updateHighLightCard] = useState(0);
  const [searchMatchArea, updateSearchMatchArea] = useState({});
  const [textButtonDetails, setTextButtonDetails] = useState('자세히');
  const [showHighLightCard, updateShowHighLightCard] = useState(false);
  // -- Wide Area List status
  const initialWideArea = [{id:1, wa_name: 'test', wa_logo: ''}];
  const [showCardWidearea, setShowCardWidearea] = useState(false);
  const [wideAreasList, updateWideAreasList] = useState(initialWideArea);
  const [typeDeviceSelected, setTypeDeviceSelected]= useState(0);
  // -- Local areas list Status
  const [showLocalAreasCard, setShowLocalAreaCard] = useState(false);
  // -- Fetch User Access
  const [wideAreasAccessList, setWideAreasAccessList] = useState([]);
  const [localAreasAccessList, setLocalAreasAccessList] = useState([]);
  const [localAreasPerWA, updateLocalAreasPerWA] = useState([]);
    
  // ** MiniMap Colors
  const color1  = '#a09f9f';
  const color2  = '#434343';
  const Hcolor  = '#008593';
  const HoColor = '#fded7ca6';

  // ** Captures event when click Gray Bg
  const clickGrayBg = event => {
    event.preventDefault();

    updateShowHighLightCard(false);
    setShowCardWidearea(false);
    setShowLocalAreaCard(false);
    setTypeDeviceSelected(3);
    setTextButtonDetails('자세히');
  }

  // ** Captures event when click Gray Bg
  const clickButtonDetails = event => {
    event.preventDefault();
    let device = event.currentTarget;
    let type = device.getAttribute('data-type');

    setTypeDeviceSelected(parseInt(type));
    if (showLocalAreasCard && typeDeviceSelected != 3){
      setTextButtonDetails('자세히');
      setShowLocalAreaCard(false);
      setTypeDeviceSelected(3);
    }else{
      setTextButtonDetails('닫기');
      setShowLocalAreaCard(true);
    }
  }

  // ** Capture event Click Wide Area Card
  const clickWideArea = event => {
    event.preventDefault();
    let warea = event.currentTarget;
    let id = warea.getAttribute('data-warea');
    let title = warea.getAttribute('data-title');

    // Toggle'selected' class
    updateHighLightCard(id);
    updateMapSelectedArea({id: parseInt(id), name: title});
    updateShowHighLightCard(true);
    setShowCardWidearea(true);
    // Update Local Areas 
    updateLocalAreasPerWA(searchMatchArea.locals);
  }

  // ** Captures event when click on Map
  const clickMapWideArea = (area_name, area_id) => {
    wideAreasAccessList.some(warea => {
      if(warea.id === area_id){
        updateMapSelectedArea({id: parseInt(area_id), name: area_name});
        updateHighLightCard(parseInt(area_id));
        setShowCardWidearea(true);
        updateShowHighLightCard(true);
        // Update Local Areas 
        updateLocalAreasPerWA(searchMatchArea.locals);
      }
    })
  };

  // ** Handle Click on Tab
  const handleChangeTab = event => {
    event.preventDefault();
    let tab = event.target;
    let id = tab.getAttribute('data-value');
    
    setValueTab(id);
  }

  // ** Fetch API
  async function fetchWide_Areas(){
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/api/wide_areas`,
      {user_ID: user_id, access_token: access_token}
    ).then ((response) => {
      updateWideAreasList(response);
    }).catch((error) => {
      console.error('error: ' + error);
    });
  }

  async function fetchMap_User_Access(){
    getFetchURL(
      `${process.env.REACT_APP_APIURL}/map_list`,
      {user_ID: user_id, access_token: access_token}
    ).then((response) => {
      console.log(response.wide_areas);
      setWideAreasAccessList(response.wide_areas);
      setLocalAreasAccessList(response.local_areas);
    }).catch((error) =>{
      console.error('error: '+ error);
    });
  }

  // ** Start Initialization
  useEffect(() => {
    access_token = localStorage.getItem('accessToken');
    user_id = getWithExpiry('user_ID');
        
    const myDecodeToken = decodeToken(access_token);
    if(myDecodeToken.user_ID == user_id){
      userAuthenticated = true;
    }else{
      userAuthenticated = false;
    }
  },[]);

  // ** IF Authenticated in order trigger Fetch
  useEffect(() => {
    if(userAuthenticated){
      fetchWide_Areas();
      fetchMap_User_Access();
    }else {console.error('Authentication Error')}
  }, [userAuthenticated]);

  // ** Updated base on Area selected in the map
  useEffect(() => {
    let searchArea = wideAreasList.find(warea => warea.id === mapSelectedArea.id);
    if(searchArea) {
      updateSearchMatchArea(searchArea);
    }
  },[mapSelectedArea]);
    
  // ** Search the matching selected in the Map into all wide area list
  useEffect(() => {
    if(searchMatchArea.wa_logo) {setShowCardWidearea(true)}
  },[searchMatchArea]);

  // ** Update Wide Areas to show based on the user access wide areas
  useEffect(() => {
    updateWideAreasList(wideAreasAccessList);
  },[wideAreasAccessList]);


  // ** Custom component Local Area Card */
  const LAreaCard = (props) => {
    
    return (
    <Box {...props} className="lareaCard" m={0} p={'1rem !important'}
      sx={{
        display: 'flex', justifyContent: 'space-between',
        '.counter span:nth-of-type(1)':{ color: '#2E80DF'},
        '.counter span:nth-of-type(2)':{ color: '#DE3030'}
      }}
    >
      <p>{props.city}</p><p className="counter"><span>20 대</span> <span>2건</span></p>
    </Box>
    )
  }

  /** RETURN -----------------------<<<<<<<<<<<*/
  return (
  <Box className='content-center' 
    sx={{
      display: 'flex', 
      alignItems: 'center',
      flexDirection: {xs: 'column', sm:'row'}
    }}
  >
    <Tabs value={valueTab} onChange={handleChangeTab} aria-label="Tabs">
      <Tab label={'지도'} data-value={0} value='0'/>
      <Tab label={'목록'} data-value={1} value='1' />
    </Tabs>
    <Fade in={valueTab == '0'? true : false} unmountOnExit><Box sx={{display: valueTab == '0'?'contents':'none'}}>
      {/** Korean Map Container */}
      <Grid container>
        <Grid item xs={12} >
          <Card>
            <KoreaMapComponent
              className="copm_Map"
              highLightArea={highLightCard} 
              chooseArea={clickMapWideArea} 
              color1={color1} color2={color2} 
              HoColor={HoColor} Hcolor={Hcolor} 
              w_selected={highLightCard}
              sx={{width: 'auto', height: 'auto', padding:'5px 14px'}}
            />
          </Card>
        </Grid>
      </Grid>
    {/** Highlight and mini Cards Container */}
      <Grid container
        sx={{
          backgroundColor: '#f5f5f3',
          zIndex: 2,
          bottom: 0,
          position:{xs:'absolute', sm:'initial'},
          padding: {xs: '10px 0 10px 5px', sm: 0}
        }}
      >
        <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', flexDirection:'column', position: 'relative', overflow:'hidden'}}>
        {showHighLightCard === true ? (
          <Box sx={{position:'absolute', backgroundColor:'#F8EEDC', right: 0, top: 0, padding: '7px 12px', borderRadius: '0 7px 0 0'}}>
            <Typography sx={{ fontSize: {xs: '14px' ,sm:'1rem'} }} variant='h7' >{searchMatchArea.country_wa_term}</Typography>
          </Box>
        ) : (<span></span>)}
        
        { showCardWidearea === true  ? (
          <Grid item  key = {searchMatchArea.id} 
            sx={{width:{xs: '98%', sm: '100%'}, fontSize: {xs: '0.3rem',sm:'1rem'}, boxSizing:'border-box', paddingBottom:'0.4rem'}}
          >
            {/** Highlight Card ---------- */}
            <Card >
              <CardContent sx={{ minWidth: 275, display: 'flex' }} >
                <Box 
                  sx={{ 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    margin: '0px 11px 0px -8px', flexDirection: 'column', cursor: 'pointer' 
                  }}
                >
                  <CardMedia
                    onClick={clickWideArea}
                    data-warea = {searchMatchArea.id}
                    component='img'
                    sx={{ width: {xs:80,sm:100} }}
                    image= {`${searchMatchArea.wa_logo}`}
                    alt={`${searchMatchArea.wa_name} logo`}
                  />
                  <Typography 
                    variant='h6' gutterBottom
                    sx={{
                      fontSize: '16px',
                      fontWeight: '500',
                      ':hover':{
                        textDecoration: 'underline'
                      },
                      '& a':{
                        color: 'primary',
                        textDecoration: 'none'
                      }
                    }}
                  >
                    <Link href='#' onClick={clickWideArea} data-warea = {searchMatchArea.id}>
                      {searchMatchArea.wa_name}
                    </Link>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 100}}>
                  <Box sx={{ display: 'flex',  justifyContent: 'space-between', width:{xs:'75%', md:'84%', lg:'87%'}}}>
                    <Typography sx={{ fontSize: {xs: '18px' ,sm:14} }} variant='h7' >{searchMatchArea.wa_long_name}</Typography>
                    <Typography sx={{ fontSize: 15 }}>17시/구</Typography>
                  </Box>
                  <Divider light />
                  
                  {/** Content 음향신호기 ----- */}
                  <Box 
                    sx={{ 
                      display: 'flex', justifyContent: 'space-evenly',
                      '& .selected':{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '100%'
                      },
                      '& .hidden':{
                        display: 'none'
                      }
                    }}
                  >
                    <Box
                      className={classNames({
                        'selected': typeDeviceSelected == 1,
                        'hidden':   typeDeviceSelected == 2
                      })}
                      onClick={clickButtonDetails}
                      data-type="1"
                      sx={{ 
                        display: 'flex', flexDirection: 'column', padding: '5px 12px', 
                        justifyContent:'space-around', alignItems: 'center',
                        ':hover':{
                          border: 'dashed 1px #70707075',
                          borderRadius: '6px',
                          padding: '4px 11px'
                        },
                        ':selected':{
                          border: 'dashed 1px #70707075',
                          borderRadius: '6px'
                        }
                      }}
                    >
                      <Typography 
                        className={typeDeviceSelected == 1 ? 'hidden': ''}
                        sx={{ fontSize: {xs: '18px' ,sm:14} }} >
                          음향신호기
                      </Typography>
                      <Box sx={{ position: 'relative', width:{xs:'25px', sm :'30px'}}}>
                        <VoiceGuidance max-height={100} max-width={100} color={'#686868'} arial-label="음향신호기"/>
                      </Box>
                      <Box sx={{
                        '& :nth-of-type(1)':{ color: '#2F9F49'},
                        '& :nth-of-type(2)':{ color: '#DE3030'},
                        '& :nth-of-type(3)':{ color: '#E3AA24'}
                      }}>
                        <span>1200 대</span> <span>14 건</span> <span>1 스쿨</span>
                      </Box>
                      <CardActions sx={{padding: '0.2rem 1.25rem'}}>
                        <Button 
                          variant="outlined" 
                          onClick={clickButtonDetails}
                          data-warea = {searchMatchArea.id}
                          data-type="1"
                          sx={{ 
                            fontSize: {xs: '0.4rem',sm:14},
                            padding:{xs:'0.3rem 0', sm:'10px 9px' , xl:'6.5px 21px'}
                          }}
                      >
                        {textButtonDetails}
                      </Button>
                    </CardActions>
                  </Box>
                  
                  {/** Content 음성유도기 ----- */}
                  <Box 
                    className={classNames({
                      'selected': typeDeviceSelected == 2,
                      'hidden':   typeDeviceSelected == 1
                    })}
                    onClick={clickButtonDetails}
                    data-type="2"
                    sx={{
                      display: 'flex', flexDirection: 'column', padding: '5px 12px', 
                      justifyContent:'space-around', alignItems: 'center',
                      ':hover':{
                        border: 'dashed 1px #70707075',
                        borderRadius: '6px',
                        padding: '4px 11px'
                      },
                      ':selected':{
                        border: 'dashed 1px #70707075',
                        borderRadius: '6px'
                      }
                    }}>
                      <Typography 
                        className={typeDeviceSelected == 2 ? 'hidden': ''}
                        sx={{ fontSize: {xs: '18px' ,sm:14} }} 
                      >
                        음성유도기
                      </Typography>
                      <Box sx={{ position: 'relative',  width:{xs:'25px', sm :'30px'}}}>
                        <VoiceTrafficLight max-height={100} max-width={100} color={'#686868'} arial-label="음향신호기"/>
                      </Box>
                      <Box sx={{
                        '& :nth-of-type(1)':{ color: '#2F9F49'},
                        '& :nth-of-type(2)':{ color: '#DE3030'},
                        '& :nth-of-type(3)':{ color: '#E3AA24'}
                      }}>
                        <span>1200 대</span> <span>14 건</span> <span>1 스쿨</span>
                      </Box>
                      <CardActions sx={{padding: '0.2rem 1.25rem'}}>
                        <Button 
                          variant="outlined" 
                          onClick={clickButtonDetails}
                          data-warea = {searchMatchArea.id}
                          data-type="2"
                          sx={{ 
                            fontSize: {xs: '0.4rem',sm:14},
                            padding:{xs:'0.3rem 0', sm:'10px 9px' , xl:'6.5px 21px'}
                          }}
                        >{textButtonDetails}</Button>
                      </CardActions>                                
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            {showLocalAreasCard ===true ?(
            <Card sx={{backgroundColor: '#EFF2FF'}}>
              <CardContent 
                sx={{
                  display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',
                  '& .lareaCard':{
                    margin: '0.1rem 0',
                    width: '40%',
                    backgroundColor: '#fff', borderRadius: '5px', padding:'2rem'
                  }
                }}
              >
              { /** LIST of local Areas -------------------- */}
              { searchMatchArea.locals.map((row, listID) => {
                return(
                  <LAreaCard key={row.id} city={row.local_name}/>
                );
                }) 
              }
              </CardContent>
            </Card>
            ) : (<span></span>)}
          </Grid>
        ) : (<span />)}
        
          { /** Mini Cards Divider ----------------- */ }
          <Grid container
            columns={{xs:12, sm: 8, md:12}} 
            spacing={{xs: 0, sm: 2}}
            sx={{
              flexWrap:{xs:'nowrap', sm:'wrap'},
              justifyContent: 'center',
              overflow:'hidden',
              overflowX: {xs:'auto', sm:'hidden'},
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              paddingLeft:{xs:'60rem', sm: '10rem'}
            }}
          >
          { wideAreasList.map((row, listID) => {
          return(
            <Grid item key={listID} sx={{minWidth: '5rem', boxSizing: 'content-box', '& .selected':{backgroundColor:'#feea5945'}}}>
              <Card
                onClick={clickWideArea}
                className={row.id == highLightCard  ? "selected": ""}
                data-warea = {row.id}
                data-title = {row.wa_name}
                highlightcard = {highLightCard}
                sx={{width: 'fit-content', height: 'auto' ,"&:hover":{ backgroundColor: '#96d3e433', color: 'blue', cursor: 'pointer' }}}
              >
                <CardContent sx={{ minWidth: 50, display: 'flex', flexDirection:'column', padding: 0}} >
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', flex: 20 }}>
                    <CardMedia
                      component='picture'
                      sx={{ display: 'flex', alignItems: 'center' }}
                      alt={`${row.wa_name} logo`}
                    >
                      <source 
                        srcSet={`${row.wa_logo.replace('_','-')} 300w, ${row.wa_logo.replace('_','-')} 768w,  ${row.wa_logo} 1280w`} 
                        sizes ='(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px'
                      />
                      <img  src ={`${row.wa_logo}`}/>
                    </CardMedia>
                  </Box>
                  <Typography sx={{textAlign:'center'}}>
                    {row.wa_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );})
          }
          </Grid>
        </Grid>
      </Grid>
      </Box>
    </Fade>
    <Fade in={valueTab == '1'? true : false} mountOnEnter unmountOnExit>
      <Grid item sx={{width:'100%', display: valueTab == '1'?'block':'none'}}>
      {valueTab == '1'?(
        <TableWideAreas wareas={wideAreasAccessList} lareas={localAreasAccessList} />
        ): <span></span>}
      </Grid>
    </Fade>
    { /** Degrade Background */ 
      showHighLightCard === true ? (
    <Box 
      sx={{
        display: {xs:'block', sm:'none'},
        position: 'absolute',
        zIndex: 1,
        width:'100%', height: '90%',
        background: 'rgb(100,100,100)',
        background: 'linear-gradient(0deg, rgba(100,100,100,1) 0%, rgba(136,136,136,1) 35%, rgba(186,186,186,0) 100%)'
      }}
      onClick={clickGrayBg}
    >
    </Box>
      ):(
    <span/>
    )}
  </Box>
  );
}

export default WideAreasPage;
