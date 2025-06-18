const form = document.querySelector('.nws-form');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const email = form.email.value;

  try {
    const res = await fetch('/submeter-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const text = await res.text();
    alert(text);
    if (res.ok) form.reset();
  } catch {
    alert('Erro ao subscrever.');
  }
});