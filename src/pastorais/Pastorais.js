import {PastoralForm} from "./PastoralForm";
import {PastoralList} from "./PastoralList";
import {useState} from "react";

export const Pastorais = ({ token, setToken }) => {
  const [ pastorais, setPastorais ] = useState([]);
  const [selectedPastoral, selectPastoral] = useState();
  const clearPastoral = () => {
    selectPastoral(null);
  }

  return (<>
    <h1>Pastorais</h1>

    <PastoralForm token={token}
                  setToken={setToken}
                  pastorais={pastorais}
                  setPastorais={setPastorais}
                  selectedPastoral={selectedPastoral}
                  clearPastoral={clearPastoral}/>

    <PastoralList token={token}
                  setToken={setToken}
                  pastorais={pastorais}
                  setPastorais={setPastorais}
                  selectPastoral={selectPastoral}/>
   </>);
}
