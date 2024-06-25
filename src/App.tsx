import { ToDo } from './components/to-do/ToDo';

function App() {
	return (
		<main
			style={{
				display: 'flex',
				justifyContent: 'center',
				width: '100vw',
				height: '100vh',
			}}
		>
			<ToDo />
		</main>
	);
}

export default App;
