//importar mongodb
var mongo = require('mongodb');

//desse modo quando o servidor sobre ele já s econecta uma vez desnecessáriamente
// module.exports = () => {
//     console.log('Entrou na função de conexão');
//     var db = new mongo.Db(
//         'got',
//         new mongo.Server(
//             'localhost', //string com o endereço do server
//             27017, //porta de conexão com server
//             {}
//         ),
//         {}
//     );
//     return db;
// }

//desse modo a função sera exportada dentro de uma variável
var connection = function(){
    console.log('Entrou na função de conexão');
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost', //string com o endereço do server
            27017, //porta de conexão com server
            {}
        ),
        {}
    );
    return db;
}
module.exports = function(){
    return connection;
}