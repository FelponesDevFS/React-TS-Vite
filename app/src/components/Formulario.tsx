import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


import styles from './Formulario.module.css';

type FormData = {
    nome_usuario: string;
    email: string;
    senha: string;
}

const Formulario = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ mode: "onChange" });
    const nomeUsuarioValue = watch("nome_usuario", "");
    const [verSenha, setVerSenha] = useState<boolean>(false)
    const [listaUsuarios, setListaUsuarios] = useState<FormData[]>([]);

    const botaoExibirSenha = () => {
        setVerSenha((prev) => !prev)
    }
    const handleSave = (data: FormData) => {
        setListaUsuarios((prev) => [...prev, data]);
        navigate("/perfil", { state: data });
    };

    return (
        <div className={styles.main}>

        <div className={styles.formCard}>

        <div className={styles.headerForm}>
        <h2>Sing up</h2>
        <p>Create your account</p>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit(handleSave)} noValidate>
               
                    
        <div className={styles.formGroup}>
            <label className={styles.label}>Nome de Usuário</label>
            <input 
                type="text"
                placeholder="Username"
                minLength={3}
                maxLength={32}
                {...register("nome_usuario", { 
                    required: "Username é obrigatório",
                   minLength: { value: 3, message: "No minímo 3 caracteres" }, 
                    maxLength: { value: 31, message: "Máximo de 32 caracteres" }
                 })}
                />
                <span className={styles.caracterCounter}>{nomeUsuarioValue.length}/32</span>
                {errors.nome_usuario && <p className={styles.errorMessage}>{errors.nome_usuario.message}</p>}
                        
                </div>

                <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>

            <input 

                type="email"
                placeholder="Seu email"
                {...register("email", { 
                required: "Email é obrigatório",
                validate: (value) => {
                    const emailExiste = listaUsuarios.some(user => user.email === value);
                    return emailExiste ? "Este e-mail já está cadastrado!" : true;
                },
                pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                        message: "Email Invalido! (ex: nome@email.com)"
                },
                        minLength: { value: 8, message: "No mínimo 8 digitos" }
                             
                })} 
                />
                {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                </div>

        <div className={styles.formGroup}>
        <label className={styles.label}>Senha</label>
        <div className={styles.inputWrapper} >
            <input 
                type={verSenha ? "text" : "password"}
                minLength={8}
                {...register("senha", { required: "Senha é obrigatória",
                    minLength: { value: 8, message: "No mínimo 8 digitos" }
                 })}
                />
            <button className={styles.showPassword}  type="button" onClick={botaoExibirSenha}>
               <FontAwesomeIcon icon={verSenha ? faEyeSlash : faEye} />
            </button>
            </div>
            {errors.senha && <p className={styles.errorMessage}>{errors.senha.message}</p>}
        </div>
             
                
            <div className={styles.submitContainer}>
             <button type="submit" className={styles.submitButton}>Criar Usuário</button>
            </div>
        </form>

        </div>
        </div>
    );
}

export default Formulario;