fetch("/newsletter")
  .then(res => res.json())
  .then(subs => {
    const list = document.getElementById("subs-list");

    subs.forEach(sub => {
      const li = document.createElement("li");
      li.textContent = sub.email;

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️";
      delBtn.onclick = () => {
        fetch(`/newsletter/${sub._id}`, { method: "DELETE" })
          .then(() => {
            alert("Apagado com sucesso");
            li.remove();
          });
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  });
