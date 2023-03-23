// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText';
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import FormControl, { useFormControl } from '@mui/material/FormControl';


// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {

  // ** Form handlers
  const initialValue = {user_id: '', password: ''};
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ** State
  const [values, setValues] = useState({
    showPassword: false,
    errors:{
      user_id: '',
      user_password: '',
      user_id_hasError: false,
      user_pw_hasError: false
    }
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const submitForm = () => {
    console.log("HI");
    postLoginAuthentication(
        "http://localhost:3001/login", 
        {user_ID: 'LAla_AdmIn', user_pw:"hgasfdjksdhfsajuki12" }    
    ).then((data) => {
      console.log(data);
    });
  };

  async function postLoginAuthentication(url = "", data = {}){
    const response = await fetch(url, {
      method: "POST",
      mode:  "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow , error,
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    });

    return response.json();
  }

  const handleChange = prop => event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  
  const handleSubmit  =  function(event){
    event.preventDefault();
    try {
      let validateSubmit = false;

      // Check Errors
      let errors = validate(formValues);
      setValues({ ...values, errors: errors });

      if (errors.user_pw_hasError || errors.user_id_hasError){
          validateSubmit = false;
        } else validateSubmit = true;

      setFormErrors(validateSubmit);
      setIsSubmitting(validateSubmit);
      
    } catch (error){
      console.error(error);
    }
  }

  const validate = (formValues) => {
    let errors = {};

    // 정규식 표현 - Regular expressions
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    // No ID value , 아이디 값이 없을시
    if(!formValues.user_id){
      errors.user_id = "아이디를 입력해 주세요";
      errors.user_id_hasError = true;
    } else  errors.user_id_hasError = false;

    // No Password valus, 비밀번호의 값이 없을시
    if(!formValues.password){
      errors.user_password = "비밀번호를 입력해 주세요";
      errors.user_pw_hasError = true;
    } else if (formValues.password.length < 4){
      errors.user_password = "비밀번호의 길이가 4글자 이하"
      errors.user_pw_hasError = true;
    } else  errors.user_pw_hasError = false;

    return errors;
  }

  useEffect(() => {
    console.log('TrueOrDare: '+Object.keys(formErrors));
    if (isSubmitting){
      submitForm();
    }
  }, [formErrors]);


  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5  }}>
              로그인
            </Typography>
            <img  src='/images/pages/hangil_logo.png'  style={{width: '100px'}} alt="한길 로고"/>
            <Typography variant='body2'>IOT 기반의 실시간 음향신호기 모니터링 시스템</Typography>
            <Typography variant='body2'>BLE 기반의 실시간 음성유도기 모니터링 시스템</Typography>
          </Box>
          <form id='loginForm' noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              id='user_id'
              name='user_id'
              label='아이디'
              error={values.errors.user_id_hasError}
              value={formValues.user_id}
              helperText={values.errors.user_id}
              onChange={handleChange('user_id')}
              required
              autoFocus fullWidth
              sx={{ marginBottom: 4 }} 
            />
            <FormControl error={values.errors.user_pw_hasError} fullWidth>
              <InputLabel htmlFor='user_password'>비밀번호</InputLabel>
              <OutlinedInput
                id='password'
                name='password'
                label='Password'
                value={formValues.user_password}
                onChange={handleChange('password')}
                required
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{values.errors.user_password}</FormHelperText>
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='로그인 상태 유지' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>비밀번호 찾기</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              type= 'submit'
            >
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
