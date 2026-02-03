import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => (
    <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
            Home
        </Link>
        <Link to="/create" className="btn btn-primary btn-sm">
            Add Hero
        </Link>
    </nav>
);

export default Nav;
