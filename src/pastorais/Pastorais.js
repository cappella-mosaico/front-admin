import {PastoralForm} from "./PastoralForm";
import {PastoraisList} from "./PastoraisList";
import {useState} from "react";

export const Pastorais = ({token, setToken, pastorais, setPastorais}) => {
  const [selectedPastoral, selectPastoral] = useState();
  const clearPastoral = () => {
    selectPastoral(null);
  }

  return (<>
    {pastorais.length > 0 && <h1>Pastorais</h1>}

    <PastoralForm token={token}
                  setToken={setToken}
                  pastorais={pastorais}
                  setPastorais={setPastorais}
                  selectedPastoral={selectedPastoral}
                  clearPastoral={clearPastoral}/>

    <PastoraisList token={token}
                   setToken={setToken}
                   pastorais={pastorais}
                   setPastorais={setPastorais}
                   selectPastoral={selectPastoral}/>
   </>);
}
