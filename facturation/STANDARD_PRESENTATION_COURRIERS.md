# Standard de presentation des courriers

Ce document decrit le standard visuel actuellement applique au module `courrier-app.html`.

## Portee

Ce standard s'applique a tous les types de courriers rendus par la fonction commune `displayCourrier(courrier)` :

- `fiscal`
- `client`
- `relance`
- `administratif`
- `autre`

Il s'applique aussi aux courriers issus de modeles statiques ou dynamiques, car tous passent par le meme rendu HTML, la meme impression directe et la meme generation PDF.

## Source de verite

Les valeurs ci-dessous correspondent au rendu actuel defini dans :

- `courrier-app.html`
- bloc `displayCourrier(courrier)`
- regles `@page` de l'impression

## Parametres de page

- Format : `A4`
- Marges impression :
  - haut : `1 cm`
  - droite : `2 cm`
  - bas : `0,7 cm`
  - gauche : `2 cm`
- Police generale : `Inter, Arial, sans-serif`
- Couleur principale : `#1e3a8a`
- Couleur texte principal : `#1f2937`

## Structure generale

Le courrier imprime suit cet ordre :

1. En-tete cabinet
2. Trait de separation
3. Bloc destinataire
4. Bloc objet
5. Corps du courrier
6. Pieces jointes si presentes
7. Bloc signature
8. Pied de page

## Regles typographiques

### Cadre global

- Interligne global du rendu : `1.65`

### En-tete cabinet

- Titre `PRISMA GESTION`
  - taille : `1.5rem`
  - graisse : `700`
  - couleur : `#1e3a8a`
- Sous-titre `COMPTABILITE - FINANCE - FISCALITE`
  - taille : `0.78rem`
  - couleur : `#6b7280`
  - espacement des lettres : `0.17em`
- Informations cabinet
  - taille : `0.88rem`
  - interligne : `1.55`
  - couleur : `#4b5563`

### Bloc reference / date / statut

- Reference
  - taille : `0.95rem`
  - couleur : `#6b7280`
- Date
  - taille : `0.95rem`
  - couleur : `#6b7280`
- Badges de statut
  - taille : `0.78rem`
  - graisse : `700`
  - padding : `4px 10px`
  - rayon : `999px`

### Bloc destinataire

- Ligne `A l'attention de ...`
  - taille : `0.95rem`
  - graisse : `600`
  - espacement des lettres : `0.02em`
- Nom destinataire
  - taille : `1.08rem`
  - graisse : `700`
- Adresse destinataire
  - taille : `0.95rem`
  - couleur : `#4b5563`

Note :

- Si la civilite du client est connue, la ligne prend la forme `A l'attention de Madame` ou `A l'attention de Monsieur`.

### Bloc objet

- Taille : `14pt`
- Interligne : `1.45`
- Padding interne du bloc : `0.9rem 1.1rem`
- Fond : `#f0f9ff`
- Bordure gauche : `4px solid #1e3a8a`
- Rayon : `0 6px 6px 0`

### Corps du courrier

- Taille : `13.5pt`
- Interligne : `1.8`
- Alignement : `justify`

Gestion des paragraphes :

- Le texte est decoupe par paragraphes sur les lignes vides.
- Les retours a la ligne simples a l'interieur d'un paragraphe sont conserves.
- Espace entre paragraphes : `0.65rem`
- Le dernier paragraphe n'a pas de marge basse supplementaire.

### Pieces jointes

- Titre `Pieces jointes`
  - taille : `0.875rem`
  - graisse : `600`
- Liste
  - taille : `0.8rem`
  - couleur : `#4b5563`
  - retrait gauche : `1.5rem`

### Bloc signature

- Mention `Pour PRISMA GESTION`
  - graisse : `700`
  - couleur : `#1e3a8a`
- Nom signataire
  - graisse : `700`
- Titre signataire
  - taille : `0.8rem`
  - couleur : `#6b7280`
- Cachet
  - hauteur max : `70px`
- Signature image
  - hauteur max : `50px`

### Pied de page

- Taille : `0.7rem`
- Couleur : `#6b7280`
- Nom produit `PRISMA Manager`
  - graisse : `600`
  - couleur : `#1e3a8a`

## Espacements verticaux actuels

### Entre grands blocs

- Bas en-tete cabinet : `1.15rem`
- Bas trait de separation : `0.85rem`
- Bas bloc destinataire : `1.05rem`
- Bas bloc objet : `0.95rem`
- Bas corps du courrier : `1rem`
- Haut bloc pieces jointes : `1rem`
- Haut bloc signature : `1.65rem`
- Haut pied de page : `0.95rem`

### Espacements internes

- Haut informations cabinet : `0.65rem`
- Bas reference : `0.45rem`
- Bas date : `0.75rem`
- Bas ligne `A l'attention de ...` : `0.2rem`
- Haut adresse destinataire : `0.1rem`
- Haut separation pieces jointes : `0.65rem`
- Haut separation signature : `0.5rem`
- Haut separation pied de page : `0.4rem`

## Impression et export

- Impression directe sans nouvelle fenetre
- Le contenu imprime est celui du conteneur `#printArea`
- Le PDF est genere a partir du meme rendu visuel

Consequence :

- Toute modification de presentation dans `displayCourrier(courrier)` s'applique a tous les types de courriers, a l'impression et a l'export PDF.

## Regle de maintenance

Si la presentation doit evoluer, il faut mettre a jour :

1. Le rendu HTML genere dans `displayCourrier(courrier)`
2. Les marges `@page` du style d'impression global
3. Les marges `@page` du style injecte par `printCourrier()`
4. Ce document Markdown
