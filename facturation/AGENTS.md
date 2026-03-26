# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Vue d'ensemble

PRISMA GESTION est une application web de gestion commerciale pour un cabinet de comptabilité/fiscalité au Cameroun. L'application est entièrement frontend (HTML/JavaScript) sans serveur backend, utilisant localStorage pour la persistance des données.

## Architecture

### Stack technique
- **HTML5** avec JavaScript vanilla
- **TailwindCSS** (via CDN) pour le styling
- **jsPDF** et **html2canvas** (via CDN) pour la génération de PDF
- **localStorage** pour la persistance des données

### Structure des modules

| Fichier | Module | Description |
|---------|--------|-------------|
| `index.html` | Page d'accueil | Menu principal avec statistiques globales |
| `clients.html` | Gestion Clients | CRUD clients (PM/PP, NIU, CDI) |
| `contrats.html` | Gestion Contrats | Contrats liés aux clients |
| `facture-app.html` | Factures | Création de factures avec classification Impôt/Honoraire |
| `avance-app.html` | Propositions | Propositions de paiement (Impôts + Honoraires) |
| `recu-app.html` | Reçus | Reçus de paiement avec conversion montant en lettres |
| `note-app.html` | Notes explicatives | Notes détaillant la composition des factures |
| `situation-app.html` | Situation client | Vue consolidée avec situation Cabinet et Fiscale |
| `courrier-app.html` | Gestion Courrier | Courriers fiscaux, clients, relances avec modèles prédéfinis |

**Module prévu (non implémenté)** : `devis.html` - Gestion des devis (affiché comme "en développement" sur index.html)

### Flux de données (localStorage)

```
clients → contrats → factures → recus
                  ↘ propositions
                  ↘ notes
```

**Clés localStorage utilisées :**
- `clients` : tableau des clients
- `contrats` : tableau des contrats
- `factures` : tableau des factures
- `recus` : tableau des reçus de paiement
- `propositions` : tableau des propositions de paiement
- `notes` : tableau des notes explicatives
- `courriers` : tableau des courriers (fiscaux, clients, administratifs)
- `attestations` : objet indexé par nom client avec dates ACF et ATTIM
- `prestationRealizationStatus` : objet indexé par uniqueId de prestation (statut: À faire, En cours, Effectué)
- `dossierFiscalStatus` : objet indexé par nom client avec statut des documents fiscaux par année
- `paiementsImpotsDirects` : objet indexé par nom client avec mode de paiement des impôts (non_paye, cabinet, client_direct)

### Pattern commun dans chaque module

1. `loadClientSelect()` - Charge la liste des clients dans un `<select>`
2. `loadXxx()` - Charge et affiche les données depuis localStorage
3. `saveXxx()` - Sauvegarde via `localStorage.setItem()`
4. `generateXxx()` / `displayXxx()` - Génère l'aperçu imprimable
5. `downloadPDF()` - Export PDF via html2canvas + jsPDF

### Particularités métier

- **Classification Impôt/Honoraire** : Distinction systématique entre obligations fiscales et prestations intellectuelles
- **Monnaie** : F CFA (formatage via `toLocaleString('fr-FR')`)
- **Numérotation** : Auto-incrémentation (ex: `N° 0001/2026/01`, `RECU-0001/2026`)
- **KPIs fiscaux** : DARP, IGS, DSF, Patentes, FANR Harmony2 (termes fiscaux camerounais)

### Impôts immobiliers (calcul automatique)

Les clients peuvent avoir un statut immobilier (Locataire, Propriétaire, ou les deux) avec calcul automatique des impôts :

| Impôt | Taux | Applicable à | Base de calcul |
|-------|------|--------------|----------------|
| **PSL** (Précompte sur Loyer) | 10% | Locataires (sauf OBNL/Non Pro) | Loyer annuel |
| **Bail** (Bail Commercial) | 10% ou 5%* | Locataires | Loyer annuel |
| **TF** (Taxe Foncière) | 0,1% | Propriétaires | Valeur du bien |

*Le Bail est de **5%** pour les OBNL et Non Professionnels, **10%** pour les autres régimes.

