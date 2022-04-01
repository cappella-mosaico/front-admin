import {useEffect, useState} from "react";
import {ROOT_URL} from "../App";

export const PastoraisList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${ROOT_URL}/latest`)
      .then(response => response.json())
      .then(d => setData(d))
      .catch(error => console.error(error));
  }, []);

  return (data?.map(each => (<div key={each.id}>
      <h4>#{each.id} - {each.titulo}</h4>
      <p>
        {each.descricao}
      </p>
      <small>{each.autor}</small>
    </div>)
  ));
}
