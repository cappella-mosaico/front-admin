import {useState} from "react";

export const useToken = () => {
  const [token, setLocalStateToken] = useState(localStorage.getItem('token'));

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.clear();
    }
    setLocalStateToken(newToken);
  }
  return {
    token, setToken
  }
}
