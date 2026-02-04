import { FaBolt } from 'react-icons/fa';
import DetailsSection from '../DetailsSection/DetailsSection';
import ImageGallery from '@components/image/ImageGallery/ImageGallery';
import styles from '../SuperheroDetails.module.css';

const DetailsGrid = ({ superhero, onRemoveImage }) => {
    return (
        <div className={styles.detailsGrid}>
            <DetailsSection title="Origin Story">
                <p className={styles.detailsDescription}>{superhero.origin_description}</p>
            </DetailsSection>

            <DetailsSection title="Superpowers">
                <div className={styles.superpowersList}>
                    {superhero.superpowers.map((power) => (
                        <span key={power} className="badge badge-primary">
                            <FaBolt className={styles.powerIcon} /> {power}
                        </span>
                    ))}
                </div>
            </DetailsSection>

            <DetailsSection title="Catch Phrase">
                <blockquote className={styles.catchPhrase}>
                    "{superhero.catch_phrase}"
                </blockquote>
            </DetailsSection>

            <DetailsSection
                title={`Gallery (${superhero.images.length} images)`}
                className={styles.detailsImages}
            >
                <ImageGallery
                    images={superhero.images}
                    onRemoveImage={onRemoveImage}
                    editable={false}
                />
            </DetailsSection>
        </div>
    );
};

export default DetailsGrid;
