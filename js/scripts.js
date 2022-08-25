// Initialize IIFE for pokemonRepository
let pokemonRepository = (function () {

    // Initialize pokemonList array and assign object values (pokemons) to it
    let pokemonList = [
    {name: 'Octillery', height: 0.9, types: ['water']},
    {name: 'Loudred', height: 1, types: ['normal']},
    {name: 'Foongus', height: 0.2, types: ['grass', 'poison']},
    {name: 'Lapras', height: 2.5, types: ['ice', 'water']},
    {name: 'Tentacruel', height: 1.6, types: ['water', 'poison']}
    ];

    // Create a function that adds new pokemons to the end of the pokemonList array
    function add(pokemon) {
        // Check whether pokemon is submitted in the correct format, add if true
        if (
            pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Error! Pokemon format: {name:'string', height: 'integer', types: ['string1', 'string2', ...] }");
        }
    }

    // Create a function that returns list of pokemons when called
    function getAll() {
        return pokemonList;
    }

    // Create function logging pokemon object to the console
    function showDeatails(pokemon) {
        console.log(pokemon);
    }

    // Create function to log pokemon object when pokemon button is clicked by user
    function displayPokemonOnClick(button, pokemon) {
        button.addEventListener('click', function (event) {
            showDeatails(pokemon.name);
        });
    }

    // Create function that adds pokemons to the DOM takes pokemons from an array, assignes it a <li> tag and makes a button with pokemon name
    function addListItem(pokemon) {

        // Select pokemon list class from HTML and push pokemons as list items to the list
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');

        // Create a button for each pokemon displaying it's name on it
        let button = document.createElement('button');
        button.innerText = pokemon.name;

        // Add button and list items to the DOM
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        list.appendChild(listItem);

        // Log pokemon info to console on click
        displayPokemonOnClick(button, pokemon);
    }

    // Return values to be used outside of the IIFE
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }
})();

// Acces pokemon list, add button for each pokemon and print it's name on it
pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
});
