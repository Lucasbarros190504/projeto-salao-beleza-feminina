import { useState } from "react";

const SERVICOS = ["Corte", "Escova", "Coloração", "Cronograma Capilar", "Progressiva", "Hidratação"];
const HORARIOS_SEMANA = ["13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];
const HORARIOS_SABADO = ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];

const selectStyle = `
  select option {
    background: #2d1254;
    color: #f0e6ff;
  }
`;

function getHorarios(dataSelecionada) {
  if (!dataSelecionada) return [];
  const dia = new Date(dataSelecionada + "T00:00:00").getDay();
  if (dia === 0 || dia === 1 || dia === 2) return [];
  if (dia === 6) return HORARIOS_SABADO;
  return HORARIOS_SEMANA;
}

function isDiaDisponivel(dataStr) {
  const dia = new Date(dataStr + "T00:00:00").getDay();
  return dia !== 0 && dia !== 1 && dia !== 2;
}

function PainelCliente({ clienteLogado, agendamentos, onAgendar, onCancelar, onSair }) {
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [erro, setErro] = useState("");

  const meusAgendamentos = agendamentos.filter(
    (a) => a.nomeCliente === clienteLogado.nome
  );

  const horariosDisponiveis = getHorarios(data);

  function handleData(e) {
    const novaData = e.target.value;
    setData(novaData);
    setHorario("");
    if (novaData && !isDiaDisponivel(novaData)) {
      setErro("Salão fechado neste dia! Atendemos de quarta a sábado.");
    } else {
      setErro("");
    }
  }

  function handleAgendar() {
    if (!servico || !data || !horario) {
      setErro("Preencha todos os campos!");
      return;
    }
    const jaAgendado = agendamentos.find(
      (a) => a.data === data && a.horario === horario
    );
    if (jaAgendado) {
      setErro("Este horário já está reservado!");
      return;
    }
    onAgendar({ nomeCliente: clienteLogado.nome, servico, data, horario });
    setServico("");
    setData("");
    setHorario("");
    setErro("");
  }

  return (
    <>
      <style>{selectStyle}</style>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.titulo}>👤 Olá, {clienteLogado.nome}!</h1>
            <p style={styles.subtitulo}>SALÃO BELEZA FEMININA</p>
          </div>
          <button style={styles.btnSair} onClick={onSair}>Sair</button>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitulo}>Novo Agendamento</h3>

          <div style={styles.field}>
            <label style={styles.label}>Serviço</label>
            <select style={styles.input} value={servico} onChange={(e) => setServico(e.target.value)}>
              <option value="">Selecione um serviço</option>
              {SERVICOS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Data</label>
            <input style={styles.input} type="date" value={data} onChange={handleData} />
            {data && !isDiaDisponivel(data) && (
              <p style={styles.aviso}>⚠️ Atendemos de quarta a sábado.</p>
            )}
          </div>

          {data && isDiaDisponivel(data) && (
            <div style={styles.field}>
              <label style={styles.label}>Horário</label>
              <select style={styles.input} value={horario} onChange={(e) => setHorario(e.target.value)}>
                <option value="">Selecione um horário</option>
                {horariosDisponiveis.map((h) => {
                  const ocupado = agendamentos.find((a) => a.data === data && a.horario === h);
                  return (
                    <option key={h} value={h} disabled={!!ocupado}>
                      {h} {ocupado ? "— Ocupado" : ""}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {erro && <p style={styles.erro}>{erro}</p>}

          <button style={styles.btnAgendar} onClick={handleAgendar}>Agendar</button>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitulo}>
            Meus Agendamentos
            {meusAgendamentos.length > 0 && (
              <span style={styles.badge}>{meusAgendamentos.length}</span>
            )}
          </h3>

          {meusAgendamentos.length === 0 ? (
            <p style={styles.empty}>Você não tem agendamentos ainda.</p>
          ) : (
            meusAgendamentos.map((a) => (
              <div key={a.id} style={styles.item}>
                <div>
                  <p style={styles.itemInfo}>✂️ <strong>{a.servico}</strong></p>
                  <p style={styles.itemInfo}>📅 {a.data} às {a.horario}</p>
                </div>
                <button style={styles.btnCancelar} onClick={() => onCancelar(a.id)}>
                  Cancelar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#1a0a2e",
    padding: "32px 20px",
    maxWidth: 480,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  titulo: {
    fontFamily: "Georgia, serif",
    fontSize: "1.4rem",
    color: "#f9d4ff",
    marginBottom: 4,
  },
  subtitulo: {
    color: "#b899d4",
    fontSize: "0.75rem",
    letterSpacing: 2,
  },
  btnSair: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#f0e6ff",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    fontFamily: "sans-serif",
    marginTop: 4,
    whiteSpace: "nowrap",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  cardTitulo: {
    fontFamily: "Georgia, serif",
    color: "#f9d4ff",
    marginBottom: 20,
    fontSize: "1.1rem",
  },
  badge: {
    background: "rgba(192,132,252,0.2)",
    color: "#c084fc",
    borderRadius: 20,
    padding: "2px 10px",
    fontSize: "0.78rem",
    marginLeft: 8,
  },
  field: { marginBottom: 16 },
  label: {
    display: "block",
    fontSize: "0.78rem",
    color: "#b899d4",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  input: {
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
  btnAgendar: {
    width: "100%",
    background: "linear-gradient(135deg, #9333ea, #c084fc)",
    color: "white",
    border: "none",
    borderRadius: 10,
    padding: 14,
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "sans-serif",
    marginTop: 8,
  },
  aviso: {
    color: "#fcd34d",
    fontSize: "0.82rem",
    marginTop: 6,
  },
  erro: {
    color: "#fca5a5",
    fontSize: "0.82rem",
    marginBottom: 8,
  },
  item: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    paddingBottom: 12,
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  itemInfo: {
    color: "#b899d4",
    fontSize: "0.88rem",
    marginBottom: 4,
  },
  btnCancelar: {
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)",
    color: "#fca5a5",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: "0.82rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "sans-serif",
    flexShrink: 0,
  },
  empty: {
    textAlign: "center",
    color: "#7c5a99",
    fontSize: "0.9rem",
    padding: "20px 0",
  },
};

export default PainelCliente;