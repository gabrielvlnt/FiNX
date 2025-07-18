import styles from './Footer.module.css'

const Footer = () => (
    <footer className={`${styles.footer} container-fluid`}>
      &copy; {new Date().getFullYear()} React Project. Todos os direitos reservados.
    </footer>
  );
  
  export default Footer;