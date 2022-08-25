// Define a variable for pokemons and make it point to an array
let pokemonList = [
    {name: 'Octillery', height: 0.9, types: ['water']},
    {name: 'Loudred', height: 1, types: ['normal']},
    {name: 'Foongus', height: 0.2, types: ['grass', 'poison']},
    {name: 'Lapras', height: 2.5, types: ['ice', 'water']},
    {name: 'Tentacruel', height: 1.6, types: ['water', 'poison']}
];

// Loop that iterates over each array object and prints poemon name value
for (i = 0; i < pokemonList.length; i++) {

    // Condition to print comment on the big pokemon
    if (pokemonList[i].height > 1.7) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
        document.write(' - Wow that\'s big' + '<p>');
    } else {
        console.log(pokemonList[i].name);
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<p>'); 
    }
}