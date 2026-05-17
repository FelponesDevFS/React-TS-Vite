import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from './Formulario.module.css';

type FormData = {
    nome_usuario: string;
    email: string;
    senha: string;
}

const Formulario = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ mode: "onChange" });
    const [listaUsuarios, setListaUsuarios] = useState<FormData[]>([]);
    const [showPassword, setShowPassword] = useState(false)

    const handleSave = (data: FormData) => {
        setListaUsuarios((prev) => [...prev, data]);
        navigate("/perfil", { state: data });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className={styles.main}>
            <div className={styles.formCard}>
                <div className={styles.headerForm}>
                    <h2>Sign up</h2>
                    <p>Create your account</p>
                </div>

                <form className={styles.formContainer} onSubmit={handleSubmit(handleSave)} noValidate>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nome de Usuário</label>
                        <input
                            type="text"
                            placeholder="Digite seu usuário"
                            minLength={3}
                            maxLength={32}
                            {...register("nome_usuario", {
                                required: "Nome é obrigatório",
                                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                maxLength: { value: 32, message: "Máximo 32 caracteres" }
                            })}
                        />
                        {errors.nome_usuario && <span className={styles.error}>{errors.nome_usuario.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            {...register("email", {
                                required: "Email é obrigatório",
                                validate: (value) => {
                                    const emailExiste = listaUsuarios.some(user => user.email === value);
                                    return emailExiste ? "Email já cadastrado" : true;
                                },
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                    message: "Email inválido"
                                }
                            })}
                        />
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Senha</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua senha"
                            minLength={8}
                            {...register("senha", {
                                required: "Senha é obrigatória",
                                minLength: { value: 8, message: "Mínimo 8 caracteres" }
                            })}
                        />
                        <button type="button" onClick={handleShowPassword}>
                            Ver
                        </button>
                        {errors.senha && <span className={styles.error}>{errors.senha.message}</span>}
                    </div>

                    <button type="submit" className={styles.submitButton}>Criar Usuário</button>
                </form>
            </div>
        </div>
    );
}

export default Formulario;
