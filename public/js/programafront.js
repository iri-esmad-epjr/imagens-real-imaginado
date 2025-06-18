const container = document.getElementById('prg-section');
const form = document.getElementById('add-event');

// Função para buscar e renderizar os eventos
function fetchEventos() {
  fetch('http://localhost:3000/programa')
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

        const btn = document.createElement("button");
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
            <td><button class="btn-edit" data-id="${ev._id}">Editar</button></td>
            <td><button class="btn-delete" data-id="${ev._id}">Eliminar</button></td>
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

      // Botões de eliminar
      container.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          if (!confirm('Tens a certeza que queres eliminar este evento?')) return;
          fetch(`http://localhost:3000/programa/${id}`, { method: 'DELETE' })
            .then(res => {
              if (!res.ok) throw new Error('Erro ao eliminar evento');
              return res.json();
            })
            .then(() => {
              alert('Evento eliminado!');
              fetchEventos();
            })
            .catch(err => alert(err.message));
        });
      });

      // Botões de editar
      container.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;

          fetch(`http://localhost:3000/programa/${id}`)
            .then(res => {
              if (!res.ok) throw new Error('Evento não encontrado');
              return res.json();
            })
            .then(evento => {
              form.elements['dia'].value = evento.dia;
              form.elements['horario'].value = evento.horario;
              form.elements['titulo'].value = evento.titulo;
              form.elements['oradores'].value = evento.oradores;
              form.elements['linkInscricao'].value = evento.linkInscricao || '';

              form.dataset.editId = id;
            })
            .catch(err => alert(err.message));
        });
      });
    })
    .catch(console.error);
}

// Enviar novo evento ou editar
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value.trim());

  const editId = form.dataset.editId;
  const url = editId ? `http://localhost:3000/programa/${editId}` : 'http://localhost:3000/programa';
  const method = editId ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) throw new Error(editId ? 'Erro ao atualizar evento' : 'Erro ao adicionar evento');
      return res.json();
    })
    .then(() => {
      form.reset();
      delete form.dataset.editId;
      fetchEventos();
    })
    .catch(err => alert(err.message));
});

fetchEventos();