import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { propertyAPI } from '../services/api.service';
import type { CreatePropertyDTO } from '../services/api.service';
import './PropertyForm.css';

export const PropertyForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CreatePropertyDTO>({
    title: '',
    city: '',
    price: 0,
    surface: 0,
    description: '',
    type: 'vente',
    images: []
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (isEditMode && id) loadProperty(id);
  }, [id, isEditMode]);

  const loadProperty = async (propertyId: string) => {
    try {
      const response = await propertyAPI.getById(propertyId);
      const { id: _, createdAt, ...data } = response.data;
      setFormData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors([]);
  setLoading(true);

  try {
    if (isEditMode && id) {
      await propertyAPI.update(id, formData);
      console.log('✅ Bien modifié avec succès');
    } else {
      await propertyAPI.create(formData);
      console.log('✅ Bien créé avec succès');
    }
    // ✅ Redirection immédiate après succès
    navigate('/', { replace: true });
  } catch (err: any) {
    console.error('❌ Erreur:', err);
    const errorMessages = err.response?.data?.error || ['Une erreur est survenue'];
    setErrors(Array.isArray(errorMessages) ? errorMessages.map((e: any) => e.message) : [errorMessages]);
  } finally {
    setLoading(false);
  }
};

  // Conversion fichier en Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Upload de fichiers (input ou drag & drop)
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} n'est pas une image valide`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} est trop volumineux (max 5MB)`);
        continue;
      }

      try {
        const base64 = await convertToBase64(file);
        newImages.push(base64);
      } catch (error) {
        console.error('Erreur conversion:', error);
      }
    }

    setFormData({
      ...formData,
      images: [...formData.images, ...newImages]
    });
    setUploadingImage(false);
  };

  // Suppression d'une image
  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  // Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await handleFileUpload(files);
    }
  };

  // Clic sur la zone pour ouvrir sélecteur
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="property-form-container">
      <button onClick={() => navigate('/')} className="btn-back">
        ← Retour à la liste
      </button>

      <div className="property-form-card">
        <h1>{isEditMode ? 'Modifier le bien' : 'Créer une annonce'}</h1>

        {errors.length > 0 && (
          <div className="error-box">
            {errors.map((error, index) => (
              <p key={index}>⚠️ {error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Titre */}
          <div className="form-group">
            <label htmlFor="title">
              <span className="label-icon">🏠</span> Titre du bien *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Ex: Appartement T3 lumineux - Centre Ville"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Ville et Type */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">
                <span className="label-icon">📍</span> Ville *
              </label>
              <input
                id="city"
                type="text"
                placeholder="Ex: Paris"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">
                <span className="label-icon">🏷️</span> Type *
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as 'vente' | 'location' })}
              >
                <option value="vente">Vente</option>
                <option value="location">Location</option>
              </select>
            </div>
          </div>

          {/* Prix et Surface */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">
                <span className="label-icon">💰</span> Prix (€) *
              </label>
              <input
                id="price"
                type="number"
                placeholder="450000"
                value={formData.price || ''}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="surface">
                <span className="label-icon">📐</span> Surface (m²) *
              </label>
              <input
                id="surface"
                type="number"
                placeholder="65"
                value={formData.surface || ''}
                onChange={e => setFormData({ ...formData, surface: Number(e.target.value) })}
                required
                min="1"
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">
              <span className="label-icon">📝</span> Description
            </label>
            <textarea
              id="description"
              placeholder="Décrivez le bien : emplacement, équipements, points forts..."
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={5}
            />
          </div>

          {/* Images - Drag & Drop */}
          <div className="form-group">
            <label>
              <span className="label-icon">🖼️</span> Images du bien
            </label>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              style={{ display: 'none' }}
            />

            <div
              className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleClickUpload}
            >
              <div className="drop-zone-content">
                {uploadingImage ? (
                  <>
                    <span className="drop-icon">⏳</span>
                    <p>Chargement des images...</p>
                  </>
                ) : (
                  <>
                    <span className="drop-icon">📤</span>
                    <p><strong>Cliquez ici</strong> ou glissez-déposez vos images</p>
                    <p className="drop-hint">JPG, PNG, WebP • Max 5MB par image</p>
                  </>
                )}
              </div>
            </div>

            <small className="form-hint">
              💡 Vous pouvez aussi ajouter plusieurs images en même temps
            </small>
          </div>

          {/* Aperçu des images */}
          {formData.images.length > 0 && (
            <div className="images-preview">
              <p className="preview-title">📸 Images ajoutées ({formData.images.length})</p>
              <div className="images-grid">
                {formData.images.map((img, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={img} alt={`Aperçu ${index + 1}`} />
                    <button
                      type="button"
                      className="btn-remove-image"
                      onClick={() => handleRemoveImage(index)}
                      title="Supprimer cette image"
                    >
                      ✕
                    </button>
                    <span className="image-number">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="form-actions">
            <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading || uploadingImage}>
              {loading ? '⏳ Enregistrement...' : (isEditMode ? '✓ Mettre à jour' : '+ Créer l\'annonce')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};