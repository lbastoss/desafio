const express = require("express") // chama o express
const port = 3000 // // numero da porta numa variável 
const app = express() // coloca o express dentro de uma variavel para facilitar na escrita
const uuid = require('uuid') // bliblioteca de ID, para ser id unico 
app.use(express.json()) // avisar para o express para usar json 
const orders = [] 



const checkExistingId = (req, res, next) => {

    const {id} = req.params // pega o id enviado no rout params

    const index = orders.findIndex (newOrder => newOrder.id === id) // procura a posição referente ao id enviado

    if (index < 0 ) { // quando nao encontra algo mostra -1, portanto nao achar o pedido retornar com essa mensagem abaixo 
        return res.status(404).json ({ message: "order not found"}) // mensagem a ser retornada com o codigo de erro, caso nao encontre 
    }

    
    req.orderIndex = index // adiciona a informação criada no index
    

 next ()
}

const viewRequest = (req, res, next) => {
    console.log(`Method: [${req.method}] - ${req.url}`); // vai mostrar o metodo e a url usados em cada requisição
    next();
};

app.use(viewRequest)


app.get('/order', (req, res ) => { // LISTAR PEDIDOS CRIADOS

    return res.json(orders) // vai listar todos os pedidos ja criados


}) 


app.post('/order', (req, res ) => { // CRIAR UM PEDIDO COM ID ALEATORIO E STATUS
    const {order, clienteName, price  } = req.body // pega as informações do corpo da requisição

    const newOrder = {id:uuid.v4(), order, clienteName, price, status: 'Order in preparation'  } // monta um novo pedindo, com id auto e status 

    orders.push(newOrder) // adiciona na variaivel orders

    return res.status(201).json(newOrder) // retorna status 201 e pedido feito

})

app.put('/order/:id', checkExistingId, (req, res ) => { // ATUALIZAR ALGUM PEDIDO PELO ID 
    const index = req.orderIndex
    const {order, clienteName, price  } = req.body // informações do corpo 

    const updateOrder = {id:req.params.id, order, clienteName, price, status: 'Order in preparation'} // monta o pedido atualizado

    
    orders [index] = updateOrder // vai atualizar na posição que encontrar o if especifico 

    return res.json(updateOrder) // retorna o usuario atualizado
})


app.delete('/order/:id', checkExistingId, (req, res ) => { // DELETAR ALGUM PEDIDO PELO ID 
    const index = req.orderIndex

    orders.splice (index,1) // aqui vai deletar a posição, o 1 depois vai dizer que vai mostrar somente a posição index

    return res.status(204).json() // status 204 nano precisa retornar nada
}) 


app.get('/order/:id',checkExistingId,  (req, res ) => { // MOSTRAR O PEDIDO PELO ID 
    const index = req.orderIndex //
    const order = orders[index] // vai procurar a posição destinada ao ID enviado

    return res.status(200).json(order) // deve retornar o pedido // status de OK 


}) 

app.patch('/order/:id',checkExistingId,  (req, res ) => { // altera o status do pedido
    const index = req.orderIndex

    orders[index].status = "Ready" // vai atualizar na posição que encontrar o if especifico 

    return res.status(200).json(orders[index]) // retorna o usuario atualizado


})




app.listen (3000, () => {
    console.log ('🚀 Server starded on port 3000')
})