module.exports.cadastro = (application, req, res) => {
    res.render('./cadastro',{validacao:{}, dadosForm:{}});
}

module.exports.cadastrar = (application, req, res) => {
    var dadosForm = req.body;

    req.assert('nome','Nome não pode ser vazio').notEmpty();
    req.assert('usuario','Usuário não pode ser vazio').notEmpty();
    req.assert('senha','Senha não pode ser vazio').notEmpty();
    req.assert('casa','É obrigatório selecionar uma casa').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('cadastro',{validacao:erros, dadosForm:dadosForm});
        return;
    }

    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    var JogoDAO = new application.app.models.JogoDAO(connection);

    UsuariosDAO.inserirUsuario(dadosForm);
    JogoDAO.gerarParametros(dadosForm.usuario);
    console.log(dadosForm.usuario);



    res.redirect('/');
}
