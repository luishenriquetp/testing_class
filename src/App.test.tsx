import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
	it('renders ToDo component', () => {
		render(<App />);
		expect(screen.getByText('Todo List')).toBeInTheDocument();
	});
});
