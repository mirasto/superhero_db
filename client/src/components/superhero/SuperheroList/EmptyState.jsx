import { Link } from 'react-router-dom';
import { GiBatMask } from 'react-icons/gi';

const EmptyState = () => {
    return (
        <div className="empty-state card">
            <div className="empty-state-icon">
                <GiBatMask size={60} />
            </div>
            <h2 className="empty-state-title">No superheroes yet</h2>
            <p className="empty-state-description">
                Start building your superhero database by adding your first hero!
            </p>
            <Link to="/create" className="btn btn-primary">
                Add Your First Hero
            </Link>
        </div>
    );
};

export default EmptyState;
