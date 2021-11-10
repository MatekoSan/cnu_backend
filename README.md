# cnu_backend

/////// PROCES VYVOJA APLIKACIE ///////

## 28.10.

- precital som si par clankov k body-parser, zistil som, ze od verzie express 4.16+ je zabudovany priamo v nom
- zistil som to tak, ze pri napajani body-parser po instalacii v index.js mi ho preciarklo ako 'deprecated'
- zdroje:

1. https://stackoverflow.com/questions/66659450/getting-body-parser-is-deprecated-warning-in-vs-code-and-not-able-to-get-body-tr
2. https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
3. https://www.codegrepper.com/code-examples/javascript/express+4.17+body+parser

- pridal som bodyParser cez express

## 29.10.

- vytvoril som si tabulku category, ktora bude prepojena s recipes
- na prepojenie som si vytvoril medzitabulku categoryRecipes, kde som prepojil ID receptu s ID kategorie
- vytvoril som si route a service subor ku categories a napojil cez express v index.js pomocou app.use
- pridal som ako test rating stlpec k receptom
- doplnil som ingredience a recept
- hladanie chyb a oprava routes suborov pre nefunkcnost filtrovania
- studium materialov, zdroj: https://www.bezkoder.com/node-js-express-sequelize-mysql/

## 30.10.

- pridal som post, put, delete operacie pre recipes, ingredients a categories (zatial len commented out sposobom, kym neprestudujem spravny sposob)
- pridal som recepty, suroviny a kategorie do DB
- googlil som ako spravne zapisat post, put, delete operacie skrz CRUD funkcie (create, update, delete)

## 31.10.

- narodeniny :)
- upravil som post operacie pre pridanie noveho receptu a novej ingrediencie a pridal body podmienky v routes
- studoval som dokumentaciu sequelize na zistenie toho, ako pridat zaroven existujuce suroviny podla ID ako pole IDciek ingrediencii pri pridavani receptu, zdroj: https://stackoverflow.com/questions/37638311/update-sequelize-array/37862402
- pri post operaciach pre pridanie receptu som pridal aj rating v rozmedzi od 1 do 5 ako parameter v routes.

## 01.11.

- sviatok

## 02.11.

- upravil som operaciu pre pridanie kategorii
- upravil som put operacie pre upravu receptov, ingrediencii a kategorii, debuggoval chyby
- pri put ingredient som potreboval zmenit cestu z title na id a rovnako vo funkcii v services zmenit update where: z title na ID
- nastudoval som si sequelize dokumentaciu ako vymazat query (cez destroy)
- upravil som delete operacie pre jednotlive kategorie, recepty a suroviny

## 03.11.

- menil som sposob routingu pre kategorie a recepty, pretoze je vhodnejsie byt konzistentny a tak ako pri ingredienciach robit get operacie cez ID.
- studium API konvencii: https://nordicapis.com/10-best-practices-for-naming-api-endpoints/
- pridal som ku kategoriam jej pridanie vratane receptu

## 04.11.

- skumal som akym sposobom pridat podporu pre rating, teda vytvorit routes, kde sa moze menit alebo pridavat.
- zmenil som pri get operaciach podla ID metodu z findAll na findOne, lebo si pytam len jedno ID.
- upravil som aj nazvy funkcii na jednotne cislo kedze GETujem len jeden zaznam
- podla dokumentacie sequelize som zistil, ze na podporu k ratingu potrebujem attributes na vyfiltrovanie stlpcov
- zdroj: https://sequelize.org/master/manual/model-querying-basics.html
- standardizoval som nazvy funkcii a ciest aby mali jednotne nazvy, lahko pochopitelne (getAll, get, add, edit, delete)
- tak ako vcera som to robil pri get, aj dnes som upravoval parametre z title na ID k put a delete operaciam

## 05.11.

