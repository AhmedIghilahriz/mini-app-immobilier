import React from 'react';
import type { Property } from '../services/api.service';
import { ImageCarousel } from './ImageCarousel';
import './PropertyCard.css';

interface Props {
  property: Property;
  onView: () => void;
  onEdit: () => void;
}

export const PropertyCard: React.FC<Props> = ({ property, onView, onEdit }) => {
  return (
    <div className="property-card">
      <ImageCarousel images={property.images} alt={property.title} />
      
      <div className="property-card-content">
        <div className="property-card-header">
          <span className="property-type">{property.type}</span>
          <h3>{property.title}</h3>
        </div>
        
        <div className="property-card-body">
          <p className="property-city">📍 {property.city}</p>
          <p className="property-price">
            {property.price.toLocaleString('fr-FR')} €
            {property.type === 'location' && '/mois'}
          </p>
          <p className="property-surface">{property.surface} m²</p>
        </div>
        
        <div className="property-card-actions">
          <button onClick={onView} className="btn btn-primary">
            Voir
          </button>
          <button onClick={onEdit} className="btn btn-secondary">
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};