import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styles from './CardActions.module.css';

const CardActions = ({ id, onDelete }) => (
    <div className={styles.cardActions}>
        <Link to={`/edit/${id}`} className="btn btn-sm" title="Edit">
            <FaEdit />
        </Link>
        <button
            onClick={() => onDelete(id)}
            className="btn btn-sm btn-danger"
            title="Delete"
        >
            <FaTrashAlt />
        </button>
    </div>
);

export default CardActions;
