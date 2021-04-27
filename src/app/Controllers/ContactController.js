const Yup = require('yup');
const Contact = require('../Models/Contact');

class ContactController {

    async show(req, res) {
        console.log("Função show acessada");
    }

    async showAll(req, res) {
        console.log("Função ShowAll acessada");
    }

    async update(req, res) {
        console.log("Função update acessada");
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required().min(3),
            email: Yup.string().email().required(),
            phone: Yup.string().required().min(10)
        });

        if(!(await schema.isValid(req.body))){
            return res.status(402).json({
                error: true,
                message: "Dados inválidos"
            })
        }


        const { name, email, phone } = req.body;

        const dados = {
            name,
            email,
            phone
        }


        const contact = await Contact.create(dados, (err) => {
            if(err) res.status(402).json({
                    error: true,
                    message: "Não foi possível cadastrar o contato"
                })

            return res.status(200).json({
                error: false,
                message: "Contato cadastrado com sucesso",
                contact
            })
        })
        

    }

    async remove(req, res) {
        console.log("Função remove acessado");
    }



}

module.exports = new ContactController();