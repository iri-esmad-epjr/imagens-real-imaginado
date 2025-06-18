const container = document.getElementById('prg-section');
const form = document.getElementById('add-event');

// Função para montar o HTML de cada evento
function renderEvento(evento) {
  const link = evento.linkInscricao
    ? `<a href="${evento.linkInscricao}" class="insc-agd">Inscreve-te aqui</a>`
    : '';
  
  return `
    <button class="btn-acd titulo3">${evento.dia}</button>
    <div class="agdinfo" style="display:none;">
      <table class="prg-table">
        <tr class="txt-5">
          <td class="agd-dt">${evento.horario}</td>
          <td class="agd-dt">${evento.titulo}</td>
          <td class="agd-dt">${evento.oradores}</td>
          <td class="agd-dt">${link}</td>
        </tr>
      </table>
    </div>
  `;
}

// Função para buscar e mostrar eventos
function fetchEventos() {
  fetch('http://localhost:3000/programa')
    .then(res => res.json())
    .then(eventos => {
      // Limpar container
      container.innerHTML = '';

      // Agrupar eventos por dia (ex: DIA 1, DIA 2, etc)
      const dias = {};

      eventos.forEach(ev => {
        if (!dias[ev.dia]) dias[ev.dia] = [];
        dias[ev.dia].push(ev);
      });

      // Construir HTML agrupado por dia
      for (const dia in dias) {
        const eventosDoDia = dias[dia];
        
        // Botão do dia
        const btn = document.createElement('button');
        btn.className = 'btn-acd titulo3';
        btn.textContent = dia;
        container.appendChild(btn);
        
        // Div com tabela de eventos do dia
        const divInfo = document.createElement('div');
        divInfo.className = 'agdinfo';
        divInfo.style.display = 'none';

        const table = document.createElement('table');
        table.className = 'prg-table';

        eventosDoDia.forEach(ev => {
          const tr = document.createElement('tr');
          tr.className = 'txt-5';

          tr.innerHTML = `
            <td class="agd-dt">${ev.horario}</td>
            <td class="agd-dt">${ev.titulo}</td>
            <td class="agd-dt">${ev.oradores}</td>
            <td class="agd-dt">${ev.linkInscricao ? `<a href="${ev.linkInscricao}" class="insc-agd">Inscreve-te aqui</a>` : ''}</td>
          `;

          table.appendChild(tr);
        });

        divInfo.appendChild(table);
        container.appendChild(divInfo);

        // Toggle display quando clica no botão do dia
        btn.addEventListener('click', () => {
          divInfo.style.display = divInfo.style.display === 'block' ? 'none' : 'block';
        });
      }
    })
    .catch(console.error);
}

// Enviar novo evento
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value.trim());

  fetch('http://localhost:3000/programa', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) throw new Error('Erro a adicionar evento');
    return res.json();
  })
  .then(() => {
    form.reset();
    fetchEventos();  // Atualiza a lista depois de adicionar
  })
  .catch(err => alert(err.message));
});

// Chamar no load para mostrar tudo
fetchEventos();
