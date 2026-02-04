import { useState, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';
import UploadControls from './UploadControls/UploadControls';
import PreviewGrid from './PreviewGrid/PreviewGrid';
import styles from './ImageUploader.module.css';

const ImageUploader = ({ onFilesSelected }) => {
    const [previews, setPreviews] = useState([]);
    const fileInputRef = useRef(null);

    const handleFiles = useCallback((files) => {
        const fileList = Array.from(files);
        const validFiles = fileList.filter(file => file.type.startsWith('image/'));

        if (validFiles.length !== fileList.length) {
            alert('Only image files are allowed');
        }

        const newPreviews = validFiles.map(file => ({
            id: nanoid(),
            url: URL.createObjectURL(file),
            file
        }));

        const updatedPreviews = [...previews, ...newPreviews];
        setPreviews(updatedPreviews);
        onFilesSelected(updatedPreviews.map(p => p.file));
    }, [previews, onFilesSelected]);

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const removeFile = useCallback((id) => {
        setPreviews(prev => {
            const filtered = prev.filter(p => p.id !== id);
            onFilesSelected(filtered.map(p => p.file));
            return filtered;
        });
    }, [onFilesSelected]);

    return (
        <div className={styles.imageUploader}>
            <UploadControls
                onSelectClick={() => fileInputRef.current.click()}
                fileInputRef={fileInputRef}
                onChange={handleChange}
            />

            <PreviewGrid
                previews={previews}
                onRemove={removeFile}
            />
        </div>
    );
};

export default ImageUploader;
