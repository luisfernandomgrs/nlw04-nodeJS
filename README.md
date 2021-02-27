# Agradecimentos

<span style="font-size: 80px">🚀</span>

<p>
Em especial a Daniele Leão Evangelista | @dani_lean<br/><br/>
A Dani foi nossa mentora durante 0 4º NLW entre os dia 22 e 28 de Fev./2021 promovido pela #Rocketseat;<br/><br/>
A toda equipe e a Rocketseat que têm feito muito a diferença no meu aprendizado que por enquanto luta para evitar a FOMO :)<br/><br/>
Este NLW foi diferente por conta das importantes dicas do Mayke Brito no Bootcamp dias antes do NLW4, também ofericido pela Rocketseat, onde o Maykão **carinhosamente nos recomendou a não pular etapas** e pra atender este pedido, dediquei muitas horas para o #Discover; Um programa gratuito de treinamento da Rocketseat que é incrivelmente muito bem elaborado.<br/><br/>
Tudo isso somado, me ajudaram a seguir para o próximo nível e concluir o projeto deste **#NLW** dentro do prazo e com muito aprendizado.<br/><br/>
<br/>
Com muito, carinho obrigado pela semana incrível,<br/>
Luis Fernando Machado
</p>

<br/><br/>

# Indíce Geral

