import axios from 'axios';

const ROOT_URL =
  'https://cors-anywhere.herokuapp.com/https://obscure-caverns-79008.herokuapp.com';

const client = axios.create({
  baseURL: ROOT_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const request = options => {
  const onSuccess = res => {
    console.debug('Request successful: ', res);
    return res.data;
  };

  const onError = err => {
    console.error('Request failed: ', err.config);

    if (err.response) {
      // Request was made but server responded with something other than 2xx
      const { status, data, headers } = err.response;
      console.error('Status:', status);
      console.error('Data:', data);
      console.error('Headers:', headers);
    } else {
      // Something else happened while making the request
      console.error('Error message:', err.message);
    }

    throw new Error(err.response || err.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
