let pokemonRepository = (function () {

    let pokemonList = [
    {name: 'Octillery', height: 0.9, types: ['water']},
    {name: 'Loudred', height: 1, types: ['normal']},
    {name: 'Foongus', height: 0.2, types: ['grass', 'poison']},
    {name: 'Lapras', height: 2.5, types: ['ice', 'water']},
    {name: 'Tentacruel', height: 1.6, types: ['water', 'poison']}
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    }
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height > 2) {
        document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
        document.write(' - Wow, that\'s big' + '<br>');
    } else {
        document.write(pokemon.name + ' (height: ' + pokemon.height + ')' + '<br>');
    }
});