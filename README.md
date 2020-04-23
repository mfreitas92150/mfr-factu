# mfr-factu

Outil de Facturation

## Fonctionnalités

### Factures
* Liste facures
  - Filtrable
  - Paginable
  - Accès Facture PDF
* Création 
  - client
  - produit (manuel ou dans liste de produit)
  - Pointer fichier PDF ou generation
* Modification si pas valider et pdf generé
* Consultation
  - Détails de la facture
  - Accès au PDF

### Client

### Produit

### Info perso
* SIREN, SIRET, N.TVA
* Adresse siège

## Lancement en local

### MongoDB
docker run -p 27017:27017 --name mfr-factu-mongo -d mongo --serviceExecutor adaptive
ou 
docker start mfr-factu-mongo

### Backend
cd server
npm install
npm start

### Front
cd client
npm install
npm start