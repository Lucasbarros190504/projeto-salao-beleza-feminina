import { useState } from "react";

function Login({ onEntrarProprietaria, onCadastrarCliente, onLoginCliente }) {
  const [modal, setModal] = useState(null);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [senhaProprietaria, setSenhaProprietaria] = useState("");

  function fecharModal() {
    setModal(null);
    setNome("");
    setSenha("");
    setConfirmarSenha("");
    setErro("");
    setSenhaProprietaria("");
  }

  function confirmarProprietaria() {
    if (senhaProprietaria === "silvania123") {
      fecharModal();
      onEntrarProprietaria();
    } else {
      setErro("Senha incorreta!");
    }
  }

  function confirmarCadastro() {
    if (!nome.trim() || !senha.trim()) {
      setErro("Preencha todos os campos!");
      return;
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }
    const resultado = onCadastrarCliente(nome.trim(), senha);
    if (!resultado.sucesso) setErro(resultado.erro);
  }

  function confirmarLogin() {
    if (!nome.trim() || !senha.trim()) {
      setErro("Preencha todos os campos!");
      return;
    }
    const resultado = onLoginCliente(nome.trim(), senha);
    if (!resultado.sucesso) setErro(resultado.erro);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}> Agenda Fácil</h1>
        <p style={styles.subtitulo}>SALÃO BELEZA FEMININA</p>
        <p style={styles.descricao}>Como deseja entrar?</p>

        <button style={styles.btnProprietaria} onClick={() => setModal("proprietaria")}>
          👑 Proprietária
        </button>
        <button style={styles.btnCliente} onClick={() => setModal("login-cliente")}>
          👤 Já tenho cadastro
        </button>
        <button style={styles.btnCadastro} onClick={() => setModal("cadastro-cliente")}>
          ✨ Criar conta
        </button>
      </div>

      {modal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>

            {modal === "proprietaria" && (
              <>
                <h3 style={styles.modalTitulo}>👑 Acesso da Proprietária</h3>
                <p style={styles.modalLabel}>Digite sua senha:</p>
                <input
                  style={styles.modalInput}
                  type="password"
                  placeholder="••••••••"
                  value={senhaProprietaria}
                  onChange={(e) => { setSenhaProprietaria(e.target.value); setErro(""); }}
                  onKeyDown={(e) => e.key === "Enter" && confirmarProprietaria()}
                  autoFocus
                />
              </>
            )}

            {modal === "login-cliente" && (
              <>
                <h3 style={styles.modalTitulo}>👤 Entrar</h3>
                <p style={styles.modalLabel}>Nome:</p>
                <input
                  style={styles.modalInput}
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); setErro(""); }}
                  autoFocus
                />
                <p style={{ ...styles.modalLabel, marginTop: 12 }}>Senha:</p>
                <input
                  style={styles.modalInput}
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => { setSenha(e.target.value); setErro(""); }}
                  onKeyDown={(e) => e.key === "Enter" && confirmarLogin()}
                />
              </>
            )}

            {modal === "cadastro-cliente" && (
              <>
                <h3 style={styles.modalTitulo}>✨ Criar Conta</h3>
                <p style={styles.modalLabel}>Nome:</p>
                <input
                  style={styles.modalInput}
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); setErro(""); }}
                  autoFocus
                />
                <p style={{ ...styles.modalLabel, marginTop: 12 }}>Senha:</p>
                <input
                  style={styles.modalInput}
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => { setSenha(e.target.value); setErro(""); }}
                />
                <p style={{ ...styles.modalLabel, marginTop: 12 }}>Confirmar senha:</p>
                <input
                  style={styles.modalInput}
                  type="password"
                  placeholder="••••••••"
                  value={confirmarSenha}
                  onChange={(e) => { setConfirmarSenha(e.target.value); setErro(""); }}
                  onKeyDown={(e) => e.key === "Enter" && confirmarCadastro()}
                />
              </>
            )}

            {erro && <p style={styles.erro}>{erro}</p>}

            <div style={styles.modalBtns}>
              <button style={styles.btnCancelar} onClick={fecharModal}>Cancelar</button>
              <button
                style={styles.btnConfirmar}
                onClick={
                  modal === "proprietaria" ? confirmarProprietaria :
                    modal === "login-cliente" ? confirmarLogin :
                      confirmarCadastro
                }
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#1a0a2e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: "40px 32px",
    maxWidth: 380,
    width: "100%",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  },
  titulo: {
    fontFamily: "Georgia, serif",
    fontSize: "2rem",
    color: "#f9d4ff",
    marginBottom: 8,
  },
  subtitulo: {
    color: "#b899d4",
    letterSpacing: 3,
    fontSize: "0.8rem",
    marginBottom: 32,
  },
  descricao: {
    color: "#e8d5ff",
    marginBottom: 20,
    fontSize: "0.95rem",
  },
  btnProprietaria: {
    width: "100%",
    padding: "14px",
    marginBottom: 12,
    background: "linear-gradient(135deg, #9333ea, #c084fc)",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "sans-serif",
  },
  btnCliente: {
    width: "100%",
    padding: "14px",
    marginBottom: 12,
    background: "rgba(255,255,255,0.08)",
    color: "#f0e6ff",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10,
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "sans-serif",
  },
  btnCadastro: {
    width: "100%",
    padding: "14px",
    background: "rgba(192,132,252,0.15)",
    color: "#c084fc",
    border: "1px solid rgba(192,132,252,0.3)",
    borderRadius: 10,
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "sans-serif",
  },
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 100,
  },
  modal: {
    background: "#2d1254",
    border: "1px solid rgba(192,132,252,0.3)",
    borderRadius: 16,
    padding: "32px 28px",
    maxWidth: 360,
    width: "100%",
  },
  modalTitulo: {
    fontFamily: "Georgia, serif",
    color: "#f9d4ff",
    marginBottom: 16,
    fontSize: "1.2rem",
  },
  modalLabel: {
    color: "#b899d4",
    fontSize: "0.85rem",
    marginBottom: 8,
    letterSpacing: 1,
  },
  modalInput: {
    width: "100%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "#f0e6ff",
    fontFamily: "sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  },
  erro: {
    color: "#fca5a5",
    fontSize: "0.82rem",
    marginTop: 8,
  },
  modalBtns: {
    display: "flex",
    gap: 10,
    marginTop: 20,
  },
  btnCancelar: {
    flex: 1,
    padding: "12px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#f0e6ff",
    borderRadius: 10,
    cursor: "pointer",
    fontFamily: "sans-serif",
    fontSize: "0.95rem",
  },
  btnConfirmar: {
    flex: 1,
    padding: "12px",
    background: "linear-gradient(135deg, #9333ea, #c084fc)",
    border: "none",
    color: "white",
    borderRadius: 10,
    cursor: "pointer",
    fontFamily: "sans-serif",
    fontSize: "0.95rem",
  },
};

export default Login;