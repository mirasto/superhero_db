import SuperheroCard from '../../SuperheroCard/SuperheroCard';
import styles from './SuperheroGrid.module.css';

const SuperheroGrid = ({ heroes, onDelete }) => {
    return (
        <div className={styles.superheroGrid}>
            {heroes.map((hero) => (
                <SuperheroCard
                    key={hero.id}
                    superhero={hero}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default SuperheroGrid;
