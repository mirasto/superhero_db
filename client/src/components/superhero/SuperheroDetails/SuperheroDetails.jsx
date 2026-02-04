import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSuperhero, useDeleteSuperhero, useRemoveImage } from '@hooks/useSuperheroes';
import ConfirmModal from '@components/ui/ConfirmModal/ConfirmModal';
import Spinner from '@components/ui/Spinner/Spinner';
import DetailsHeader from './DetailsHeader/DetailsHeader';
import DetailsNav from './DetailsNav/DetailsNav';
import DetailsMeta from './DetailsMeta/DetailsMeta';
import DetailsGrid from './DetailsGrid/DetailsGrid';
import styles from './SuperheroDetails.module.css';

const SuperheroDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const { data, isLoading, isError, error } = useSuperhero(id);
    const deleteMutation = useDeleteSuperhero();
    const removeImageMutation = useRemoveImage();

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(id);
            navigate('/');
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const handleRemoveImage = async (imageId) => {
        try {
            await removeImageMutation.mutateAsync({ heroId: id, imageId });
        } catch (err) {
            console.error('Remove image failed:', err);
        }
    };

    const superhero = data?.data;

    if (isLoading) {
        return (
            <div className="loading-container">
                <Spinner />
                <p>Loading superhero details...</p>
            </div>
        );
    }

    if (isError || !superhero) {
        return (
            <div className={styles.errorContainer}>
                <div className="error-message">
                    <h3>{isError ? 'Failed to load superhero' : 'Superhero not found'}</h3>
                    <p>{error?.message || ''}</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary mt-lg">
                        Back to List
                    </button>
                </div>
            </div>
        );
    }

    return (
        <article className={styles.superheroDetails}>
            <DetailsNav
                heroId={id}
                onDelete={() => setDeleteModalOpen(true)}
            />

            <DetailsHeader
                nickname={superhero.nickname}
                real_name={superhero.real_name}
            />

            <DetailsGrid
                superhero={superhero}
                onRemoveImage={handleRemoveImage}
            />

            <DetailsMeta
                createdAt={superhero.createdAt}
                updatedAt={superhero.updatedAt}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Superhero"
                message={`Are you sure you want to delete "${superhero.nickname}"? This action cannot be undone.`}
                confirmText="Delete"
                isLoading={deleteMutation.isPending}
            />
        </article>
    );
};

export default SuperheroDetails;
