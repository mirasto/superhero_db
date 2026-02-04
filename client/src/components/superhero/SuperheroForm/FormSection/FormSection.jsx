import styles from './FormSection.module.css';

const FormSection = ({ title, children }) => (
    <div className={styles.formSection}>
        <h2>{title}</h2>
        {children}
    </div>
);

export default FormSection;
