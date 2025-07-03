import styles from './Home.module.css'

const Home = () => {

    return (
        <section className={` ${styles.home} container-fluid`}> 
            <h1 className={`${styles.title} `}>Home</h1>
        </section>
    )
}

export default Home;