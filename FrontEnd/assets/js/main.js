import {generateGallery } from './gallery.js';
import {getCategories } from './filter.js';
import {postAuthentification } from './login.js';


// Appel de la fonction pour générer les filtres
getCategories ();

// Appel de la fonction pour générer la galerie
generateGallery();

//Appel de la fonction pour se connecter 
postAuthentification()

