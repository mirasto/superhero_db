import styles from './PaginationInfo.module.css';

const PaginationInfo = ({ page, totalPages, total }) => (
    <div className={styles.paginationInfo}>
        Showing page {page} of {totalPages}
        <span className={styles.paginationTotal}>({total} heroes total)</span>
    </div>
);

export default PaginationInfo;
