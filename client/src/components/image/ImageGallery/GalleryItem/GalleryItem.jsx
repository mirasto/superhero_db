import { FaTimes } from 'react-icons/fa';
import { BASE_URL } from '@/config';
import styles from './GalleryItem.module.css';

const GalleryItem = ({ image, onClick, onRemove, editable }) => {
    return (
        <div className={styles.imageItem}>
            <img
                src={`${BASE_URL}${image.url}`}
                alt={image.filename || `Superhero image ${image.id}`}
                onClick={onClick}
            />
            {editable && (
                <button
                    className={styles.removeBtn}
                    onClick={() => onRemove(image.id)}
                    title="Remove image"
                    type="button"
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

export default GalleryItem;
