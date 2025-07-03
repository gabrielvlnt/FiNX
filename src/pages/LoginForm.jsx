import { useState, useContext, useEffect } from "react";
import styles from './LoginForm.module.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider2'


const Login = () => {
    const [form , setForm] = useState({email: '', password: ''})
    const [error, setError] = useState('')
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token){
            fetch('https://faltaaapi.com.br', {
                headers: { Authorization: `Bearer ${token}`}
            })
            .then(res => res.json())
            .then(data => {
                if (data.valid){
                    setUser(data.user)
                    navigate('/home')
                } else{
                    localStorage.removeItem('token')
                }
            })
            .catch(() => {
                localStorage.removeItem('token')
            })
        }
    }, [setUser, navigate])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        setError('')
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(form.email == '' || form.password == '') {
            setError('Please fill in all fields')
            return
        }
        if(form.password.length < 5) {
            setError('Sua senha deve ter mais de 5 caracteres')
            return
        }
        if(!form.email.includes('@')) {
            setError('Digite um e-mail válido')
            return
        }
        try{
            const res = await fetch('https://faltaadesgraçadaapi.com.br', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json()
            if (res.ok) {
                setUser(data.user)
                localStorage.setItem('token', data.token)
                navigate('/home')
            } else{
                setError(data.message || 'Erro ao fazer o login.')
            }
        } catch (err) {
            setError('Erro na conexão', err)
        }
        alert('Login realizado com sucesso')
    }
    return (
        <section className={`${styles.backlogin} container-fluid expand-lg`}>
            <div className={`${styles.loginform} card`}>
                <a className={`${styles.title} my-5`} href="/"><h2>FiNX</h2></a>
                <form className={`${styles.form} card-body`} onSubmit={handleSubmit}>
                    <h2 className={`${styles.titleform}`}>Login</h2>
                    <input 
                    className={`form-control card-text my-2 ${styles.inputCustom}`}
                    type='text'
                    name="email"
                    placeholder='E-mail'
                    value={form.email}
                    onChange={handleChange}
                    />
                    <input 
                    className={`form-control card-text ${styles.inputCustom}`}
                    type="password"
                    name='password'
                    placeholder='Senha'
                    value={form.password}
                    onChange={handleChange}
                    />
                    {error && <div className={`${styles.error} my-3`}>{error}</div>} 
                    <button className={`btn mt-4 ${styles.btnlogin}`} type='submit'>Entrar</button>
                </form>
            </div>
        </section>
    )
}



export default Login;