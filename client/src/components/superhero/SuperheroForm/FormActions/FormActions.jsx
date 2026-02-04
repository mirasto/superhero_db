import { Link } from 'react-router-dom';
import styles from './FormActions.module.css';

const FormActions = ({ isSubmitting, isEditMode }) => (
    <div className={styles.formActions}>
        <Link to="/" className="btn">
            Cancel
        </Link>
        <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Hero' : 'Create Hero')}
        </button>
    </div>
);

export default FormActions;
