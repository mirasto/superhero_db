import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/ui/Pagination/Pagination';

describe('Pagination', () => {
    const basePagination = {
        page: 1,
        totalPages: 5,
        total: 25,
        limit: 5,
        hasNextPage: true,
        hasPrevPage: false
    };

    it('renders pagination info correctly', () => {
        const onPageChange = vi.fn();
        render(<Pagination pagination={basePagination} onPageChange={onPageChange} />);


        expect(screen.getByText(/Showing page/)).toBeInTheDocument();
        expect(screen.getByText(/of/)).toBeInTheDocument();
        expect(screen.getByText(/25 heroes total/)).toBeInTheDocument();
    });

    it('disables previous buttons on first page', () => {
        const onPageChange = vi.fn();
        render(<Pagination pagination={basePagination} onPageChange={onPageChange} />);

        const prevButton = screen.getByLabelText('Previous page');

        expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('enables next buttons when hasNextPage is true', () => {
        const onPageChange = vi.fn();
        render(<Pagination pagination={basePagination} onPageChange={onPageChange} />);

        const nextButton = screen.getByLabelText('Next page');

        expect(nextButton).not.toBeDisabled();
    });

    it('calls onPageChange when clicking next', () => {
        const onPageChange = vi.fn();
        render(<Pagination pagination={basePagination} onPageChange={onPageChange} />);

        const nextButton = screen.getByLabelText('Next page');
        fireEvent.click(nextButton);

        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when clicking a page number', () => {
        const onPageChange = vi.fn();
        render(<Pagination pagination={basePagination} onPageChange={onPageChange} />);

        const page3Button = screen.getByText('3');
        fireEvent.click(page3Button);

        expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it('renders nothing when totalPages is 1 or less', () => {
        const onPageChange = vi.fn();
        const singlePagePagination = { ...basePagination, totalPages: 1 };

        const { container } = render(
            <Pagination pagination={singlePagePagination} onPageChange={onPageChange} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('highlights current page', () => {
        const onPageChange = vi.fn();
        const page3Pagination = { ...basePagination, page: 3, hasPrevPage: true };
        render(<Pagination pagination={page3Pagination} onPageChange={onPageChange} />);

        const currentPageButton = screen.getByRole('button', { current: 'page' });
        expect(currentPageButton).toHaveTextContent('3');
    });
});
