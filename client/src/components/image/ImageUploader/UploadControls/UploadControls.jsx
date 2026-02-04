import { FaPlus } from 'react-icons/fa';
import styles from './UploadControls.module.css';

const UploadControls = ({ onSelectClick, fileInputRef, onChange }) => (
    <div className={styles.uploadControls}>
        <button
            type="button"
            className="btn"
            onClick={onSelectClick}
        >
            <FaPlus /> Select Images
        </button>
        <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={onChange}
            className={styles.fileInput}
        />
        <span className={styles.uploadHint}>JPG, PNG or GIF (Max 5MB)</span>
    </div>
);

export default UploadControls;
