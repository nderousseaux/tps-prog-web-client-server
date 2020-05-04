# Dialogue avec une API

Lorsqu'une application dialogue avec une API sur un serveur distant via une requête HTTP, les données ne sont pas disponibles immédiatement.
C'est pour cela que l'on utilise des requêtes dites `asynchrones`.
Comme on l'a vu avec la communication entre le serveur HTTP et le serveur de base de données, la gestion et la configuration de l'exécution asynchrone va être réalisé par l'intermédiaire d'objets `Promise`.

La fonction `fetch` permet de réaliser une requête HTTP et retourne une `Promise` qui est résolue au moment de l'arrivée d'une réponse.

Utilisation :
```js
fetch(someURL)
.then(response => {
	return response.json(); // pour interpréter le corps de la réponse au format JSON (retourne une nouvelle Promise)
})
.then(data => {
	console.log('data : ', data)
})
.catch(err => {
	console.log(err.message);
});
```

La `Promise` est résolue quel que soit le statut HTTP de la réponse.
Ce n'est qu'en cas d'absence de réponse ou de problème de connexion que la Promise est rejetée.
Si on souhaite faire échouer la chaîne de traitements en cas de statut autre que 2xx, on peut intercaler une première fonction telle que celle indiquée ci-dessous :

```js
fetch(someURL)
.then(response => {
	if (response.ok) {
		return response;
	} else {
		return response.text()
		.then((text) => {
			throw new Error(text);
		});
	}
})
.then(response => {
	return response.json();
})
.then(data => {
	console.log('data : ', data)
})
.catch(err => {
	console.log(err.message);
});
```

Un composant peut déclencher la récupération de données auprès d'une API avec un `useEffect`.
Il faut cependant garder en tête que lors de la première évaluation du composant, la réponse de la requête ne sera pas encore arrivée. Afin d'éviter d'afficher l'interface dans un état intermédiaire erroné, on pourra gérer un booléen indiquant si la réponse est déjà arrivée ou non. Tant que la réponse n'est pas arrivée, on pourra afficher que l'on est en attente.

> L'objectif de ce TP est d'écrire une application React qui récupère et affiche des informations obtenues auprès de l'API HTTP écrite précédemment en W4a.

> Le menu doit proposer les entrées suivantes :
> - `Home` : amène à la route '/'
> - `People` : amène à la route '/people'
> - `Groups` : amène à la route '/groups'

> Dans la partie `People`, on affiche la liste des personnes répertoriées. Un formulaire permet d'en créer de nouvelles. Pour chaque personne, on affiche un bouton de suppression et un bouton détail. En demandant le détail d'une personne, on affiche alors l'ensemble des informations (adresses, téléphones, ..) liées à cette personne. Chaque information peut être supprimée et des formulaires permettent d'en créer de nouvelles. On affiche également la liste des groupes auxquels appartient cette personne et une interface permettant de gérer la liste des groupes auxquels cette personne appartient.

> Dans la partie `Groups`, on affiche la liste des groupes connus. Un formulaire permet d'en créer de nouveaux. Pour chaque groupe, on affiche un bouton de suppression et un bouton détail. En demandant le détail d'un groupe, on affiche la liste des personnes appartenant à ce groupe. Chaque personne est affichée sous la forme d'un lien permettant d'aller sur la page de détail de cette personne.
