document.querySelector('.nws-form').addEventListener('submit', function (e) {
    e.preventDefault(); // impedir reload

    const emailInput = document.getElementById('nws-email');
    const email = emailInput.value.trim();

    if (!email) {
        alert("Por favor, insere um email.");
        return;
    }

    fetch('http://localhost:3000/newsletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro na submissão');
        return response.json();
    })
    .then(data => {
        console.log('Subscreveste com sucesso:', data);
        alert("Obrigado por te subscreveres!");
        emailInput.value = ""; // limpa o campo
    })
    .catch(error => {
        console.error('Erro ao subscrever:', error);
        alert("Houve um problema. Tenta mais tarde.");
    });
});
