function showSection(sectionId) {
    // Oculta todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Muestra la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';

    // Desplazar manualmente para compensar la barra fija
    const yOffset = -80; // Ajuste de desplazamiento (80px es la altura de la barra superior)
    const y = selectedSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
        top: y,
        behavior: 'smooth' // Desplazamiento suave
    });
}
// Obtener el elemento del footer bar
const footerBar = document.getElementById('footerBar');

// Escuchar el evento de scroll
window.addEventListener('scroll', () => {
    // Comprobar si se ha llegado al final de la página
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footerBar.style.display = 'block'; // Muestra el footer
    } else {
        footerBar.style.display = 'none'; // Oculta el footer
    }
});
const pokemonNames = [
    "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon",
    "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie",
    "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill",
    "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate",
    "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu",
    "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina",
    "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy",
    "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff",
    "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume",
    "Paras", "Parasect", "Venonat", "Venomoth", "Diglett",
    "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck",
    "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag",
    "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam",
    "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell",
    "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler",
    "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro",
    "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio",
    "Seel", "Dewgong", "Grimer", "Muk", "Shellder",
    "Cloyster", "Gastly", "Haunter", "Gengar", "Onix",
    "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb",
    "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak",
    "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing",
    "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan",
    "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu",
    "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz",
    "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados",
    "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon",
    "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto",
    "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos",
    "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo",
    "Mew"
];

const pokemonData = []; // Array para almacenar los Pokémon

// Generar datos de Pokémon
for (let i = 0; i < 151; i++) {
    const number = String(i + 1).padStart(3, '0'); // Agregar 1 porque los índices empiezan en 0
    pokemonData.push({ 
        number: `#${number}`, 
        name: pokemonNames[i], // Usar el nombre real del Pokémon
        image: `pkm/${number}.svg` // Ruta a la imagen del Pokémon
    });
}

let currentPage = 0;
const itemsPerPage = 30;


function nextPage() {
    if ((currentPage + 1) * itemsPerPage < pokemonData.length) {
        currentPage++;
        displayPokemon();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayPokemon();
    }
}

// Event listeners para los botones de paginación
document.getElementById('nextButton').addEventListener('click', nextPage);
document.getElementById('prevButton').addEventListener('click', prevPage);

// Mostrar los Pokémon de la primera página al cargar
displayPokemon();
currentPokemon.forEach(pokemon => {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';

    gridItem.innerHTML = `
        <div class="pokemon-number">${pokemon.number}</div>
        <div class="pokemon-image">
            <img src="${pokemon.image}" alt="${pokemon.name}" />
        </div>
        <div class="pokemon-name">${pokemon.name}</div>
    `;

    gridContainer.appendChild(gridItem);
});
function displayPokemon() {
    const gridContainer = document.getElementById('pokemonGrid');
    gridContainer.innerHTML = ''; // Limpiar el contenido anterior

    // Calcular el rango de Pokémon a mostrar
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const currentPokemon = pokemonData.slice(start, end);

    // Crear los elementos de Pokémon en el grid
    currentPokemon.forEach((pokemon, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.onclick = () => showPokemonInfo(start + index); // Aquí se añade el evento

        gridItem.innerHTML = `
            <div class="pokemon-number">${pokemon.number}</div>
            <div class="pokemon-image">
                <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-img" />
            </div>
            <div class="pokemon-name">${pokemon.name}</div>
        `;

        gridContainer.appendChild(gridItem);
    });
}
// Mostrar información del Pokémon
function showPokemonInfo(pokemonIndex) {
    const selectedPokemon = pokemonData[pokemonIndex];

    // Aquí actualiza tu HTML de la sección de información del Pokémon
    document.getElementById('pokemonName').innerText = selectedPokemon.name;
    document.getElementById('pokemonImage').src = selectedPokemon.image;
    document.getElementById('pokemonDescription').innerText = `Descripción de ${selectedPokemon.name}`;

    // Muestra la sección de información del Pokémon
    showSection('pokemonInfo');
}

function selectMenuOption(section) {
    showSection(section); // Muestra la sección correspondiente
    const popupMenu = document.getElementById('popupMenu');
    popupMenu.style.display = 'none'; // Cierra el menú emergente
}

function toggleMenu() {
    const popupMenu = document.getElementById('popupMenu');
    if (popupMenu.style.display === 'none' || popupMenu.style.display === '') {
        popupMenu.style.display = 'flex'; // Muestra el menú emergente
    } else {
        popupMenu.style.display = 'none'; // Oculta el menú emergente
    }
}

// Agrega un evento para cerrar el menú al hacer clic fuera de él
window.onclick = function(event) {
    const popupMenu = document.getElementById('popupMenu');
    if (event.target === popupMenu) {
        popupMenu.style.display = 'none'; // Cierra el menú emergente
    }
};
// Función para ocultar el menú en pantallas grandes
function hideMenuOnLargeScreens() {
    const popupMenu = document.getElementById('popupMenu');
    if (window.innerWidth >= 769) {
        popupMenu.style.display = 'none'; // Asegúrate de que esté oculto
    }
}

// Llama a la función cuando se carga la página
window.onload = hideMenuOnLargeScreens;

// También asegúrate de ocultar el menú si se cambia el tamaño de la ventana
window.onresize = hideMenuOnLargeScreens;



