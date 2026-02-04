import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config';
import CardImage from './CardImage/CardImage';
import CardActions from './CardActions/CardActions';
import styles from './SuperheroCard.module.css';

const SuperheroCard = ({ superhero, onDelete }) => {
    const { id, nickname, images } = superhero;

    const thumbnailUrl = images && images.length > 0
        ? `${BASE_URL}${images[0].url}`
        : null;

    return (
        <article className={`superheroCard ${styles.superheroCard}`}>
            <CardImage
                id={id}
                nickname={nickname}
                thumbnailUrl={thumbnailUrl}
            />

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                    <Link to={`/superhero/${id}`}>{nickname}</Link>
                </h3>

                <CardActions
                    id={id}
                    onDelete={onDelete}
                />
            </div>
        </article>
    );
};

export default SuperheroCard;
