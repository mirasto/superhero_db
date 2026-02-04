import { FaTimes } from 'react-icons/fa';
import styles from './PreviewItem.module.css';

const PreviewItem = ({ preview, onRemove }) => (
    <div className={styles.previewItem}>
        <img src={preview.url} alt="Upload preview" />
        <button
            type="button"
            className={styles.removePreview}
            onClick={() => onRemove(preview.id)}
        >
            <FaTimes />
        </button>
    </div>
);

export default PreviewItem;
