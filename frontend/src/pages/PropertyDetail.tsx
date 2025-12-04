import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { propertyAPI } from '../services/api.service';
import type{ Property} from "../services/api.service";
import { ImageCarousel } from '../components/ImageCarousel';
import './PropertyDetail.css';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) loadProperty(id);
  }, [id]);

  const loadProperty = async (propertyId: string) => {
    try {
      const response = await propertyAPI.getById(propertyId);
      setProperty(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce bien ?');
    if (!confirmed) return;
    
    setDeleting(true);
    
    try {
      await propertyAPI.delete(id);
      console.log('✅ Bien supprimé avec succès');
      // ✅ Redirection immédiate après succès
      navigate('/', { replace: true });
    } catch (err: any) {
      console.error('❌ Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression. Vérifiez que le backend est démarré.');
      setDeleting(false);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (!property) return <div className="error">Bien non trouvé</div>;

  return (
    <div className="property-detail-container">
      <button onClick={() => navigate('/')} className="btn-back">
        ← Retour à la liste
      </button>

      <div className="property-detail-card">
        <div className="property-detail-image-section">
          <ImageCarousel images={property.images} alt={property.title} />
        </div>

        <div className="property-detail-header">
          <div>
            <span className="property-type">{property.type}</span>
            <h1>{property.title}</h1>
          </div>
          <div className="actions">
            <button 
              onClick={() => navigate(`/properties/${id}/edit`)}
              className="btn btn-secondary"
              disabled={deleting}
            >
              ✏️ Modifier
            </button>
            <button 
              onClick={handleDelete} 
              className="btn btn-danger"
              disabled={deleting}
            >
              {deleting ? '⏳ Suppression...' : '🗑️ Supprimer'}
            </button>
          </div>
        </div>

        <div className="property-detail-body">
          <div className="detail-row">
            <span className="label">📍 Ville</span>
            <span className="value">{property.city}</span>
          </div>
          <div className="detail-row">
            <span className="label">💰 Prix</span>
            <span className="value price">
              {property.price.toLocaleString('fr-FR')} €
              {property.type === 'location' && '/mois'}
            </span>
          </div>
          <div className="detail-row">
            <span className="label">📐 Surface</span>
            <span className="value">{property.surface} m²</span>
          </div>
          {property.description && (
            <div className="detail-row">
              <span className="label">📝 Description</span>
              <span className="value">{property.description}</span>
            </div>
          )}
          {property.images && property.images.length > 0 && (
            <div className="detail-row">
              <span className="label">🖼️ Nombre de photos</span>
              <span className="value">{property.images.length} photo(s)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};