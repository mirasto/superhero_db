import { v4 as uuidv4 } from 'uuid';
import store from '../store/inMemoryStore.js';
import Superhero from '../models/superhero.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getAllSuperheroes = (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: 'Page and limit must be positive integers'
            });
        }

        const result = store.getAll(page, limit);

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch superheroes',
            error: error.message
        });
    }
};


export const getSuperheroById = (req, res) => {
    try {
        const { id } = req.params;
        const superhero = store.getById(id);

        if (!superhero) {
            return res.status(404).json({
                success: false,
                message: 'Superhero not found'
            });
        }

        res.json({
            success: true,
            data: superhero
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch superhero',
            error: error.message
        });
    }
};


export const createSuperhero = (req, res) => {
    try {
        const validation = Superhero.validate(req.body);

        if (!validation.isValid) {
            
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    fs.unlinkSync(file.path);
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.errors
            });
        }

        
        const images = (req.files || []).map(file => ({
            id: uuidv4(),
            filename: file.filename,
            url: `/uploads/${file.filename}`
        }));

        const superhero = new Superhero({
            ...req.body,
            images
        });

        store.create(superhero.toJSON());

        res.status(201).json({
            success: true,
            message: 'Superhero created successfully',
            data: superhero
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create superhero',
            error: error.message
        });
    }
};


export const updateSuperhero = (req, res) => {
    try {
        const { id } = req.params;
        const existing = store.getById(id);

        if (!existing) {
            
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    fs.unlinkSync(file.path);
                });
            }

            return res.status(404).json({
                success: false,
                message: 'Superhero not found'
            });
        }

        
        const mergedData = {
            ...existing,
            ...req.body
        };

        const validation = Superhero.validate(mergedData);

        if (!validation.isValid) {
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    fs.unlinkSync(file.path);
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.errors
            });
        }

        
        const newImages = (req.files || []).map(file => ({
            id: uuidv4(),
            filename: file.filename,
            url: `/uploads/${file.filename}`
        }));

        
        let superpowers = req.body.superpowers;
        if (typeof superpowers === 'string') {
            superpowers = superpowers.split(',').map(s => s.trim()).filter(Boolean);
        }

        const updates = {
            ...req.body,
            superpowers,
            images: [...existing.images, ...newImages]
        };

        const updated = store.update(id, updates);

        res.json({
            success: true,
            message: 'Superhero updated successfully',
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update superhero',
            error: error.message
        });
    }
};


export const deleteSuperhero = (req, res) => {
    try {
        const { id } = req.params;
        const superhero = store.getById(id);

        if (!superhero) {
            return res.status(404).json({
                success: false,
                message: 'Superhero not found'
            });
        }

        
        superhero.images.forEach(image => {
            const imagePath = path.join(__dirname, '../../uploads', image.filename);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });

        store.delete(id);

        res.json({
            success: true,
            message: 'Superhero deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete superhero',
            error: error.message
        });
    }
};


export const addImages = (req, res) => {
    try {
        const { id } = req.params;
        const superhero = store.getById(id);

        if (!superhero) {
            
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    fs.unlinkSync(file.path);
                });
            }

            return res.status(404).json({
                success: false,
                message: 'Superhero not found'
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No images provided'
            });
        }

        const newImages = req.files.map(file => ({
            id: uuidv4(),
            filename: file.filename,
            url: `/uploads/${file.filename}`
        }));

        newImages.forEach(image => {
            store.addImage(id, image);
        });

        const updated = store.getById(id);

        res.json({
            success: true,
            message: 'Images added successfully',
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add images',
            error: error.message
        });
    }
};


export const removeImage = (req, res) => {
    try {
        const { id, imageId } = req.params;
        const superhero = store.getById(id);

        if (!superhero) {
            return res.status(404).json({
                success: false,
                message: 'Superhero not found'
            });
        }

        const removedImage = store.removeImage(id, imageId);

        if (!removedImage) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        
        const imagePath = path.join(__dirname, '../../uploads', removedImage.filename);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        const updated = store.getById(id);

        res.json({
            success: true,
            message: 'Image removed successfully',
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to remove image',
            error: error.message
        });
    }
};
