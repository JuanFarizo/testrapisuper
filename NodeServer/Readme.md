# Rapisuper API

## Instalacion

Para instalar realizar los siguientes pasos:

- `npm install`

## Recomendaciones

- Si estas desarrollando en el back, para testear rutas usar Postman, un programa, preguntar a Gaston sobre como configurarlo para testear rapido

## NPM Comandos

Se cuenta con los siguientes comandos:

- `npm start` Para producción // NO USAR EN DESARROLLO
- `npm run dev` Default para dev (Este seria el ideal si estamos trabajando en el back)
- `npm run dev:prod` Desarrollo con vista de producción (Este seria el ideal si estamos trabajando desde el front)
- `npm run debug` Para debugear con **ndb** (Un paquete que se instala global, esta muy bueno si no encontras un error)
- `npm run knex:makemigrations` Crea una migración
- `npm run knex:migrate` Migra todas las migraciones
- `npm run knex:rollback` Vuelve atrás una migración
- `npm run knex:makeseed` Crea una semilla
- `npm run knex:seed` Corre todas las semillas

## Paginas utiles

- **ORM:** ([Pagina oficial de Objection](https://vincit.github.io/objection.js/))

## Extensiones VsCode que uso

Para instalar extensiones:

- Copiar esta lista en una consola

code --install-extension abusaidm.html-snippets
code --install-extension alefragnani.project-manager  
code --install-extension atlassian.atlascode
code --install-extension batisteo.vscode-django
code --install-extension bradlc.vscode-tailwindcss
code --install-extension christian-kohler.npm-intellisense
code --install-extension christian-kohler.path-intellisense
code --install-extension CoenraadS.bracket-pair-colorizer  
code --install-extension DavidAnson.vscode-markdownlint  
code --install-extension dbaeumer.vscode-eslint
code --install-extension donjayamanne.githistory
code --install-extension eamodio.gitlens
code --install-extension ecmel.vscode-html-css
code --install-extension eg2.vscode-npm-script
code --install-extension esbenp.prettier-vscode
code --install-extension eventyret.bootstrap-4-cdn-snippet
code --install-extension formulahendry.auto-close-tag
code --install-extension formulahendry.auto-rename-tag
code --install-extension hollowtree.vue-snippets
code --install-extension kisstkondoros.vscode-gutter-preview
code --install-extension lonefy.vscode-JS-CSS-HTML-formatter
code --install-extension mikestead.dotenv
code --install-extension mrmlnc.vscode-scss
code --install-extension ms-python.python
code --install-extension ms-vscode.powershell
code --install-extension msjsdiag.debugger-for-chrome
code --install-extension octref.vetur
code --install-extension peakchen90.vue-beautify
code --install-extension redhat.vscode-yaml
code --install-extension ritwickdey.live-sass
code --install-extension ritwickdey.LiveServer
code --install-extension Shan.code-settings-sync
code --install-extension TabNine.tabnine-vscode
code --install-extension thekalinga.bootstrap4-vscode
code --install-extension VisualStudioExptTeam.vscodeintellicode
code --install-extension vscode-icons-team.vscode-icons
code --install-extension vuetifyjs.vuetify-vscode
code --install-extension wayou.vscode-todo-highlight
code --install-extension Zignd.html-css-class-completion

## TODO:

- Usar un Process Managment para correr el server, asi se reinicia si hay errores, ademas podes monitorearlo
- [PM2](https://www.npmjs.com/package/pm2) Este es el mas descargado, en 1 minuto lo instalas y remplazas el comando correspondiente a `npm start`
