import PreviewItem from '../PreviewItem/PreviewItem';
import styles from './PreviewGrid.module.css';

const PreviewGrid = ({ previews, onRemove }) => {
    if (previews.length === 0) return null;

    return (
        <div className={styles.previewGrid}>
            {previews.map((preview) => (
                <PreviewItem
                    key={preview.id}
                    preview={preview}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default PreviewGrid;
