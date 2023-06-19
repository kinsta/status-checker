import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/service/:slug" element={<Service />} />
			</Routes>
		</>
	);
};

export default App;
