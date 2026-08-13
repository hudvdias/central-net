# Central Net

Projeto para melhoria da Central Net utilizando React.

**Central Net** é um diretório onde é reunida toda a informação de auxílio para a equipe de atendimento ao cliente de plano de saúde.

## Objetivo

O objetivo do projeto era melhorar o site atual, onde os administradores tinham que editar o código fonte diretamente para criar um novo informativo.
Além disso, não habia nenhum campo de pesquisa ou roteamento, e os atendentes tinham que "decorar" o caminho das informações, o que muita das vezes não acontecia e atrasava o atendimento.

## Desafio

O desafio era criar uma aplicação que seria hospedada em ums ervidor ISS através de uma pasta compartilhada na intranet.
Como não tinha acesso ao ISS Manager, muito menos a um banco de dados, optei por utilizar arquivos JSON como mantenedor desses dados.
Por fim, a limitação de recursos e acesso não garantiu que o projeto fosse para frente.

## Como rodar o projeto

1. Clone o repositório para sua máquina local;
2. Crie os arquivos `categories.json` e `posts.json` na pasta public, ou baixe os backups e cole na pasta;
3. Execute `npm install` para instalar as dependências;
4. Execute `npm run dev` para roder o projeto localmente.

## Deploy

1. Execute `npm run build`;
2. Copie o conteúdo da pasta `dist` para a pasta da Central Net `\\srv-ap04` (Precisa de acesso).
