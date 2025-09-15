import 'dotenv/config';
import mysql from 'mysql2/promise';
import express, { Request, Response } from 'express';
console.log(process.env.DBHOST);

 
const app = express();
{
    app.get('/', async (req:Request, res:Response) => {
        if(!process.env.DBUSER){
            res.status(500).send('DBUSER não está definido');
            return;
        }
        if(process.env.DBPASSWORD === undefined){
            res.status(500).send('DBPASSWORD não está definido');
            return;
        }

        if(!process.env.DBHOST){
            res.status(500).send('DBHOST não está definido');
             return;
        }
       
        if(!process.env.DBPORT){
            res.status(500).send('DBPORT não está definido');
            return;

        }
        try{
                const connection =  await mysql.createConnection({
                host: process.env.DBHOST,
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
            
                port: Number(process.env.DBPORT)
                
            });   
            res.send("Conectado ao banco de dados com sucesso!");
            await connection.end();
        }
   catch(error){
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).send('Erro ao conectar ao banco de dados');
    return;
    }

     
    console.log('DBHOST:', process.env.DBHOST);
    console.log('DBUSER:', process.env.DBUSER);
    res.send('Olá ' + process.env.DBUSER);
    
    });
}

app.listen(8000, () => {
    console.log( `A porta que está rodando é 8000`);
});
export default app;


// tarefa: criar uma rota get para produtos que retirne a lista de produtos do banco de dados
// o produto deve ter id, nome preco, urlfoto, descricao
//deve se criar uma tabela no banco de dados AIVEN para armazenar produtos 
//a resposta tem que ser um array de produtos em formato JSON 
//crie um codigo sql para criar a tabela de produtos 
/* 
CREATE TABLE produtos (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
preco DECIMAL(10, 2) NOT NULL,
urlfoto VARCHAR(255) NOT NULL,
descricao TEXT
);
faz pelo menos 3 inscriçoes nessa tabela 
*/