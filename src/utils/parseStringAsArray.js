/**FUNÇÃO PARA TRANSFORMAR UMA SEQUENCIA DE STRINGS SEPARADAS POR VIRGULA EM UM ARRAY*/
module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
}