/* eslint-disable no-undef */
function fetch(cb) {
  return global.fetch('/dss', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { fetch };
export default Client;

// async function fetchData() {
//   const res = await global.fetch('/dss', {
//     accept: "application/json"
//   })
//   const json = await res.json()
//   return json
// }