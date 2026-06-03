import { useState, useEffect } from "react";
import Login from "./pages/Login";
import PainelProprietaria from "./pages/PainelProprietaria";
import PainelCliente from "./pages/PainelCliente";

function App() {
  const [tela, setTela] = useState("login");
  const [clienteLogado, setClienteLogado] = useState(null);
  const [agendamentos, setAgendamentos] = useState(() => {
    const salvo = localStorage.getItem("agendamentos");
    return salvo ? JSON.parse(salvo) : [];
  });
  const [clientes, setClientes] = useState(() => {
    const salvo = localStorage.getItem("clientes");
    return salvo ? JSON.parse(salvo) : [];
  });

  useEffect(() => {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }, [agendamentos]);

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  function entrarProprietaria() {
    setTela("proprietaria");
  }

  function cadastrarCliente(nome, senha) {
    const jaExiste = clientes.find(
      (c) => c.nome.toLowerCase() === nome.toLowerCase()
    );
    if (jaExiste) return { sucesso: false, erro: "Nome já cadastrado!" };
    const novo = { id: Date.now(), nome, senha };
    setClientes([...clientes, novo]);
    setClienteLogado(novo);
    setTela("cliente");
    return { sucesso: true };
  }

  function loginCliente(nome, senha) {
    const cliente = clientes.find(
      (c) => c.nome.toLowerCase() === nome.toLowerCase() && c.senha === senha
    );
    if (!cliente) return { sucesso: false, erro: "Nome ou senha incorretos!" };
    setClienteLogado(cliente);
    setTela("cliente");
    return { sucesso: true };
  }

  function sair() {
    setTela("login");
    setClienteLogado(null);
  }

  function adicionarAgendamento(novo) {
    setAgendamentos([...agendamentos, { id: Date.now(), ...novo }]);
  }

  function cancelarAgendamento(id) {
    setAgendamentos(agendamentos.filter((a) => a.id !== id));
  }

  if (tela === "login") {
    return (
      <Login
        onEntrarProprietaria={entrarProprietaria}
        onCadastrarCliente={cadastrarCliente}
        onLoginCliente={loginCliente}
      />
    );
  }

  if (tela === "proprietaria") {
    return (
      <PainelProprietaria
        agendamentos={agendamentos}
        onCancelar={cancelarAgendamento}
        onSair={sair}
      />
    );
  }

  if (tela === "cliente") {
    return (
      <PainelCliente
        clienteLogado={clienteLogado}
        agendamentos={agendamentos}
        onAgendar={adicionarAgendamento}
        onCancelar={cancelarAgendamento}
        onSair={sair}
      />
    );
  }
}

export default App;