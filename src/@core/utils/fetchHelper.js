export async function getFetchURL ( url = '',  data = {}){
  const response = await fetch( url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
        'user_id': data.user_ID,
        'access_token': data.access_token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

  return response.json();
}
export async function postFetchURL (url = "", data = {}){
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
export async function putFetchURL (url = "", data = {}){
  const response = await fetch(url, {
    method: "PUT",
    mode:  "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow", // manual, *follow , error,
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });

  return response;
}; 