var crypto = require('crypto');

function UsuariosDAO(connection){
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(erro, mongoclient){
        mongoclient.collection('usuarios', function(erro, objCollection){

            var senha_criptografada = crypto.createHash('md5').update('usuario.senha').digest('hex');
            usuario.senha = senha_criptografada;

            objCollection.insert(usuario);

            mongoclient.close();
        });
    });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open(function(erro, mongoclient){
        mongoclient.collection('usuarios', function(erro, objCollection){
            var senha_criptografada = crypto.createHash('md5').update('usuario.senha').digest('hex');
            usuario.senha = senha_criptografada;
            objCollection.find(usuario).toArray(function(erro, result){
                if(result[0] != undefined){
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }else{
                    req.session.autorizado = false;
                }
                if(req.session.autorizado){
                    res.redirect('jogo');
                }else{
                    res.render('index',{validacao:[{msg:"Usuário e/ou senha inválidos"}]});
                }
            });

            mongoclient.close();
        });
    });
}
module.exports = function(){
    return UsuariosDAO;
}