function PainelProprietaria({ agendamentos, onCancelar, onSair }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.titulo}>👑 Painel da Proprietária</h1>
          <p style={styles.subtitulo}>SALÃO BELEZA FEMININA</p>
        </div>
        <button style={styles.btnSair} onClick={onSair}>Sair</button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitulo}>
          Agendamentos
          {agendamentos.length > 0 && (
            <span style={styles.badge}>{agendamentos.length}</span>
          )}
        </h3>

        {agendamentos.length === 0 ? (
          <p style={styles.empty}>Nenhum agendamento ainda.</p>
        ) : (
          agendamentos.map((a) => (
            <div key={a.id} style={styles.item}>
              <div style={styles.itemInfo}>
                <p style={styles.itemNome}>👤 {a.nomeCliente}</p>
                <p style={styles.itemDetalhe}>✂️ {a.servico}</p>
                <p style={styles.itemDetalhe}>📅 {a.data} às {a.horario}</p>
              </div>
              <button style={styles.btnCancelar} onClick={() => onCancelar(a.id)}>
                Cancelar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
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
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    paddingBottom: 16,
    marginBottom: 16,
    gap: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    color: "#e8d5ff",
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: "0.95rem",
  },
  itemDetalhe: {
    color: "#b899d4",
    fontSize: "0.82rem",
    marginBottom: 3,
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

export default PainelProprietaria;