- [Commands...](#-Commands...)
- [nlw04-nodeJS](#-nlw04-nodeJS)
- [Vamos ver usando TypeScript](#-Vamos-ver-usando-TypeScript)
- [Usando objeto e interface](#-Usando-objeto-e-interface)
- [Desestruturação de objeto como parâmetro](#-Usando-objetos-de-interface-Usando-desestruturação-de-objeto-como-parâmetro)
- [Instalando e resolvendo dependencias](#-Instalando-e-resolvendo-dependencias-durante-o-projeto...)
- [Dicas:](#-Dicas:-🚧)
- [Antes de testar nossos arquivos TypeScript](#-Antes-de-testar-nossos-arquivos-TypeScript)
- [Usando TypeORM](#-Usando-TypeORM)
- [Criar migration de usuário](#-Criar-migration-de-usuário)
- [Criar Migration e Model de Usuários](#-Para-criar-nossa-migration,-excute-o-cmd)
- [Acessando o banco de Dados](#-Acessando-o-banco-de-Dados)

<br/><br/>

# Commands...

- Executar a aplicação, naturalmente será executado o seu <ormconfig.json> também...:

  <code> yarn <nome_da_tag_script_definida_no_arquiv_package.json> -> dev </code>

- Criar uma Migration: Use apenas para criar sua Migration; Não é necessário executar a todo momento, ;)

  <code> yarn typeorm migration:create -n <nome_da_migration_a_ser_criada> -> CreateUsers </code>

- Executar uma Migration:

  <code> yarn typeorm migration:run </code>

<br/><br/>

# nlw04-nodeJS

Trabalhando com aplicação REST...<br/>
Vamos aprender os conceitos básicos sobre o que é uma API, entender o que é o NodeJS.

```ts
function enviarEmail(para, id, assunto, texto) {
  // Bilioteca de envio de e-mail
  console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario {
  send() {
    // Porém, imagine id, sendo um UUID
    // UUID => A universally unique identifier (UUID) is a 128-bit number used to identify
    // information in computer systems.

    enviarEmail("luisfernando@gmail.com", 9899, "Olá!", "Tudo bem?");

    // Isso daria erro na hora de execução, por conta de id ser uma string
    // e estarmos passando um inteiro
  }
}
```

<br/><br/>

## Vamos ver usando TypeScript

<br/>

```ts
function enviarEmail(para: String, id: String, assunto: String, texto: string) {
  console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario {
  send() {
    // Passando o mouse sobre o nome da função, podemos ver agora o tipo
    // declarado de cada parametro... Isso graças ao TypeScript
    // se mudarmos o parametro id para numerico, isso resultaria em um erro
    // em desenvolvimento.

    enviarEmail("luisfernando@gmail.com", "9899", "Olá!", "Tudo bem?");
  }
}
```

<br/><br/>

## Usando objeto e interface

<br/>

```ts
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
      texto: "Tudo bem?",
    });
  }
}
```

<br/><br/>

# Usando objetos de interface <br/>Usando desestruturação de objeto como parâmetro

```ts
function enviarEmail({ para, id, assunto, texto }: DadosDeEnvioEmail) {
  console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario {
  send() {
    // Agora precisamos passar um objeto
    enviarEmail({
      para: "luisfernando@gmail.com",
      id: "9899",
      assunto: "Olá!",
      texto: "Tudo bem?",
    });
  }
}
```

<br/><br/>

# 🚀 Instalando e resolvendo dependencias durante o projeto...

<br/>
### inicializa o projeto

```bash
yarn init -y
```

### instala o Express

```bash
yarn add express
```

### instala o Type Express

```bash
yarn add @types/express -D
```

### instala o Typescript, para permitir compilar/executar nossa aplicação

```bash
yarn add typescript -D
```

### Para permitir o uso de UUID

```bash
yarn add uuid
yarn add @types/uuid -D
```

### Vamos instalar o pacote typeorm reflect-metadata

```bash
yarn add typeorm reflect-metadata
```

### sqlite3, Pra mim ele é um arquivo de tabelas, mas dizem que é um DB

```bash
yarn add sqlite3
```

<br/><br/>

### Dicas: 🚧

<br/>
- instala apenas em ambiente de projeto as definições externas de métodos/funçõespara facilitar a visualização usando Ctrl+D
- Usams o parâmetro **-D** para fazer a instalação das dependencias somente para nosso ambiente de desenvolvimento
- Nosso código é compilado, por isso precisamos instalar o TypeScript, que irá "traduzir" nosso código para o JavaScript antes de ser executado.
- Se você estiver usando a extensão SQLite no VS Code, para ter acesso as tabelas depois de criadas, Pressione Ctrl+Shift+P e digite SQLite: Open Database

<br/><br/>

# Antes de testar nossos arquivos TypeScript

## precisamos inicializar o typescript em nossa aplicação

```bash
yarn tsc --init
```

Podemos modificar o parametro strict do arquivo tsconfig.json

```ts
"strict": false,                           /* Enable all strict type-checking options. */
```

Precisamos instalar como dependencia de desenvolvimento o TS-NODE-DEV para converter/traduzir
nosso código typescript para javascipt...

```bash
    - yarn add ts-node-dev -D
```

O TS-NODE-DEV será responsável por converter nosso código em tempo de execução para não precisarmos
fazer isso manualmente toda vez que precisar executar o código.
Para que isso funcione será necessário adicionar o seguinte scrip no nosso arquivo .

```ts
"scripts": {

    // Não fazer a verificação de erros na tipagem, por conta que o VS Code já faz isso em tempo de desenvolvimento.
    //--transpile-only

    // ignorar se adicionarmos bibliotecas...
    // --ignore-watch node_modules

    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
},
```

<br/><br/>

## Usando TypeORM

[Type ORM](https://typeorm.io/#/)

<br/><br/>

# Criar migration de usuário

Nosso arquivo package.json deverá ficar desta forma para fazermos uso da CLI migrationsDir:

```ts
{
    "type": "sqlite",
    "database": "./src/database/database.sqlite",
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}
```

## Para criar nossa migration, excute o cmd:

```bash
yarn typeorm migration:create -n CreateUsers
```

<br/><br/>

# Criar um model de usuário

Após criar o model da table, no seu arquivo ./src/database/migrations/1614102976635-CreateUsers.ts

## Execute sua migration desta forma:

```bash
yarn typeorm migrations:run
```

<br/><br/>

# Acessando o banco de Dados

Para fazer o teste e verificar seu banco de dados e tabelas...<br/>Pode usar a extensão SQLite do VS Code ou utilizar o Beekeeper Studio. O download pode ser realizado pela url:

- [Beekeeper](https://www.beekeeperstudio.io/)<br/>
- [SQLite](https://www.sqlite)

No caso de precisar fazer um acesso a arquivos no ubuntu/wsl2...<br/>
Sua pasta base de procura deverá ser algo semelhante a isto: \\wsl$\Ubuntu-20.04\home\...

Se você optar pela extensão SQLite no VS Code sobre o WSL... Será necessário também instalar o SQLite dentro do seu WSL, para ter acesso a visualização das tabela no seu painel de explorção dentro do VS Code.

Para ter acesso as tabelas depois de criadas, Pressione Ctrl+Shift+P e digite SQLite: Open Database

```bash
yarn add sqlite3
```

<br/><br/>

# Criar um controller do usuário

# Criar rota do usuário
