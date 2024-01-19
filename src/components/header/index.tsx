import { Link } from 'react-router-dom';

import styles from './header.module.css';
import imgLogo from '../../assets/logo.svg';


export function Header(){
    return(
        <>
        
            <header className={styles.container}>
                <div>
                    <Link to={'/'}>
                        <img src={imgLogo} alt="Logo Cripto" />
                    </Link>
                </div>
            </header>
        
        </>
    )
}