- pridal som put operacie pre recipes rating na upravu ratingov receptov
- zistil som ze pridanie ratingu v ramci receptov nie je mozne, pretoze by sa potom pridaval recept cely nie samotny rating, preto musim vytvorit zvlast routes pre ratings

## 06.11.

- zistil som ze ak pridam recept bez surovin, teda pridam ingredients s prazdnou array a nasledne cez PUT operaciu suroviny, array zostane prazdna, rovnako ak sa snazim zmenit ingrediencie, kt. uz vlozene su, zmena title, textu a ratingu funguje

## 07.11.

- zo services funkcii pri categories, recipes a ingredients som cez attributes excludoval z modelov createdAt a updatedAt casove znacky pre lepsiu prehladnost vystupov v Postmanovi
- casove znacky zostali pri spajacich medzitabulkach, tie som deaktivoval cez applyRelations fn v modeloch, zdroj: https://github.com/sequelize/sequelize/issues/3266
- pridal som unique atribut pre recepty aby sme nemali duplikaty receptov
- pri GET categories som musel pridat order by ID, inak zoradovalo abecedne nie podla ID

## 08.11.

- studoval som sequelize dokumentaciu, ako je mozne hromadne zmenit pole udajov, zdroj: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-bulkCreate
- vytvoril som route a services pre rating
- vlozil som recepty a ratingy routes a services do zvlast priecinkov
- debuggoval som problem s not found rating
- debuggoval som nefunkcnost pridania kategorie sucasne s receptami, ktore k nej budu priradene

## 09.11.

- priecinok so services a routes receptov a ratingov som nakoniec dal nazad individualne, pretoze islo o ten isty model a teda oba routery chceli vytvorit ten isty recept, preto boli problemy s funkcnostou
- model receptov som vymazal unikatnost nazvu, nakolko viacero receptov moze mat ten isty nazov ale napriklad rozdielne niektore suroviny
- aby som mohol pridavat k receptom kategorie, musel som vytvorit vzajomny vztah s recipe belongsToMany categories, cez junction table categoryRecipes
- zo services kategorii som vymazal moznost pridnia receptu, pretoze je logicky vhodnejsie pridavat kategoriu pri pridavani receptu
- ku GET operaciam som pridal odignorovanie spajacej tabulky, pre lepsiu prehladnost, zdroj: https://github.com/sequelize/sequelize/issues/2541

## 10.11.

- ku GET (findOne) operaciam som pridal podmienku, ktora osetruje prazdny vysledok v pripade ze dany zaznam vymazeme cez DEL operaciu, a nasledne zaznam cez GET nenajde, vrati 404, inak vrati najdeny vysledok
- do recipe service som ku GET allRecipes pridal aj model category, aby zobrazovalo nie len suroviny priradene k receptu, ale aj kategorie, v kt. sa recept nachadza
- pri vytvarani receptu som vytvoril podmienky s ternary operatorom, kedy plati vztah, ze ak dlzka body ingrediencii je viac ako 0, chcem pridat tento body s ingr., v opacnom pripade chcem prazdne pole. Tento isty vztah som aplikoval aj pre body kategorii.
- nakolko forEach loop pre vytvaranie receptu, kt. ucelom bolo iterovat kazde recipeID spolu s ingredientID a rovnako recipID spolu s categoryID nedokazalo dobre fungovat s async await, tym padom nefungovali operacie PUT, pouzil som for...of loop, kt. iteruje ingredientId z ingrediencii pricom vytvara pri kazdej iteracii vztahy medzi recipeId a ingredientId. To iste som aplikoval aj pre kategorie.
- zdroj: https://stackoverflow.com/questions/29886552/why-are-objects-not-iterable-in-javascript
- for...of loop a podmienky s ternary op. som nasledne pridal aj pre PUT recipe operaciu, avsak musel som predtym pridat destroy operacie pre junction table vztahy medzi receptami a ingredienciami, medzi receptami a kategoriami, nasledne pomocou for...of loop ich vytvorit skrz PUT
