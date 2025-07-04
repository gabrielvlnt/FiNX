import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import Footer from './components/Footer'
import styles from './App.module.css'

function AppContent() {
  const location = useLocation();
  // Esconde a navbar nas rotas de login e registro
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className={styles.content}>
      {!hideNavbar && <Navbar />}
      <main className={styles.maincontent}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
        </Routes>
      </main>
      <div className={`${styles.footerapp}`}>
        <Footer/>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
