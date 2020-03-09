# React-router

[React-router](https://reacttraining.com/react-router/web/guides/quick-start)

Utiliser la bibliothèque de composants React-Router pour faire une application dont le contenu va dépendre de l'état courant de la route __client__.

Afficher un menu de liens (__Link__) qui contient les éléments suivants :
 - `Home` : amène à la route '/'
 - `Clock` : amène à la route '/clock'
 - `Items` : amène à la route '/items'
 - `Grocery` : amène à la route '/grocery'

Pour chacune de ces routes, déclarer un composant __Route__ associé dans lequel rendre les composants issus des TP précédents (Clock, Liste d'items, Liste de courses). Chacun de ces composants doit être importé depuis un module qui lui est propre.

Vous remarquerez que l'état des listes est détruit à chaque fois que le composant correspondant quitte l'interface, et réinitialisé à chaque fois qu'il intègre à nouveau l'interface.

> Modifiez vos composants (items et courses) pour que leurs données soient sauvegardées dans le navigateur à chaque fois qu'elles sont modifiées, et restaurées au moment où le composant intègre l'interface.

Indices : `localStorage.getItem`, `localStorage.setItem`, `JSON.stringify`, `JSON.parse`

> Factoriser le code écrit dans un custom hook `usePersistedState` qui prend en paramètre la clé sous laquelle les données sont persistées ainsi que la valeur initiale, et qui a le même type de retour que le hook `useState` standard.
