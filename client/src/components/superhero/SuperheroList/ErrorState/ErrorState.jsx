import styles from './ErrorState.module.css';

const ErrorState = ({ error }) => {
    return (
        <div className={styles.errorContainer}>
            <div className="error-message">
                <h3>Failed to load superheroes</h3>
                <p>{error?.message || 'Something went wrong'}</p>
            </div>
        </div>
    );
};

export default ErrorState;
