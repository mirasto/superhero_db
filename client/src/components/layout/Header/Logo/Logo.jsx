import { Link } from 'react-router-dom';
import { GiBatMask } from "react-icons/gi";
import styles from './Logo.module.css';

const Logo = () => (
    <Link to="/" className={styles.logo}>
        <GiBatMask className={styles.logoIcon} />
        <span className={styles.logoText}>Superhero DB</span>
    </Link>
);

export default Logo;
