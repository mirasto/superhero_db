import Spinner from '@components/ui/Spinner/Spinner';
import FormHeader from './FormHeader/FormHeader';
import FormActions from './FormActions/FormActions';
import FormNav from './FormNav/FormNav';
import FormImageSection from './FormImageSection/FormImageSection';
import FormBasicInfo from './FormBasicInfo/FormBasicInfo';
import FormStoryPowers from './FormStoryPowers/FormStoryPowers';
import { useSuperheroForm } from '@hooks/useSuperheroForm';
import { useRemoveImage } from '@hooks/useSuperheroes';
import styles from './SuperheroForm.module.css';
import { useParams } from 'react-router-dom';

const SuperheroForm = () => {
    const { id } = useParams();
    const {
        formData,
        errors,
        isEditMode,
        isLoadingExisting,
        existingData,
        isSubmitting,
        handleChange,
        handleFilesSelected,
        handleSubmit
    } = useSuperheroForm(id);

    const removeImageMutation = useRemoveImage();

    const handleRemoveExistingImage = async (imageId) => {
        if (isEditMode) {
            await removeImageMutation.mutateAsync({ heroId: id, imageId });
        }
    };

    if (isEditMode && isLoadingExisting) {
        return (
            <div className="loading-container">
                <Spinner />
                <p>Loading superhero data...</p>
            </div>
        );
    }

    return (
        <div className={styles.superheroFormContainer}>
            <FormNav />

            <FormHeader
                title={isEditMode ? 'Edit Superhero' : 'Create New Superhero'}
                description={isEditMode ? 'Update the superhero information form' : 'Fill in the details to add a new hero'}
            />

            <form onSubmit={handleSubmit} className={styles.superheroForm}>
                <FormBasicInfo
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                />

                <FormStoryPowers
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                />

                <FormImageSection
                    isEditMode={isEditMode}
                    existingImages={existingData?.data?.images}
                    onRemoveExistingImage={handleRemoveExistingImage}
                    onFilesSelected={handleFilesSelected}
                />

                <FormActions
                    isSubmitting={isSubmitting}
                    isEditMode={isEditMode}
                />
            </form>
        </div>
    );
};

export default SuperheroForm;
