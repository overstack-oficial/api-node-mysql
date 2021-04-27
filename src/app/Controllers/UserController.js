const User = require('../Models/User');
const bcrypt = require('bcryptjs');

class UserController {

    async index(req, res) {
        await User.findAll().then((users) => {
            res.status(200).json({
                error: false,
                users
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    async show(req, res) {
        const { id } = req.params;

        await User.findOne({
            where: { 'id' : id}
        })
        .then( response => {
            return res.status(200).json({
                error: false,
                user: response
            })
        })
        .catch( err => {
            return res.status(400).json({
                error: true,
                error: err
            })
        })
    }

    async store(req, res) {
        const {name, email, password } = req.body;

        const passwordFinal = await bcrypt.hash(password, 8);

        await User.create({
            name,
            email,
            password: passwordFinal
        })
        .then(() => {
            res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso!"
            })
        })
        .catch(err => {
            res.status(400).json({
                error: true,
                error: err
            })
        })
    }

    async update(req, res) {
        
        const { id } = req.params;
        const data = req.body;

        if(data.password){
            const passwordFinal = await bcrypt.hash(data.password, 8);
            data.password = passwordFinal;
        }

        await User.update(data, { where : { 'id' : id }})
        .then(() => {
            return res.status(200).json({
                error: false,
                message: "Usuário editado com sucesso!"
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: true,
                message: "Usuário não foi editado!",
                error: err
            })
        })

    }

    async delete(req, res) {
        const { id } = req.params;
        await User.destroy({
            where: { 'id' : id} 
        })
        .then(() => {
            return res.status(200).json({
                error: false,
                message: "Usuário apagado com sucesso!"
            })
        })
        .catch(err => {

            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Ocorreu um erro ao excluir o usuário!"
            })
        })

    }
}

module.exports = new UserController();