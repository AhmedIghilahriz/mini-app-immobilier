# 🏠 Mini Application Immobilière

Application de gestion d'annonces immobilières développée avec **React** (TypeScript) et **Fastify**, avec upload d'images et carousel.

> 💻 Démo en ligne :  
>  Interface utilisateur : https://calm-taffy-0c825a.netlify.app  
> API : https://mini-app-immobilier-deploy.onrender.com/api/properties
> ⚠️ **Petite info** :
> ⏳ Le premier chargement peut donc prendre 30 secondes à 1 minute 30, c’est totalement normal car :
> Le backend tourne sur une instance gratuite de [![Render free instance](https://img.shields.io/badge/Render-Free_Instance-46bd92?style=flat&logo=render)](https://render.com)
>  Merci pour votre patience, c’est le prix du gratuit 😄
<img width="780" height="45" alt="image" src="https://github.com/user-attachments/assets/36bd17a7-260b-4ebb-8744-7cd771cfba44" />

 
---

## 🚀 Lancement du projet

### Prérequis
- Node.js 18+
- npm ou yarn

### Backend
```bash
cd backend
npm install
npm run dev
```
Le serveur démarre sur **http://localhost:3000**

### Frontend
```bash
cd frontend
npm install
npm run dev
```
L'interface démarre sur **http://localhost:5173**

---

## 🏗️ Architecture choisie

### Backend (Fastify + TypeScript)
```
backend/src/
├── routes/          # Endpoints API (gestion HTTP)
├── services/        # Logique métier (CRUD)
├── schemas/         # Validation Zod
├── types/           # Interfaces TypeScript
└── server.ts        # Point d'entrée
```

**Pourquoi cette architecture ?**

✅ **Séparation des responsabilités** : 
- Les **routes** gèrent uniquement le HTTP (req/res)
- Les **services** contiennent la logique métier réutilisable
- Les **schemas** assurent la validation avec Zod

✅ **Scalabilité** : 
- Facile d'ajouter de nouvelles ressources (ex: utilisateurs, visites)
- Chaque couche est indépendante et testable
- Architecture prête pour une migration vers une vraie BDD

✅ **Type-safety** : 
- Zod génère automatiquement les types TypeScript
- Validation runtime + compile-time
- DTO clairement définis

---

### Frontend (React + TypeScript)
```
frontend/src/
├── components/      # Composants réutilisables (Card, Carousel)
├── pages/           # Pages principales (List, Detail, Form)
├── services/        # Appels API centralisés
└── App.tsx          # Router
```

**Pourquoi cette architecture ?**

✅ **Composants atomiques** :
- `ImageCarousel` : réutilisable pour d'autres ressources
- `PropertyCard` : découplé de la logique métier

✅ **Service API centralisé** :
- Un seul point de modification si l'URL change
- Typage strict des requêtes/réponses

✅ **Structure claire** :
- Facile de retrouver où est le code
- Prêt pour ajouter un state manager (Zustand/Redux)

---

## ✨ Fonctionnalités implémentées

### CRUD complet
- ✅ Liste des biens avec cards + carousel
- ✅ Détail d'un bien avec grandes images
- ✅ Création d'annonces
- ✅ Modification d'annonces
- ✅ Suppression d'annonces

### Bonus ajoutés
- 🎨 **Carousel d'images** : Navigation avec chevrons + dots
- 📤 **Upload d'images** : Drag & drop + sélection fichiers
- 🖼️ **Aperçu temps réel** des images uploadées
- 📱 **Responsive design**
- ✨ **Animations** : Hover effects, transitions fluides
- ⚡ **Validation Zod** côté backend

---

## 🔮 Améliorations futures (si plus de temps)

### Backend
- [ ] **Base de données** : PostgreSQL + Prisma ORM
- [ ] **Authentification** : JWT + refresh tokens
- [ ] **Upload réel** : Intégration Cloudinary/AWS S3
- [ ] **Pagination** : Limiter les résultats (ex: 20 par page)
- [ ] **Filtres avancés** : Par prix, surface, ville, type
- [ ] **Tests** : Vitest + Supertest
- [ ] **Docker** : Containerisation

### Frontend
- [ ] **State manager** : Zustand pour le cache
- [ ] **React Query** : Optimistic updates, cache intelligent
- [ ] **Recherche** : Barre de recherche avec debounce
- [ ] **Favoris** : Sauvegarder les biens préférés
- [ ] **Maps** : Afficher la localisation (Mapbox/Leaflet)
- [ ] **Tests** : React Testing Library
- [ ] **Animations avancées** : Framer Motion

### DevOps
- [ ] **CI/CD** : GitHub Actions
- [ ] **Monitoring** : Sentry pour les erreurs
- [ ] **Variables d'environnement** : .env pour config
- [ ] **SSL** : HTTPS en production

---

## 🛠️ Stack technique

**Backend** :
- Fastify (serveur HTTP rapide)
- TypeScript (typage strict)
- Zod (validation runtime)
- UUID (génération d'IDs uniques)

**Frontend** :
- React 18 (UI library)
- TypeScript (typage strict)
- Vite (bundler rapide)
- React Router (navigation)
- Axios (requêtes HTTP)

---

## 📊 Choix techniques justifiés

### Pourquoi Fastify ?
- ⚡ **Très performant** (3x plus rapide qu'Express)
- 🔌 **Plugins natifs** (CORS, validation)
- 📘 **TypeScript first** : excellent support

### Pourquoi Zod ?
- ✅ **Validation + types** : un seul schéma pour les deux
- 🛡️ **Sécurité** : validation côté serveur obligatoire
- 🔄 **Sync backend/frontend** : types partagés

### Pourquoi cette structure de dossiers ?
- 📦 **Modularité** : Chaque fichier a un rôle unique
- 🧪 **Testabilité** : Services isolés = faciles à tester
- 🚀 **Évolutivité** : Peut grandir sans refactoring majeur

---

## 📧 Contact

Ahmed Ighilahriz
- Email : Ahmed.ighilahriz29@gmail.com
- Linkedin: https://www.linkedin.com/in/ahmed-ighilahriz-9b4a04168/


---
