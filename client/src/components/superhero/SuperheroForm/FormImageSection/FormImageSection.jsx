import ImageUploader from '@components/image/ImageUploader/ImageUploader';
import ImageGallery from '@components/image/ImageGallery/ImageGallery';
import FormSection from '../FormSection/FormSection';
import styles from './FormImageSection.module.css';

const FormImageSection = ({
    isEditMode,
    existingImages,
    onRemoveExistingImage,
    onFilesSelected
}) => {
    return (
        <FormSection title="Images">
            {isEditMode && existingImages?.length > 0 && (
                <div className={styles.existingImages}>
                    <h3>Current Images</h3>
                    <ImageGallery
                        images={existingImages}
                        onRemoveImage={onRemoveExistingImage}
                        editable={true}
                    />
                </div>
            )}

            <ImageUploader
                onFilesSelected={onFilesSelected}
            />
        </FormSection>
    );
};

export default FormImageSection;
