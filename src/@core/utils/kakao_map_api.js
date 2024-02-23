import React from 'react'
import Script from 'next/script'

import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"


export function KakaoInit (){
  return (
    <Script 
      src = {`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}&libraries=services,clusterer&autoload=true`}
      strategy='beforeInteractive'
    />
  );
}

export function useKakaoLoader() {
  const [ loading, error ] = useKakaoLoaderOrigin({
    appkey: process.env.KAKAO_JS_KEY,
    libraries: ["clusterer", "drawing", "services"],
    autoload: true
  })

  return [loading, error];
}