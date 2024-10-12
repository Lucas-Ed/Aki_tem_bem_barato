const faunadb = require('faunadb');
const q = faunadb.query;

// Crie uma chave secreta no FaunaDB e insira aqui
const client = new faunadb.Client({ secret: 'fnacapi_omd2ZXJzaW9uAWdwYXlsb2FkWFiiYmlkcjQxMTAzNTg0NzAxMTMzNjc4OWZzZWNyZXR4ODhNaU4vNFRURE1adjF5RVZDcU9YSFJEVFNLUVI3ZU82QytlTWUrZ0lFb2tWWHlGVE1rNzRoZz09' });

exports.handler = async function(event, context) {
  try {
    // Verifica se a requisição é POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Método não permitido',
      };
    }

    // Pega os dados enviados pelo formulário
    const data = JSON.parse(event.body);

    // Salva no FaunaDB
    const result = await client.query(
      q.Create(
        q.Collection('newsletters'), // Nome da collection no FaunaDB
        { data: { name: data.name, email: data.email } }
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ id: result.ref.id }),
    };
  } catch (err) {
    console.error('Erro ao salvar no FaunaDB: ', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao processar a requisição' }),
    };
  }
};