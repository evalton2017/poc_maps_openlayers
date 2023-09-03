const express = require('express');
const path = require('path')
const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname+'/dist/poc-maps'));

app.get('/*', (req,res)=>{
    res.sendFile(__dirname+'/dist/poc-maps/index.html')
});

app.listen(PORT, () => {
    console.log('Servidor rodando na porta '+ PORT)
});
