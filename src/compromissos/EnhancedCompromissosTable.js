import { useState, useEffect } from 'react';

/*
                  baseado na lista de compromissos carregados para esse ministerio
                  eu devo carregar as atividades (História, Atividade, Louvor...)
                  e também devo carregar as salas (3-5 anos, Berçário...)

                  pretendo usar o nome do compromisso pra gerar essa estrutura:
                  "História_3-5 anos" carrega uma atividade com nome "História" e uma sala com nome "3-5 anos"
*/

function generateHighContrastHexColor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0');
  }
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  while (luma > 255 / 2) {
    // if the color is too bright, darken it
    r = Math.max(0, r - 25);
    g = Math.max(0, g - 25);
    b = Math.max(0, b - 25);
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  color = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  return color;
}


export const EnhancedCompromissosTable = ({ compromissos }) => {
  const [atividades, setAtividades] = useState([]);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const atividades = new Set();
    const salas = new Set();
    if (compromissos) {
      compromissos.forEach(compromisso => {
        if (compromisso.atividade)
          atividades.add(compromisso.atividade);
        if (compromisso.sala)
          salas.add(compromisso.sala);
      });

      setAtividades([...atividades]);
      setSalas([...salas]);
    }
  }, [compromissos]);

  const showEquipe = (compromissos, sala, atividade) => {
    const compromissosBySalaByAtividade = compromissos.filter(c => (c.sala === sala && c.atividade === atividade));
    const ebd = compromissosBySalaByAtividade.find(c => c.ebd);
    const culto = compromissosBySalaByAtividade.find(c => !c.ebd);

    if (!ebd && !culto) {
      return '☹';
    }

    return (<>
              ☀ { ebd?.equipes[0].equipe || '☹' }
              <br />
              🌙 { culto?.equipes[0].equipe || '☹' }
            </>);
  };

  return (<table>
            <thead>
              <tr>
                <td>Sala</td>
                {atividades.map(atividade => (<td key={atividade}>{atividade}</td>))}
              </tr>
            </thead>
            <tbody>
              {salas.map(sala => (<tr key={sala}>
                                 <td style={{color: generateHighContrastHexColor(sala)}}>{sala}</td>
                                    {atividades.map(atividade => (
                                      <td key={sala + '-' + atividade}>
                                        {showEquipe(compromissos, sala, atividade)}
                                      </td>))}
                                  </tr>))}
            </tbody>
          </table>);
};
