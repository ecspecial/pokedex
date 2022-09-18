// Initialize IIFE for pokemonRepository
let pokemonRepository = (function () {

    // Initialize pokemonList array and assign object values (pokemons) to it
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // Create a function that adds new pokemons to the end of the pokemonList array
    function add(pokemon) {
        // Check whether pokemon is submitted in the correct format, add if true
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Error! Wrong Pokemon format.");
        }
    }

    // Create a function that returns list of pokemons when called
    function getAll() {
        return pokemonList;
    }

// Load pokemon list from pokemon api link
function loadList() {
    return fetch(apiUrl).then(function (response) {
    //return json itself
        return response.json();
        }).then(function (json) {
        //add pokemons from json to pokemon list one by one
        json.results.forEach(function (item) {
            let pokemon = {
                name: (item.name).charAt(0).toUpperCase() + (item.name).slice(1),
                detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
        });
    }).catch(function (e) {
        console.error(e);
    });
}

    // Load pokemon details from pokemon details link
    function loadDetails(item) {
        let url = item.detailsUrl;
        //return json from link to promise as response
        return fetch(url).then(function (response) {
            //return json itself
            return response.json();
        }).then(function (details) {
            //add pokemon details
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.type;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Create function logging pokemon object to the console
    function showDeatails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            pokemonModal.showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imageUrl);
        });
    }

    // Create function to log pokemon object when pokemon button is clicked by user
    function displayPokemonOnClick(button, pokemon) {
        button.addEventListener('click', function (event) {
            showDeatails(pokemon);
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
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDeatails: showDeatails
    }
})();

    // Create new IIFE for modal
    let pokemonModal = (function () {

        let modalContainer = document.querySelector('#modal-container');

        //Create a function to display modal
        function showModal(title, content, url) {

            modalContainer.innerHTML = '';
            
            //Create modal div
            let modal = document.createElement('div');
            modal.classList.add('modal');

            // Create modal close button element
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            // Create title element for pokemon name
            let titleElement = document.createElement('h1');
            titleElement.innerText = title;

            // Create content element for pokemon info
            let contentElement = document.createElement('p');
            contentElement.innerText = content;

            // Create pokemon img element
            let imageElement = document.createElement('img');
            imageElement.src = url;

            // Append all elements
            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modal.appendChild(imageElement);
            modalContainer.appendChild(modal);

            // Make modal container visible
            modalContainer.classList.add('is-visible');


        }

        // Function to hide modal
        function hideModal() {
            modalContainer.classList.remove('is-visible');
        }

        // Listen to Esc being pressed to close modal
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        })

        // Listen to click outside of modal to close modal
        window.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            } 
        })

        return {
            showModal: showModal
        }

    })();

// Acces pokemon list, add button for each pokemon and print it's name on it
 pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach( function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
 });