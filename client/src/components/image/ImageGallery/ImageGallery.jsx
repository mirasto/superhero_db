import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import GalleryEmpty from './GalleryEmpty/GalleryEmpty';
import GalleryItem from './GalleryItem/GalleryItem';
import { BASE_URL } from '@/config';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onRemoveImage, editable = false }) => {
    const [index, setIndex] = useState(-1);

    if (!images || images.length === 0) {
        return <GalleryEmpty />;
    }

    const slides = images.map((img) => ({
        src: `${BASE_URL}${img.url}`,
    }));

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.imageGrid}>
                {images.map((image, idx) => (
                    <GalleryItem
                        key={image.id}
                        image={image}
                        onClick={() => setIndex(idx)}
                        onRemove={onRemoveImage}
                        editable={editable}
                    />
                ))}
            </div>

            <Lightbox
                index={index}
                open={index >= 0}
                close={() => setIndex(-1)}
                slides={slides}
            />
        </div>
    );
};

export default ImageGallery;
