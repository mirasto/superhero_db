import express from 'express';
import upload from '../middleware/upload.js';
import {
    getAllSuperheroes,
    getSuperheroById,
    createSuperhero,
    updateSuperhero,
    deleteSuperhero,
    addImages,
    removeImage
} from '../controllers/superhero.controller.js';

const router = express.Router();


router.get('/', getAllSuperheroes);


router.get('/:id', getSuperheroById);


router.post('/', upload.array('images', 10), createSuperhero);


router.put('/:id', upload.array('images', 10), updateSuperhero);


router.delete('/:id', deleteSuperhero);


router.post('/:id/images', upload.array('images', 10), addImages);


router.delete('/:id/images/:imageId', removeImage);

export default router;
