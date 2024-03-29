import { useEffect, useState } from "react";
import { Loader, LoaderOptions, useInjectKakaoMapApi }from "react-kakao-maps-sdk";

/**
 * Kakao Map Api를 Loading 합니다.
 *
 * 해당 hook은 cleanup 시점에도 Kakao Map Api를 제거 하지 않고, 동일한 hook를 여러 위치에서 호출 하더라도 최초 한번만 Loading 됩니다.
 *
 * 내부에서 반환하는 `loading` state는 hook를 통해 제어할 때 사용하도록 제공하는 state 입니다.
*
* loading를 통한 `Map` 컴포넌트를 conditional rendering를 하지 않아도 됩니다.


useInjectKakaoMapApi ({...options});
*/

let KakaoLoader;
let ExtLoading = true;
let ExtError;

const bIsKakaoMapLoaded = () => {
  return ExtLoading;
}
const useKakaoLoader = (options) => {
  const [loading, setLoading] = useState(ExtLoading);
  const [error, setError] = useState(undefined);
  
  const optionsKakao = {
    appkey: process.env.KAKAO_JS_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  };

  useEffect(()=> {
    KakaoLoader = new Loader({...optionsKakao})
    .load()
    .then(() => setLoading(false))
    .catch(error => {
      setError(error)
    });
    ExtLoading = loading;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [JSON.stringify(options)]
  );

  useEffect(()=>{
    //ExtLoading = loading;
  },[loading])
  
  return <></>;
}

export {useKakaoLoader, bIsKakaoMapLoaded};