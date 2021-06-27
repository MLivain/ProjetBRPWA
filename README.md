# front-brpwa

## Project setup
```
npm install

npm run build

npm i -g live-server 

in dist folder : live-server --port=8080 --entry-file=./index.html
```

## Stratégie de mise en cache utilisée
```
Etant donné que l'application est assez légère, nous avons décider de tout mettre en cache, sauf la page de connexion (l'index.html, les icones ainsi que le JSON de la carte).
Pour ce faire, nous avons utilisé le service worker fourni par VueJS (dans le fichier de config vue.config.js).
Dans le futur, nous comptons mettre en cache les parties jouées, en cours et le niveau des joueurs anonymes.
```

## Retouches effectuées entre le 23/06 et le 27/06

Travaux et correction menés pour obtenir un bon score lors des tests Lighthouse
A noter : la redirection http vers https sur heroku néccesite de payer en version payante 
