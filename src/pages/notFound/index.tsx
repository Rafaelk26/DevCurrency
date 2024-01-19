import styles from './notFound.module.css';
import { Link } from 'react-router-dom';


export function NotFound(){
    return(
        <>
        <div className={styles.container}>
            <h1>Página Not Found</h1>
            <Link to={'/'}>
               Acessar cripto moedas.
            </Link>               
        </div>
        </>
    )
}