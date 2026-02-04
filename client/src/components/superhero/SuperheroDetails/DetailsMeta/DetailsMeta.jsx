import styles from './DetailsMeta.module.css';

const DetailsMeta = ({ createdAt, updatedAt }) => (
    <div className={styles.detailsMeta}>
        <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(updatedAt).toLocaleDateString()}</p>
    </div>
);

export default DetailsMeta;
