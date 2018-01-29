const uuid = require('uuid');

const API_URL = `${process.env.VERIFF_API_URL}/sessions`;

const createSession = function(apiKey, data, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", API_URL, true);
  xhr.setRequestHeader('Content-type','application/json');
  xhr.setRequestHeader('x-auth-client', apiKey);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status == '201') {
        const resp = JSON.parse(xhr.responseText);
        cb(null, resp);
      } else {
        cb(xhr.status, null);
      }
    }
  }

  const body = {
    verification: {
      id: uuid.v4(),
      features: data.features,
      person: {
        firsName: data.person.givenName,
        lastName: data.person.lastName
      },
      timestamp: new Date().toISOString()
    }
  }

  const json = JSON.stringify(body);
  xhr.send(json);
}

module.exports = createSession;