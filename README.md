# Ragnarok Online MVP Timer

Une application pour suivre et gérer les MVP dans Ragnarok Online.

Télécharger la dernière version pour Windows [ici](https://github.com/TekiDev42/ragnarok-mvp-tracker/releases/)

## Fonctionnalités

- **Suivi des MVP**
  - Timer précis pour chaque MVP
  - Notification sonore à la fin du timer
  - Localisation de la tombe sur la carte
  - Affichage des drops normaux et MVP drops
  - Affichage de la race et de l'élement
  - Taux de drop personnalisables
  - Partage des timers avec les membres connectés et du même groupe.

- **Gestion des favoris**
  - Marquez vos MVP préférés

## Utilisation

1. **Timer MVP**
   - Sélectionnez un MVP dans la liste
   - Démarrez le timer après avoir tué le MVP
   - Recevez une notification sonore quand le MVP peut réapparaître
   - Visualisez l'emplacement de la tombe sur la carte

2. **Drops**
   - Consultez la liste complète des drops possibles
   - Visualisez les taux de drop
   - Personnalisez les rates selon votre serveur

3. **Favoris**
   - Ajoutez des MVP à vos favoris
   - Accédez rapidement à vos MVP favoris depuis l'onglet dédié (TODO)

3. **Stats**
   - Race et élement visible rapidement
   - Voir les statistiques

## Installation
1. **Téléchargement**
   - Clonez le dépôt : `git clone https://github.com/votre-nom/ro-mvp-timer.git`
   - Ou téléchargez directement le ZIP depuis GitHub

2. **Installation des dépendances**
   ```bash
   cd ragnarok-mvp-timer
   npm install / bun install / pnpm install
   
   ```

3. **Lancement**
   ```bash
   npm run dev / bun run dev / pnpm run dev
   ```
   L'application sera accessible à l'adresse `http://localhost:3000`

4. **Build (optionnel)**
   Pour créer une version de production :
   ```bash
   npm run build / bun run build / pnpm run build
   ```
5. **ENV**
   Créer un .env avec vos clés SUPABASE :
   ```
   VITE_SUPABASE_URL=https://exemple.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_anon_key_ici
   ```


## Contribueurs
- [MrKitey](https://github.com/TekiDev42)