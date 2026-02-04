import { Link } from 'react-router-dom';
import { GiBatMask } from "react-icons/gi";
import styles from './CardImage.module.css';

const CardImage = ({ id, nickname, thumbnailUrl }) => (
    <Link to={`/superhero/${id}`} className={styles.cardImageLink}>
        <div className={styles.cardImage}>
            {thumbnailUrl ? (
                <img src={thumbnailUrl} alt={nickname} />
            ) : (
                <div className={styles.cardImagePlaceholder}>
                    <GiBatMask size={40} />
                </div>
            )}
            <div className={styles.cardImageOverlay}>
                <span>View Details</span>
            </div>
        </div>
    </Link>
);

export default CardImage;