**Champs client concernés :**
- `statutImmo` : "Locataire", "Proprietaire", "Les deux", ou vide
- `loyerMensuel` : montant du loyer mensuel saisi (F CFA)
- `loyerAnnuel` : calculé automatiquement (`loyerMensuel × 12`)
- `valeurBien` : valeur de l'immeuble ou terrain (F CFA)
- `psl`, `bail`, `tf` : montants calculés automatiquement

**Fonctionnalités :**
- Affichage en temps réel des impôts calculés dans le formulaire client
- Badges PSL/Bail/TF dans la liste des clients
- KPIs dédiés dans la page d'accueil
- Boutons d'ajout rapide dans le formulaire de facture

### Situation fiscale (IGS & Patente)

Chaque client peut avoir un régime d'imposition avec calcul automatique des impôts :

**Régimes disponibles :**
- **IGS** (Impôt Général Synthétique) : Pour CA < 50 000 000 F CFA
- **Réel** (Patente) : Pour CA ≥ 50 000 000 F CFA ou sur option
- **Non Professionnel** : Revenus non professionnels (pas soumis à IGS/Patente, Bail à 5%)
- **OBNL** : Organismes à But Non Lucratif (pas soumis à IGS/Patente, Bail à 5%)

**Barème IGS (Article C 40 LPF) :**

| Classe | Chiffre d'affaires | Montant |
|--------|-------------------|---------|
| 1 | < 500 000 | 20 000 |
| 2 | 500 000 - 999 999 | 30 000 |
| 3 | 1 000 000 - 1 499 999 | 40 000 |
| 4 | 1 500 000 - 1 999 999 | 50 000 |
| 5 | 2 000 000 - 2 499 999 | 60 000 |
| 6 | 2 500 000 - 4 999 999 | 150 000 |
| 7 | 5 000 000 - 9 999 999 | 300 000 |
| 8 | 10 000 000 - 19 999 999 | 500 000 |
| 9 | 20 000 000 - 29 999 999 | 1 000 000 |
| 10 | 30 000 000 - 49 999 999 | 2 000 000 |

**Avantage CGA :** Réduction de 50% pour les adhérents à un Centre de Gestion Agréé

**Barème Patente (Moyennes Entreprises) :**
- Taux : **0,283%** du chiffre d'affaires
- Plancher : **141 500 F CFA** (minimum)
- Plafond : **4 500 000 F CFA** (maximum)

**Champs client concernés :**
- `regimeFiscal` : "IGS", "Reel", "NonPro", "OBNL"
- `chiffreAffaires` : CA de l'année passée ou prévisionnel
- `isCGA` : booléen (adhérent CGA)
- `igs`, `igsClasse`, `patente` : montants calculés automatiquement

### Module Situation Client (`situation-app.html`)

Le module situation offre une vue consolidée par client avec plusieurs sections :

**Sections disponibles :**
- **Rapport d'Échéances** : Vue synthétique des impôts et honoraires impayés avec :
  - Statistiques (en retard, à payer)
  - Liste détaillée avec échéances et statut (EN RETARD, URGENT, jours restants)
  - Génération PDF du rapport
- **Dossier Fiscal Annuel** : Tous les impôts facturés (prestations de type "Impôt") avec :
  - Mode de paiement (Non payé / Via Cabinet / Payé par client)
  - Statut de réalisation (À faire / En cours / Effectué)
  - Documents associés (avis, reçus, quittances)
- **Honoraires Cabinet** : Uniquement les prestations de type "Honoraire" avec état de paiement et de réalisation
- **Historique des factures** : Liste des factures avec statut calculé automatiquement
- **Historique des paiements** : Liste des reçus de paiement
- **Suivi des Attestations** : Gestion des dates ACF (90 jours) et ATTIM (30 jours) avec alertes d'expiration

**Types de vue :**
- `globale` : Affiche toutes les sections
- `cabinet` : Affiche uniquement factures, paiements et prestations
- `fiscale` : Affiche uniquement dossier fiscal et attestations

**Calcul automatique des statuts de paiement :**
Les paiements (reçus) sont appliqués aux factures chronologiquement, avec distinction Impôts/Honoraires. Le statut de chaque facture est calculé dynamiquement (émise, partielle, payée).

**Modes de paiement des impôts :**
Pour chaque impôt, trois modes de paiement sont possibles :
- `non_paye` : Impôt non encore réglé
- `cabinet` : Impôt payé par le cabinet pour le compte du client (avec référence reçu)
- `client_direct` : Le client a payé directement ses impôts (avec date, référence quittance, commentaire)

