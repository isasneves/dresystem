let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

let grafico;

function adicionarTransacao() {
  let descricao = document.getElementById("descricao").value;
  let valor = parseFloat(document.getElementById("valor").value);
  let tipo = document.getElementById("tipo").value;

  if (!descricao || !valor) {
    alert("Preencha os campos!");
    return;
  }

  let transacao = { descricao, valor, tipo };

  transacoes.push(transacao);

  localStorage.setItem("transacoes", JSON.stringify(transacoes));

  atualizarLista();
  calcularDRE();
}

function atualizarLista() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  transacoes.forEach(t => {
    lista.innerHTML += `<li>${t.descricao} - R$ ${t.valor} (${t.tipo})</li>`;
  });
}

function calcularDRE() {
  let receita = 0;
  let despesa = 0;

  transacoes.forEach(t => {
    if (t.tipo === "receita") receita += t.valor;
    else despesa += t.valor;
  });

  let lucro = receita - despesa;

  document.getElementById("resultado").innerText =
    `Receita: R$ ${receita} | Despesa: R$ ${despesa} | Lucro: R$ ${lucro}`;

  atualizarGrafico(receita, despesa);
}

function atualizarGrafico(receita, despesa) {
  let ctx = document.getElementById("grafico").getContext("2d");

  if (grafico) {
    grafico.destroy();
  }

  grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Receita", "Despesa"],
      datasets: [{
        label: "Financeiro",
        data: [receita, despesa]
      }]
    }
  });
}

// carregar ao abrir
atualizarLista();
calcularDRE();
