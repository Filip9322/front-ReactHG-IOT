// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'

// ** React-JWT to validate token validity
import { isExpired, decodeToken } from 'react-jwt';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Page = () => {
  
  async function postLogoutBreakAccessToken (url = "", data = {}){
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
  };

  const logout = () => {
  	if (typeof window !== 'undefined') {
	  	const token = localStorage.getItem('accessToken');
	    
	    if (token){
	      const myDecodeToken  = decodeToken(token);
	      const isTokenExpired = isExpired(token);
	      console.log('decodeToken: '+Object.keys(myDecodeToken));
	  	  postLogoutBreakAccessToken(
	        `${process.env.REACT_APP_APIURL}/logout`,
	        {user_ID: myDecodeToken.user_ID, accessToken: token }
	      ).then((response) =>{
	      	localStorage.removeItem('accessToken');
	      	window.location.href = '/pages/login';
	        console.log(response);
	      }).catch((error) => {
	      	localStorage.removeItem('accessToken');
	      	window.location.href = '/pages/login';
	        console.log(error);
	      });
	    }
	}
  }

  const handleLogout = async () => {
    await logout(); 
  }

  handleLogout();

  return (
  	<Box className='content-center'>
  		Logging Out ...
    </Box>
  )
}
Page.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Page