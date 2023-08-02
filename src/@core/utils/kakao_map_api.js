import React from 'react';
import Script from 'next/script'


export function KakaoInit (){
  return (
    <Script 
      src = {`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`}
      strategy='beforeInteractive'
    />
  );
}