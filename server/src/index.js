import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import superheroRoutes from './routes/superhero.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use('/api/superheroes', superheroRoutes);


app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


app.use((err, req, res, next) => {
    console.error('Error:', err);

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File size too large. Maximum size is 5MB.'
        });
    }

    if (err.message && err.message.includes('Invalid file type')) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});


app.listen(PORT, () => {
    console.log(`🦸 Superhero API Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads directory: ${path.join(__dirname, '../uploads')}`);
});

export default app;
