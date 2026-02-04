import { Link } from 'react-router-dom';
import { GiBatMask } from 'react-icons/gi';
import styles from './EmptyState.module.css';

const EmptyState = () => {
    return (
        <div className={styles.emptyState}>
            <div className={styles.icon}>
                <GiBatMask />
            </div>
            <h2 className={styles.title}>No superheroes yet</h2>
            <p className={styles.description}>
                Start building your superhero database by adding your first hero!
            </p>
            <Link to="/create" className="btn btn-primary btn-lg">
                Add Your First Hero
            </Link>
        </div>
    );
};

export default EmptyState;
