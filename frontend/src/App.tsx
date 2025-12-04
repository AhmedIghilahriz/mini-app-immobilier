import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PropertyList } from './pages/PropertyList';
import { PropertyDetail } from './pages/PropertyDetail';
import { PropertyForm } from './pages/PropertyForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/create" element={<PropertyForm />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/properties/:id/edit" element={<PropertyForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;