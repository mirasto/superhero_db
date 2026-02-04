import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrashAlt } from 'react-icons/fa';
import styles from './DetailsNav.module.css';

const DetailsNav = ({ onDelete, heroId }) => (
    <nav className={styles.detailsNav}>
        <Link to="/" className="btn">
            <FaArrowLeft className={styles.iconStyle} /> Back to List
        </Link>
        <div className={styles.detailsNavActions}>
            <Link to={`/edit/${heroId}`} className="btn">
                <FaEdit className={styles.iconStyle} /> Edit
            </Link>
            <button
                className="btn btn-danger"
                onClick={onDelete}
            >
                <FaTrashAlt className={styles.iconStyle} /> Delete
            </button>
        </div>
    </nav>
);

export default DetailsNav;
