let transacoes = [];

function adicionarTransacao() {
  let descricao = document.getElementById("descricao").value;
  let valor = parseFloat(document.getElementById("valor").value);
  let tipo = document.getElementById("tipo").value;

  let transacao = { descricao, valor, tipo };

  transacoes.push(transacao);

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
}
