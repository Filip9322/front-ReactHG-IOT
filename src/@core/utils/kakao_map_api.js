import React from 'react';
import Script from 'next/script'


export async function kakao_api_Init (){
  /*const mapScript = document.createElement('script');

  mapScript.async = true;
  mapScript.type  = "text/javascript";
  mapScript.src   = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}&libraries=services,clusterer`;

  document.head.appendChild(mapScript);

  return mapScript;*/

  return (
    <Script 
      src = {`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`}
      strategy='beforeInteractive'
    />
  );
}