// Initialize IIFE for pokemonRepository
let pokemonRepository = (function () {

    // Initialize pokemonList array and assign object values (pokemons) to it
    let pokemonList = [];
    let pokemonApiOffset = 0;
    let pokemonApiLimit = 30;
    let apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${pokemonApiOffset}&limit=${pokemonApiLimit}`;

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

    // Create function that adds pokemons to the DOM takes pokemons from an array, assignes it a <li> tag and makes a button with pokemon name
    function addListItem(pokemon) {

            let list = document.querySelector('.list');
            
            let searchInput = document.getElementById('search');
            searchInput.addEventListener('keyup', filterPokemons);
            
            let listItem = document.createElement('li');
            let pokemonCard = document.createElement('div');
            pokemonCard.classList.add('card');
            pokemonCard.id = `${pokemon.name}-card`;

            let cardImage = document.createElement('img', 'card-img');
            let loader = document.createElement('div');
            loader.classList.add('loader');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add('button');
            button.classList.add('btn');
            button.classList.add('btn-primary');
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#exampleModal');

            pokemonCard.appendChild(loader);
            pokemonCard.appendChild(cardImage);
            pokemonCard.appendChild(button);
            listItem.appendChild(pokemonCard);
            list.appendChild(listItem);

            button.addEventListener('click', function() {
                showDeatails(pokemon);
              });
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
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function getImage(item) {
        let url = item.detailsUrl;
        //return json from link to promise as response
        return fetch(url).then(function (response) {
            //return json itself
            return response.json();
        }).then(function (details) {
            //add pokemon details
            let imageCard = document.querySelector(`#${item.name}-card img`);
            let loader = document.querySelector(`#${item.name}-card .loader`);
            imageCard.src = details.sprites.front_default;
            imageCard.onload = function() {
                loader.remove();
            };
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
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];

            //Loop for pokemon types
            for (var i = 0; i < details.types.length; i++) {
                item.types.push(details.types[i].type.name)
            }

            //Loop for pokemon abilities
            item.abilities = [];
            for (var y = 0; y < details.abilities.length; y++) {
                item.abilities.push(details.abilities[y].ability.name);
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Create function logging pokemon object to the console
    function showDeatails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item);
        });
    }

        //Create a function to display modal
        function showModal(item) {

            //Select HTML modal elements
            let modalBody = document.querySelector('.modal-body');
            let modalTitle = document.querySelector('.modal-title');
            modalTitle.innerText = '';
            modalBody.innerText = '';

            // Create title element for pokemon name
            let titleElement = document.createElement('h1');
            titleElement.innerText = item.name;

            // Create content element for pokemon info
            let heightElement = document.createElement('p');
            heightElement.innerText = 'Height: ' + item.height;

            let weightElement = document.createElement('p');
            weightElement.innerText = 'Weight: ' + item.weight;

            let typesElement = document.createElement('p');
            typesElement.innerText = 'Types: ' + item.types;

            let abilitiesElement = document.createElement('p');
            abilitiesElement.innerText = 'Abilities: ' + item.abilities;

            // Create pokemon front img element
            let imageElementFront = document.createElement('img');
            imageElementFront.classList.add('modal-img');
            imageElementFront.style.width = "50%";
            imageElementFront.src = item.imageUrlFront;

            // Create pokemon back img element
            let imageElementBack = document.createElement('img');
            imageElementBack.classList.add('modal-img');
            imageElementBack.style.width = "30%";
            imageElementBack.src = item.imageUrlBack;

            // Append all elements
            modalTitle.appendChild(titleElement);
            modalBody.appendChild(imageElementFront);
            modalBody.appendChild(imageElementBack);
            modalBody.appendChild(heightElement);
            modalBody.appendChild(weightElement);
            modalBody.appendChild(typesElement);
            modalBody.appendChild(abilitiesElement);
        }


        function filterPokemons() {
            let searchInput = document.getElementById('search');
            let searchText = searchInput.value.toLowerCase();
            let allPokemons = pokemonList;
            let filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().startsWith(searchText));
            displayFilteredPokemons(filteredPokemons);
        }

        function displayFilteredPokemons(filteredPokemons) {
            // Clear the current list
            let listElement = document.querySelector('.list');
            listElement.innerHTML = '';

            // Add filtered Pokemons to the list
            filteredPokemons.forEach(pokemon => {
                pokemonRepository.getImage(pokemon);
                pokemonRepository.addListItem(pokemon);
            });
        }

        let isFetching = false;

        async function fetchMorePokemons() {
            if (isFetching) return;
        
            isFetching = true;
        
            pokemonApiOffset += pokemonApiLimit;
            apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${pokemonApiOffset}&limit=${pokemonApiLimit}`;
            await loadList().then(function () {
                pokemonList.slice(pokemonApiOffset).forEach(function (pokemon) {
                    getImage(pokemon);
                   addListItem(pokemon);
                });
            });
        
           isFetching = false;
        }

            // Return values to be used outside of the IIFE
        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails,
            showDeatails: showDeatails,
            getImage: getImage,
            fetchMorePokemons: fetchMorePokemons
        };
    })();

 (async function () {
    await pokemonRepository.loadList();
    await pokemonRepository.getAll().forEach( function (pokemon) {
            pokemonRepository.getImage(pokemon);
            pokemonRepository.addListItem(pokemon);
        });
    
    // Add event listener for scroll event
    window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            pokemonRepository.fetchMorePokemons();
    }
});

})();