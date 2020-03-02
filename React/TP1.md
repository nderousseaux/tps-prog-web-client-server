Démarrage
===

Afin d'initialiser un dossier `tp1` contenant l'ensemble des outils nécessaires, vous pouvez utiliser le module `create-react-app` (https://create-react-app.dev/) :
```
npx create-react-app tp1
```

Toggle
===

Ecrire un composant `Toggle` qui stocke une valeur boolénne, affiche sa valeur courante ainsi qu'un bouton permettant de la modifier.

Counter
===

Ecrire un composant `Counter` qui stocke une valeur entière, affiche sa valeur courante ainsi qu'un bouton permettant de l'incrémenter.

Question
--

Comment faire pour compter et afficher le nombre de fois que la valeur du `Toggle` est passée à `true` ?

Clock
===

Ecrire un composant `Clock` qui affiche l'heure (hh:mm:ss) courante.
Le composant ne reçoit pas de propriété d'entrée et est autonome pour son rafraichissement régulier.

Extraire la logique de l'horloge dans un custom hook `useClock`.

Dans l'application principale, déclarer un composant `Clock` ainsi qu'une checkbox indiquant si oui ou non le composant Clock doit être rendu.
