// Initialize IIFE for pokemonRepository
let pokemonRepository = (function () {

    // Initialize pokemonList array and assign object values (pokemons) to it
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    // Create a function that adds new pokemons to the end of the pokemonList array
    function add(pokemon) {
        // Check whether pokemon is submitted in the correct format, add if true
        if (
            pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
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

    // Load pokemon list from pokemon api link
    function loadList() {
        //return list from api to promise as response
        return fetch(apiUrl).then(function (response) {
            //return json itself
            return response.json();
        }).then(function (json) {
            //add pokemons from json to pokemon list one by one
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(item);
            });
        }).catch (function (e) {
            concole.error(e);
        })
    }

    // Load pokemon details from pokemon details link
    function loadDetails(item) {
        let url = detailsUrl;
        //return json from link to promise as response
        return fetch(url).then(function (response) {
            //return json itself
            return response.json();
        }).then(function (details) {
            //add pokemon details
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.type;
        }).catch (function (e) {
            console.error(e);
        })
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
        loadList: loadList,
        loadDetails: loadDetails
    }
})();

// Acces pokemon list, add button for each pokemon and print it's name on it
pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
});
