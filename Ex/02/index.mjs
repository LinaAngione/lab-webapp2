//"use strict"; -- non serve con i moduli ES che è attivato di default

//Modulo CommonJs
//sintassi non standard di JacaScript ma di Node
//nel browser non funziona
//per importare librerie
//const dayjs = require('dayjs');

//come si importa in JavaScript
//devo rinominare il file .mjs non .js
import dayjs from 'dayjs';


console.log(dayjs().format()); 
//stampa l'oggetto di dayjs non la data pulita



