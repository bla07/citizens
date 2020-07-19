import axios from 'axios';

const setTokenAdmin = tokenAdmin => {
  if (tokenAdmin) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenAdmin}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default setTokenAdmin;