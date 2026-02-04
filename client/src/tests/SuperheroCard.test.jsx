import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SuperheroCard from '../components/superhero/SuperheroCard/SuperheroCard';

const mockSuperhero = {
    id: 'test-id-1',
    nickname: 'Superman',
    real_name: 'Clark Kent',
    origin_description: 'From Krypton',
    superpowers: ['flight', 'strength'],
    catch_phrase: 'Up, up and away!',
    images: [
        { id: 'img-1', filename: 'test.jpg', url: '/uploads/test.jpg' }
    ]
};

const mockSuperheroNoImages = {
    ...mockSuperhero,
    id: 'test-id-2',
    images: []
};

const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('SuperheroCard', () => {
    it('renders superhero nickname', () => {
        const onDelete = vi.fn();
        renderWithRouter(<SuperheroCard superhero={mockSuperhero} onDelete={onDelete} />);

        expect(screen.getByText('Superman')).toBeInTheDocument();
    });

    it('renders edit and delete buttons', () => {
        const onDelete = vi.fn();
        renderWithRouter(<SuperheroCard superhero={mockSuperhero} onDelete={onDelete} />);

        expect(screen.getByTitle('Edit')).toBeInTheDocument();
        expect(screen.getByTitle('Delete')).toBeInTheDocument();
    });

    it('renders placeholder when no images', () => {
        const onDelete = vi.fn();
        renderWithRouter(<SuperheroCard superhero={mockSuperheroNoImages} onDelete={onDelete} />);

        const image = screen.queryByRole('img');
        expect(image).not.toBeInTheDocument();
    });

    it('calls onDelete when delete button is clicked', async () => {
        const onDelete = vi.fn();
        renderWithRouter(<SuperheroCard superhero={mockSuperhero} onDelete={onDelete} />);

        const deleteButton = screen.getByTitle('Delete');
        deleteButton.click();

        expect(onDelete).toHaveBeenCalledWith('test-id-1');
    });

    it('links to details page', () => {
        const onDelete = vi.fn();
        renderWithRouter(<SuperheroCard superhero={mockSuperhero} onDelete={onDelete} />);

        const link = screen.getByRole('link', { name: 'Superman' });
        expect(link).toHaveAttribute('href', '/superhero/test-id-1');
    });
});
