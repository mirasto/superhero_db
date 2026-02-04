import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import styles from './ListHeader.module.css';

const ListHeader = () => {
    return (
        <header className={styles.listHeader}>
            <div className={styles.listHeaderContent}>
                <h1>Superheroes</h1>
                <p>Manage your collection of legendary heroes</p>
            </div>
            <Link to="/create" className="btn btn-primary btn-lg">
                <FaPlus />
                Add New Hero
            </Link>
        </header>
    );
};

export default ListHeader;
