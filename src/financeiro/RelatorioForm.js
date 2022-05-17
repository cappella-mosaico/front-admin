import {useCallback, useEffect} from "react";
import {zeroPad, ROOT_URL} from "../App";

export const RelatorioForm = ({
                                 token,
                                 setToken,
                                 relatorios,
                                 setRelatorios,
                                 selectedRelatorio,
                                 clearRelatorio
                               }) => {

  useEffect(() => {
    const relatorio = relatorios.filter(p => p.id === selectedRelatorio)?.[0];
    if (relatorio) {
      document.getElementsByName('id').item(0).value = relatorio.id;
      const anoMes = relatorio.anoMes && `${relatorio.anoMes[0]}-${zeroPad(relatorio.anoMes[1], 2)}-01`;
      console.debug(anoMes);
      document.getElementsByName('anoMes').item(0).value = anoMes;
      document.getElementsByName('entradas').item(0).value = relatorio.entradas;
      document.getElementsByName('saidas').item(0).value = relatorio.saidas;
      document.getElementsByName('orcado').item(0).value = relatorio.orcado;
    }
  }, [selectedRelatorio, relatorios]);

  const resetForm = () => {
    clearRelatorio();
    document.getElementsByName('id').item(0).value = '';
    document.getElementsByName('anoMes').item(0).value = '';
    document.getElementsByName('entradas').item(0).value = '';
    document.getElementsByName('saidas').item(0).value = '';
    document.getElementsByName('orcado').item(0).value = '';
  }

  const publish = useCallback((event) => {
    event.preventDefault();
    const {
      id: {value: id},
      anoMes: {value: anoMes},
      entradas: {value: entradas},
      saidas: {value: saidas},
      orcado: {value: orcado}
    } = event.target.children;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        anoMes: anoMes?.substring(0, 7),
        entradas,
        saidas,
        orcado,
      })
    }

    fetch(`${ROOT_URL}/financeiro`, requestOptions)
      .then(response => response.json())
      .then(relatorio => {
        const novosRelatorios = new Map();
        relatorios.forEach(p => novosRelatorios.set(p.id, p));
        if (novosRelatorios.get(relatorio.id)) {
          novosRelatorios.set(relatorio.id, relatorio);
          setRelatorios([...novosRelatorios.values()]);
        } else {
          // if this is a new item, I'm making sure it's added to the top
          const reversed = Array.from(novosRelatorios.values()).reverse();
          reversed.push(relatorio)
          setRelatorios(reversed.reverse());
        }

        resetForm();
      })
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });
  }, [token, setToken]);

  return (<form onSubmit={publish}>
    <input name="id" type="hidden"/>
    <input name="anoMes" placeholder="ano/mês" type="date"/>
    <input name="entradas" placeholder="entradas" step="any" type="number"/>
    <input name="saidas" placeholder="saídas" step="any" type="number"/>
    <input name="orcado" placeholder="orçado" step="any" type="number"/>
    <div className="grid">
      <button>salvar</button>
      {selectedRelatorio && <button type="reset" className="secondary" onClick={resetForm}>cancelar</button>}
    </div>
  </form>);
}
