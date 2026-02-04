import { useState } from 'react';
import { useSuperheroes, useDeleteSuperhero } from '@hooks/useSuperheroes';
import Pagination from '@components/ui/Pagination/Pagination';
import ConfirmModal from '@components/ui/ConfirmModal/ConfirmModal';
import Spinner from '@components/ui/Spinner/Spinner';
import ListHeader from './ListHeader/ListHeader';
import EmptyState from './EmptyState/EmptyState';
import ErrorState from './ErrorState/ErrorState';
import SuperheroGrid from './SuperheroGrid/SuperheroGrid';
import { DEFAULT_PAGE_LIMIT } from '@/config';

const SuperheroList = () => {
    const [page, setPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [heroToDelete, setHeroToDelete] = useState(null);

    const { data, isLoading, isError, error } = useSuperheroes(page, DEFAULT_PAGE_LIMIT);
    const deleteMutation = useDeleteSuperhero();

    const handleDeleteClick = (id) => {
        const hero = data?.data?.find(hero => hero.id === id);
        setHeroToDelete(hero);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!heroToDelete) return;

        try {
            await deleteMutation.mutateAsync(heroToDelete.id);
            setDeleteModalOpen(false);
            setHeroToDelete(null);

            if (data?.data?.length === 1 && page > 1) {
                setPage(prev => prev - 1);
            }
        } catch (error) {
            console.error("Failed to delete superhero:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <Spinner />
                <p>Loading superheroes...</p>
            </div>
        );
    }

    if (isError) return <ErrorState error={error} />;

    const heroes = data?.data || [];
    const pagination = data?.pagination;

    return (
        <section>
            <ListHeader />

            {heroes.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <SuperheroGrid
                        heroes={heroes}
                        onDelete={handleDeleteClick}
                    />

                    {pagination && (
                        <Pagination
                            pagination={pagination}
                            onPageChange={setPage}
                        />
                    )}
                </>
            )}

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Superhero"
                message={`Are you sure you want to delete "${heroToDelete?.nickname}"? This action cannot be undone.`}
                confirmText="Delete"
                isLoading={deleteMutation.isPending}
            />
        </section>
    );
};

export default SuperheroList;
