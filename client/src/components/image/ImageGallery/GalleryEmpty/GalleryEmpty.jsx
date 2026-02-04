import { FaImages } from 'react-icons/fa';
import styles from './GalleryEmpty.module.css';

const GalleryEmpty = () => (
    <div className={styles.galleryEmpty}>
        <span className={styles.galleryEmptyIcon}><FaImages size={40} /></span>
        <p>No images available for this hero.</p>
    </div>
);

export default GalleryEmpty;
