import { useState, useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import styles from './RegisterForm.module.css'
import { AuthContext } from '../context/AuthProvider2'

const Register = () => {
    const [form, setForm] = useState({name: '', email: '', password: '', confirmPassword: ''})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        let timer
        if (success) {
            alert('Conta criada com sucesso!')
            timer = setTimeout(() => {
                navigate('/home')
            }, 2000)
        }
        return () => clearTimeout(timer);
    }, [success, navigate])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (form.email == '' || form.password == '' || form.name == '' || form.confirmPassword == ''){
            setError('Preencha todos os campos')
            return
        }
        if (form.password != form.confirmPassword){
            setError('Suas senhas diferem')
            return
        }
        if (!form.email.includes('@') && !form.email.includes('.com') || !form.email.includes('.br')){
            setError('Insira um e-mail válido')
            return
        }
        if (form.password.length < 5 || form.confirmPassword.length < 5){
            setError('Sua senha deve ter mais de 5 caracteres')
            return
        }
        if (form.name.length < 5){
            setError('Nome inválido')
            return
        }
        try{
            const res = await fetch('https://preguicadefazeraapi.com.br', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (res.ok) {
                setUser(data.user)
                localStorage.setItem('token', data.token)
                setSuccess(true)
            } else {
                setError(data.message || 'Erro ao registrar')
            }
        } catch(err) {
            setError('Erro na conexão', err)
        }
    }
    return(
        <section className={`${styles.backregister} container-fluid expand-lg`}>
            <div className={`${styles.registerform} card`}>
                <a className={`${styles.title} my-5`} href="/"><h2>FiNX</h2></a>
                <form className={`${styles.form} card-body`} onSubmit={handleSubmit}>
                    <h2 className={`${styles.titleform}`}>Registrar-se</h2>
                    <input 
                    className={`form-control card-text ${styles.inputCustom}`}
                    type="text"
                    name='name'
                    value={form.name}
                    placeholder='Nome'
                    onChange={handleChange}
                    />
                    <input 
                    className={`form-control card-text ${styles.inputCustom}`}
                    type="text" 
                    name='email'
                    value={form.email}
                    placeholder='E-mail'
                    onChange={handleChange}
                    />
                    <input
                    className={`form-control card-text ${styles.inputCustom}`} 
                    type="password"
                    name='password'
                    value={form.password}
                    placeholder='Senha'
                    onChange={handleChange}
                    />
                    <input 
                    className={`form-control card-text ${styles.inputCustom}`}
                    type="password" 
                    name='confirmPassword'
                    value={form.confirmPassword}
                    placeholder='Confirme sua senha'
                    onChange={handleChange}
                    />
                    {error && <div className={`my-3 ${styles.error}`}>{error}</div>}
                    <button className={`btn mt-4 ${styles.btnregister}`} type='submit'>Criar conta</button>
                </form>
            </div>
        </section>
    )
}

export default Register