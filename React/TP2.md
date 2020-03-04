# Items List

L'objectif est d'écrire une application dans laquelle :
 - on visualise une liste d'items (texte)
 - chaque item peut être supprimé grâce à un bouton
 - un formulaire permet de rajouter un nouvel item

> Ecrire les composants suivants :

>  - `ItemsApp` :
>    - possède dans son `state` un tableau de chaînes `items`.
>    - dispose d'une fonction `addItem` qui reçoit une chaîne et remplace le tableau `items` par un tableau contenant le nouvel item en plus des anciens items
>    - dispose d'une fonction `removeItem` qui reçoit un nombre et remplace le tableau `items` par un tableau contenant les anciens items sauf celui dont l'index correspond au nombre reçu
>    - retourne une interface composée d'un `AddItemForm` et d'une `ItemsList`. Le composant `AddItemForm` reçoit une prop `addItem` à laquelle on affecte la fonction `addItem`; le composant `ItemsList` reçoit une prop `items` à laquelle on affecte le tableau `items` du state, et une prop `removeItem` à laquelle on affecte la fonction `removeItem`

>  - `ItemsList` :
>    - props : tableau `items` (tableau de chaînes), fonction `removeItem`
>    - retourne une interface composée d'une liste d'éléments; pour chaque item, on affiche son texte ainsi qu'un bouton dont l'événement `onClick` appelle la fonction `removeItem` en lui passant l'index de l'élément dans le tableau

>  - `AddItemForm` :
>    - props : fonction `addItem`
>    - possède dans son state une chaîne `currentText`
>    - retourne une interface composée d'un formulaire contenant un input et un bouton de validation; l'input est contrôlé et lié à la valeur `currentText` du state; à la soumission du formulaire, la fonction `addItem` est appelée en lui passant la valeur de `currentText` puis l'input est vidé