### Échéances fiscales

| Obligation | Échéance | Mode de paiement |
|------------|----------|------------------|
| **IGS** | 15 Janvier, 15 Mars, 15 Juillet, 15 Octobre | Trimestriel ou annuel |
| **PSL** | 15 Janvier, 15 Mars, 15 Juillet, 15 Octobre | Trimestriel ou annuel |
| **Patente** | 28 Février | Annuel (unique) |
| **Bail Commercial** | Annuel | Paiement unique |
| **Taxe Foncière (TF)** | Annuel | Paiement unique |
| **DSF** | 15 Mars | Déclaration annuelle |
| **DARP** | 30 Juin | Déclaration annuelle |
| **DBEF** | 30 Juin | Déclaration annuelle |

**Constante JavaScript :**
```javascript
const ECHEANCES_TRIMESTRIELLES = [
    { trimestre: 1, date: '15 Janvier' },
    { trimestre: 2, date: '15 Mars' },
    { trimestre: 3, date: '15 Juillet' },
    { trimestre: 4, date: '15 Octobre' }
];
```

## Développement

### Exécution
Ouvrir directement `index.html` dans un navigateur (aucun serveur requis).

### Ajout d'un nouveau module
1. Créer un fichier HTML avec la structure standard (nav, formulaire, zone d'aperçu)
2. Inclure TailwindCSS, jsPDF et html2canvas via CDN
3. Ajouter le lien dans `index.html`
4. Utiliser le même pattern localStorage que les autres modules

### Styles CSS
- Police : Inter (Google Fonts)
- Couleur principale : `#1e3a8a` (blue-900)
- Classes d'impression : `.no-print`, `.print-area`

---

## Système d'impression directe (OBLIGATOIRE)

Dans **toutes les applications** (anciennes et nouvelles), l'impression doit se faire **directement** en ouvrant le menu d'impression du navigateur, **sans ouvrir une nouvelle fenêtre ou un nouvel onglet**.

### Principe

Remplacer `window.open('', '_blank')` par le mécanisme suivant :

1. Créer un `<style>` temporaire avec les CSS d'impression et l'injecter dans `document.head`
2. Sauvegarder le contenu actuel : `const originalContent = document.body.innerHTML`
3. Remplacer le body par le contenu à imprimer : `document.body.innerHTML = bodyContent`
4. Déclencher l'impression : `window.print()`
5. Restaurer le body : `document.body.innerHTML = originalContent`
6. Supprimer le style temporaire : `document.getElementById('xxx-print-style').remove()`
7. Réinitialiser les événements : `init()`

### Modèle de référence

```javascript
function printQuelqueChose() {
    // 1. Style temporaire injecté dans <head>
    const printStyle = document.createElement('style');
    printStyle.id = 'xxx-print-style';
    printStyle.textContent = `
        @page { size: A4; margin: 1.5cm; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { font-family: Arial, sans-serif !important; margin: 0 !important; padding: 0 !important; }
        /* ... autres styles avec préfixe unique pour éviter les conflits ... */
    `;
    document.head.appendChild(printStyle);

    // 2. Contenu à imprimer (body uniquement, sans <html><head><body>)
    const bodyContent = `
        <div class="xxx-print-header">...</div>
    `;

    // 3. Remplacement temporaire + impression directe
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = bodyContent;
    window.print();

    // 4. Restauration
    document.body.innerHTML = originalContent;
    document.getElementById('xxx-print-style').remove();
    init();
}
```

### Règles importantes

- **Ne jamais utiliser** `window.open('', '_blank')` ni `window.open('', '', 'width=...,height=...')` pour l'impression
- Le contenu passé à `document.body.innerHTML` ne doit contenir **que le body** (pas de `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`)
- Les classes CSS du style temporaire doivent avoir un **préfixe unique** (ex: `teams-`, `dc82-`, `rpt-`) pour éviter les conflits avec les styles existants de la page
- Si la page possède une règle `@media print { body { display: none; } }`, l'ajouter en override dans le style temporaire : `@media print { body { display: block !important; } }`
- Toujours appeler `init()` après restauration pour réattacher les événements
