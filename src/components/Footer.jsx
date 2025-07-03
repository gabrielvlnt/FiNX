import styles from './Footer.module.css'

const Footer = () => (
    <footer className={`${styles.footer} footer ms-5`}>
      &copy; {new Date().getFullYear()} React Project. Todos os direitos reservados.
    </footer>
  );
  
  export default Footer;