import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './FormNav.module.css';

const FormNav = () => (
    <nav className={styles.formNav}>
        <Link to="/" className="btn">
            <FaArrowLeft className={styles.backIcon} /> Back to List
        </Link>
    </nav>
);

export default FormNav;
