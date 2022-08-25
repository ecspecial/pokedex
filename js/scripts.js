// Define a variable for pokemons and make it point to an array
let pokemonList = [

    // Create an object for pokemon #1
    {
        name: 'Octillery',
        height: 9,
        types: ['water']
    },

    // Create an object for pokemon #2
    {
        name: 'Loudred',
        height: 10,
        types: ['normal'],
    },

    // Create an object for pokemon #3
    {
        name: 'Foongus',
        height: 2,
        types: ['grass', 'poison']
    }   
];

// Loop that iterates over each array object and prints pokemon name value
for (i = 0; i < pokemonList.length; i++) {
    console.log(pokemonList[i].name);
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');
}