import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { EditableInput } from './EditableInput';

describe('EditableInput', () => {
	const mockItem = { id: 1, text: 'Test Task' };
	const mockHandleDelete = vi.fn();
	const mockHandleEdit = vi.fn();

	it('should render initial components', () => {
		render(
			<EditableInput
				item={mockItem}
				handleDelete={mockHandleDelete}
				handleEdit={mockHandleEdit}
			/>
		);
		expect(screen.getByText('Test Task')).toBeInTheDocument();
		expect(screen.getByText('Delete')).toBeInTheDocument();
		expect(screen.getByText('Edit')).toBeInTheDocument();
	});

	it('should toggle edit mode and render input', () => {
		render(
			<EditableInput
				item={mockItem}
				handleDelete={mockHandleDelete}
				handleEdit={mockHandleEdit}
			/>
		);

		const editButton = screen.getByText('Edit');
		fireEvent.click(editButton);

		const input = screen.getByDisplayValue('Test Task');
		expect(input).toBeInTheDocument();
		expect(screen.getByText('Apply')).toBeInTheDocument();
		expect(screen.getByText('Cancel')).toBeInTheDocument();
	});

	it('should cancel edit mode', () => {
		render(
			<EditableInput
				item={mockItem}
				handleDelete={mockHandleDelete}
				handleEdit={mockHandleEdit}
			/>
		);

		const editButton = screen.getByText('Edit');
		fireEvent.click(editButton);

		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);

		expect(screen.getByText('Test Task')).toBeInTheDocument();
		expect(screen.queryByDisplayValue('Test Task')).not.toBeInTheDocument();
	});

	it('should apply edit mode', () => {
		render(
			<EditableInput
				item={mockItem}
				handleDelete={mockHandleDelete}
				handleEdit={mockHandleEdit}
			/>
		);

		const editButton = screen.getByText('Edit');
		fireEvent.click(editButton);

		const input = screen.getByDisplayValue('Test Task');
		fireEvent.change(input, { target: { value: 'Updated Task' } });

		const applyButton = screen.getByText('Apply');
		fireEvent.click(applyButton);

		expect(mockHandleEdit).toHaveBeenCalledWith(mockItem.id, 'Updated Task');
		expect(screen.getByText('Updated Task')).toBeInTheDocument();
	});

	it('should delete item', () => {
		render(
			<EditableInput
				item={mockItem}
				handleDelete={mockHandleDelete}
				handleEdit={mockHandleEdit}
			/>
		);

		const deleteButton = screen.getByText('Delete');
		fireEvent.click(deleteButton);

		expect(mockHandleDelete).toHaveBeenCalledWith(mockItem.id);
	});

	it('should only render Edit and Delete buttons initially', () => {
		render(
			<EditableInput
				item={mockItem}
				handleDelete={mockHandleDelete}
				handleEdit={mockHandleEdit}
			/>
		);

		expect(screen.getByText('Edit')).toBeInTheDocument();
		expect(screen.getByText('Delete')).toBeInTheDocument();
		expect(screen.queryByText('Apply')).not.toBeInTheDocument();
		expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
	});
});
