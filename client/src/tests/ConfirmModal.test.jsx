import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';

describe('ConfirmModal', () => {
    it('renders nothing when isOpen is false', () => {
        const { container } = render(
            <ConfirmModal
                isOpen={false}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
                title="Test"
                message="Test message"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('renders modal content when isOpen is true', () => {
        render(
            <ConfirmModal
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
                title="Delete Hero"
                message="Are you sure?"
            />
        );

        expect(screen.getByText('Delete Hero')).toBeInTheDocument();
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    it('calls onClose when cancel button is clicked', () => {
        const onClose = vi.fn();
        render(
            <ConfirmModal
                isOpen={true}
                onClose={onClose}
                onConfirm={vi.fn()}
                title="Test"
                message="Test"
                cancelText="Cancel"
            />
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(onClose).toHaveBeenCalled();
    });

    it('calls onConfirm when confirm button is clicked', () => {
        const onConfirm = vi.fn();
        render(
            <ConfirmModal
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={onConfirm}
                title="Test"
                message="Test"
                confirmText="Delete"
            />
        );

        fireEvent.click(screen.getByText('Delete'));
        expect(onConfirm).toHaveBeenCalled();
    });

    it('shows loading state when isLoading is true', () => {
        render(
            <ConfirmModal
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
                title="Test"
                message="Test"
                confirmText="Delete"
                isLoading={true}
            />
        );

        expect(screen.getByText('Deleting...')).toBeInTheDocument();
    });

    it('disables buttons when isLoading is true', () => {
        render(
            <ConfirmModal
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
                title="Test"
                message="Test"
                cancelText="Cancel"
                isLoading={true}
            />
        );

        expect(screen.getByText('Cancel')).toBeDisabled();
        expect(screen.getByText('Deleting...')).toBeDisabled();
    });
});
