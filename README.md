# front-brpwa

## Project setup
```
npm install

npm run build

in dist folder : live-server --port=8080 --entry-file=./index.html
```

## Stratégie de mise en cache utilisée
```
Etant donné que l'application est assez légère, nous avons décider de tout mettre en cache, sauf la page de connexion (l'index.html, les icones ainsi que le JSON de la carte).
Pour ce faire, nous avons utilisé le service worker fourni par VueJS avec une surcouche personnalisée (version InjectManifest). 
Dans le futur, nous comptons mettre en cache les parties jouées, en cours et le niveau des joueurs anonymes.
```