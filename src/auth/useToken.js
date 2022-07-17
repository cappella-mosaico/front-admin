import {useState} from "react";

export const useToken = () => {
  const [token, setLocalStateToken] = useState(localStorage.getItem('token'));
  const [tokenExpirationTime, setTokenExpirationTime] = useState(localStorage.getItem('tokenExpirationTime'));

  const setToken = (newToken) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 29);
    if (newToken) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('tokenExpirationTime', d.getTime());
    } else {
      localStorage.clear();
    }
    setLocalStateToken(newToken);
    setTokenExpirationTime(d);
  }
  return {
    token, setToken, tokenExpirationTime
  }
}
