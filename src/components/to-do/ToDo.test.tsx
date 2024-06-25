import { describe, expect, it } from 'vitest';
import { ToDo } from './ToDo';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ToDo', () => {
	it('should render initial components', () => {
		render(<ToDo />);
		expect(screen.getByPlaceholderText('Type your task')).toBeInTheDocument();
		expect(screen.getByText('Submit')).toBeInTheDocument();
	});

	it('should add a new task', () => {
		render(<ToDo />);
		const input = screen.getByPlaceholderText('Type your task');
		const button = screen.getByText('Submit');

		fireEvent.change(input, { target: { value: 'New Task' } });
		fireEvent.click(button);

		expect(screen.getByText('New Task')).toBeInTheDocument();
	});

	it('should not add an empty task', () => {
		render(<ToDo />);
		const button = screen.getByText('Submit');
		expect(button).toBeDisabled();
	});

	it('should enable submit button when input is not empty', () => {
		render(<ToDo />);
		const input = screen.getByPlaceholderText('Type your task');
		const button = screen.getByText('Submit');

		fireEvent.change(input, { target: { value: 'Task' } });
		expect(button).not.toBeDisabled();

		fireEvent.change(input, { target: { value: '' } });
		expect(button).toBeDisabled();
	});

	it('should delete a task', () => {
		render(<ToDo />);
		const input = screen.getByPlaceholderText('Type your task');
		const button = screen.getByText('Submit');

		fireEvent.change(input, { target: { value: 'Task to be deleted' } });
		fireEvent.click(button);

		expect(screen.getByText('Task to be deleted')).toBeInTheDocument();

		const deleteButton = screen.getByText('Delete');
		fireEvent.click(deleteButton);

		expect(screen.queryByText('Task to be deleted')).not.toBeInTheDocument();
	});

	it('should edit a task', () => {
		render(<ToDo />);
		const input = screen.getByPlaceholderText('Type your task');
		const button = screen.getByText('Submit');

		fireEvent.change(input, { target: { value: 'Task to be edited' } });
		fireEvent.click(button);

		expect(screen.getByText('Task to be edited')).toBeInTheDocument();

		const editButton = screen.getByText('Edit');
		fireEvent.click(editButton);

		const editableInput = screen.getByDisplayValue('Task to be edited');
		fireEvent.change(editableInput, { target: { value: 'Edited Task' } });

		const applyButton = screen.getByText('Apply');
		fireEvent.click(applyButton);

		expect(screen.getByText('Edited Task')).toBeInTheDocument();
		expect(screen.queryByText('Task to be edited')).not.toBeInTheDocument();
	});

	it('should cancel edit task', () => {
		render(<ToDo />);
		const input = screen.getByPlaceholderText('Type your task');
		const button = screen.getByText('Submit');

		fireEvent.change(input, { target: { value: 'Task to be canceled' } });
		fireEvent.click(button);

		expect(screen.getByText('Task to be canceled')).toBeInTheDocument();

		const editButton = screen.getByText('Edit');
		fireEvent.click(editButton);

		const editableInput = screen.getByDisplayValue('Task to be canceled');
		fireEvent.change(editableInput, { target: { value: 'Canceled Edit' } });

		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);

		expect(screen.getByText('Task to be canceled')).toBeInTheDocument();
		expect(screen.queryByText('Canceled Edit')).not.toBeInTheDocument();
	});
});
