import styles from './FormGroup.module.css';

const FormGroup = ({ label, id, name, value, onChange, placeholder, error, type = 'text', rows }) => {
    const InputComponent = type === 'textarea' ? 'textarea' : 'input';

    return (
        <div className={styles.formGroup}>
            <label htmlFor={id}>{label}</label>
            <InputComponent
                type={type !== 'textarea' ? type : undefined}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={error ? styles.error : ''}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default FormGroup;
