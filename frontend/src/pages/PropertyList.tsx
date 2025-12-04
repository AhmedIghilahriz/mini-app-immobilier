import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Property } from '../services/api.service';
import { propertyAPI } from '../services/api.service';
import { PropertyCard } from '../components/PropertyCard';
import './PropertyList.css';
import { Loader } from '../components/Loader';

export const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAll();
      setProperties(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des biens');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

if (loading) return <Loader />;
if (error) return <div className="error">{error}</div>;

  return (
    <div className="property-list-container">
      <div className="header">
        <h1>Biens Immobiliers</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/create')}
        >
          + Créer une annonce
        </button>
      </div>

      <div className="property-grid">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            onView={() => navigate(`/properties/${property.id}`)}
            onEdit={() => navigate(`/properties/${property.id}/edit`)}
          />
        ))}
      </div>

      {properties.length === 0 && (
        <div className="empty-state">
          <p>Aucun bien immobilier disponible</p>
        </div>
      )}
    </div>
  );
};