# nlw04-nodeJS
Vamos aprender os conceitos básicos sobre o que é uma API, entender o que é o NodeJS.


<code>
function enviarEmail(para, id, assunto, texto) {
    // Bilioteca de envio de e-mail

    console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario {
    send() {

        // Porém, imagine id, sendo um UUID
        // UUID => A universally unique identifier (UUID) is a 128-bit number used to identify
        // information in computer systems.
        enviarEmail("luisfernando@gmail.com", 9899, "Olá!", "Tudo bem?")

        // Isso daria erro na hora de execução, por conta de id ser uma string
        // e estarmos passando um inteiro
    }
}
</code>


## Vamos ver usando TypeScript

function enviarEmail(para: String, id: String, assunto: String, texto: string) {
    console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario {
    send() {

        // Passando o mouse sobre o nome da função, podemos ver agora o tipo
        // declarado de cada parametro... Isso graças ao TypeScript
        // se mudarmos o parametro id para numerico, isso resultaria em um erro
        // em desenvolvimento.
        enviarEmail("luisfernando@gmail.com", "9899", "Olá!", "Tudo bem?")
    }
}

## Usando objeto e interface

interface DadosDeEnvioEmail {
    para: String;
    id: String;
    assunto: String;
    texto: string;
}

function enviarEmail(dados: DadosDeEnvioEmail) {
    console.log(dados.para, dados.id, dados.assunto, dados.texto);
}

class EnviarEmailParaUsuario {
    send() {

        // Agora precisamos passar um objeto
        enviarEmail({
            para: "luisfernando@gmail.com",
            id: "9899",
            assunto: "Olá!",
            texto: "Tudo bem?"
        })
    }
}

## Usando objeto e interface - usano desestruturação de objeto como parametro
function enviarEmail({para, id, assunto, texto}: DadosDeEnvioEmail) {
    console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario {
    send() {

        // Agora precisamos passar um objeto
        enviarEmail({
            para: "luisfernando@gmail.com",
            id: "9899",
            assunto: "Olá!",
            texto: "Tudo bem?"
        })
    }
}

## Instalando e resolvendo dependencias durante o projeto...
    - # inicializa o projeto
    - yarn init -y

    - # instala o Express
        - yarn add express

        - # instala apenas em ambiente de projeto as definições externas de métodos/funções para facilitar a visualização usando Ctrl+D

    - # Precisamos de acesso a tipagem somente em ambiente de desenvolvimento e precisaremos delas em ambiente de produção, por isso o uso parâmetro -D
        - yarn add @types/express -D 

    - # Para permitir compilar/executar nossos arquivos typescrip, precisaremos fazer sua instalação com parametro somente para ambiente de desenvolvimento.
        - yarn add typescript -D

## Antes de testar nossos arquivos TypeScript
precisamos inicializar o typescript em nossa aplicação

yarn tsc --init

Podemos modificar o parametro strict do arquivo tsconfig.json
    - "strict": false,                           /* Enable all strict type-checking options. */

Precisamos instalar como dependencia de desenvolvimento o TS-NODE-DEV para converter/traduzir nosso código typescript para javascipt...
    - yarn add ts-node-dev -D

O TS-NODE-DEV será responsável por converter nosso código em tempo de execução para não precisarmos fazer isso manualmente toda vez que precisar executar o código.
Para que isso funcione será necessário adicionar o seguinte scrip no nosso arquivo .

<code>
"scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
},
</code>
    
    - --transpile-only 
        - Não fazer a verificação de erros na tipagem, por conta que o VS Code já faz isso em tempo de desenvolvimento.
    - --ignore-watch node_modules
        - ignorar se adicionarmos bibliotecas...

