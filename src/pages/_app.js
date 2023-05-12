// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

// ** React-JWT to validate token validity
import { isExpired, decodeToken } from 'react-jwt';

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}


// ** Configure JSS & ClassName
const App = props => {
  // Verify User AccessToken
  const verifyAccessToken = async () => {
    const token = localStorage.getItem('accessToken');
    
    if (token){
      const myDecodeToken  = decodeToken(token);
      const isTokenExpired = isExpired(token);
      if(isTokenExpired){
        // Token exists and is Expired
        return true;
      } else return false;
    }
  }
  // Checking if running on client side
  if (typeof window !== 'undefined') {
    var authenticated = verifyAccessToken();

    console.log(authenticated+'lol');
    if(!authenticated) { 
      localStorage.removeItem('accessToken');
      if(window.location.href != `${process.env.REACT_APP_HOST_URL}/pages/login/`){
        window.location.href = '/pages/login';
      }
    }
    if(authenticated && window.location.href == `${process.env.REACT_APP_HOST_URL}/pages/login/`){
      window.location.href = '/';
    }

  }

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout   = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - TODO: Change Dinamically`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – TODO: Change Dinamically`}
        />
        <meta name='keywords' content='TODO: Change Dinamically' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App