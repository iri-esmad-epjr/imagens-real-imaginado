const container = document.getElementById('prg-section');
const form = document.getElementById('add-event');

// Função para buscar e renderizar os eventos
function fetchEventos() {
  fetch('/programa')
    .then(res => res.json())
    .then(eventos => {
      container.innerHTML = '';

      const dias = {};

      eventos.forEach(ev => {
        if (!dias[ev.dia]) dias[ev.dia] = [];
        dias[ev.dia].push(ev);
      });

      for (const dia in dias) {
        const eventosDoDia = dias[dia];

        const btn = document.createElement('button');
        btn.className = 'btn-acd titulo3';
        btn.textContent = dia;

        const divInfo = document.createElement('div');
        divInfo.className = 'agdinfo';

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
        container.appendChild(btn);
        container.appendChild(divInfo);

        btn.addEventListener('click', () => {
          divInfo.style.display = divInfo.style.display === 'block' ? 'none' : 'block';
        });
      }
    })
    .catch(console.error);
}

// Enviar novo evento
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value.trim());

  fetch('/programa', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao adicionar evento');
      return res.json();
    })
    .then(() => {
      form.reset();
      fetchEventos();
    })
    .catch(err => alert(err.message));
});

fetchEventos();
