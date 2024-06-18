<h1>Descrição do Projeto em Node.js</h1>
Neste projeto em Node.js foi um desafio do curso DevClub do nosso mentor Rodolfo Mori, criado para implementar uma aplicação CRUD básica para gerenciamento de pedidos. Usando o framework Express, oferece endpoints para criar, atualizar, excluir e visualizar pedidos.

A estrutura do projeto possui um array chamado orders, onde todos os pedidos são armazenados. Cada pedido é um objeto formado com as seguintes estrutura: um identificador único gerado automaticamente, item do pedido, nome do cliente, preço e status do pedido, 
definido inicialmente como 'em preparação'. Se não encontrar o id do pedido retorna uma mensagem de 'pedido não encontrado', e também através do middleware, mostra no log as requisições e rotas acessadas.


POST /order = Cria um novo pedido. Os dados do pedido são recebidos no corpo da requisição e um novo pedido é adicionado ao array de pedidos com um id automatico e status em preparação.
GET /order = Lista todos os pedidos já feitos.
PUT /order/:id = Atualiza os detalhes de um pedido existente. Os dados do pedido são recebidos no corpo da requisição e substituem os dados do pedido correspondente ao ID fornecido.
DELETE /order/:id =Deve deletar um pedido já feito com o id enviado nos parâmetros da rota.
GET /order/:id = Recebe o id nos parâmetros e deve retornar um pedido específico.
PATCH /order/:id = Recebe o id nos parâmetros e assim que ela for chamada, deve alterar o status do pedido recebido pelo id para "Pronto".
