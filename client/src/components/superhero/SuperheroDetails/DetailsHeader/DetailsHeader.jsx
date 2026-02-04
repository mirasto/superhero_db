import styles from './DetailsHeader.module.css';

const DetailsHeader = ({ nickname, real_name }) => (
    <div className={styles.detailsHeader}>
        <h1 className={styles.detailsNickname}>{nickname}</h1>
        <p className={styles.detailsRealName}>
            <span className="label">Real Name:</span> {real_name}
        </p>
    </div>
);

export default DetailsHeader;
