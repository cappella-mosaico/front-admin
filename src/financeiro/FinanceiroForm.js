export const FinanceiroForm = () => {
  return (<form onSubmit={(e) => {
    e.preventDefault();
    console.log('submiteu', e);
  }}>
    <input name="id" type="hidden"/>
    <input name="anomes" placeholder="ano/mês" type="date"/>
    <br/>
    <input name="entrada" placeholder="entrada"/>
    <br/>
    <input name="saida" placeholder="saída"/>
    <br/>
    <input name="orcado" placeholder="orçado"/>
    <br/>
    <button className="marginalized">salvar</button>
  </form>);
}
