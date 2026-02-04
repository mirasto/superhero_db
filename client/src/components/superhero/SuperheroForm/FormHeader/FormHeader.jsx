import styles from './FormHeader.module.css';

const FormHeader = ({ title, description }) => (
    <header className={styles.formHeader}>
        <h1>{title}</h1>
        <p>{description}</p>
    </header>
);

export default FormHeader;
