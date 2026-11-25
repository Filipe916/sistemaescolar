# Portal Escolar

Protótipo de um portal de gestão escolar feito com HTML, CSS e JavaScript. A interface funciona no navegador, sem etapa de compilação ou instalação de dependências.

## Funcionalidades

- Acesso e cadastro de contas nos perfis de aluno, professor e administrador.
- Painéis e opções de navegação de acordo com o perfil.
- Gestão demonstrativa de alunos, professores, turmas, notas, frequência, atividades e comunicados.
- Central de suporte com perguntas frequentes e busca.
- Layout responsivo para celulares, tablets e computadores.

## Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/Filipe916/sistemaescolar.git
   ```

2. Abra a pasta do projeto.
3. Abra `index.html` no navegador. Também é possível executar o projeto com uma extensão de servidor local, como Live Server no VS Code.

Não é necessário instalar pacotes ou compilar o projeto.

## Contas de demonstração

Use a senha `demo123` com uma das contas abaixo e selecione o perfil correspondente:

| Perfil | Usuário |
| --- | --- |
| Aluno | `aluno` |
| Professor | `professor` |
| Administrador | `admin` |

Também é possível usar os botões de acesso rápido na tela inicial.

## Armazenamento e segurança

Este projeto é apenas uma demonstração front-end. As contas e os dados ficam no `localStorage` do navegador, não são sincronizados entre dispositivos e podem ser apagados ao limpar os dados do navegador. As senhas de demonstração não são protegidas por um serviço de autenticação.

Não use senhas, informações pessoais ou dados escolares reais. O projeto não substitui um sistema escolar de produção.
