import { useLocation, useNavigate } from "react-router-dom";

const Perfil = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Pegamos os dados que vieram no 'state'
    const usuario = location.state;

    // Se o usuário tentar entrar direto no link sem preencher o form, 
    // ele será redirecionado de volta.
    if (!usuario) {
        return (
            <div className="main">
                <h2>Nenhum dado encontrado!</h2>
                <button onClick={() => navigate("/")}>Voltar ao formulário</button>
            </div>
        );
    }

    return (
        <div className="main">
            <div className="form-container">
                <h2>Perfil do Usuário</h2>
                <p><strong>Nome:</strong> {usuario.nome_usuario}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                
                <button 
                    onClick={() => navigate("/")} 
                    style={{ marginTop: '20px', backgroundColor: '#666' }}
                >
                    Fazer novo cadastro
                </button>
            </div>
        </div>
    );
}

export default Perfil;