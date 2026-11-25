# Plano de treinamento de funcionário — Portal Escolar

Este documento orienta um instrutor a capacitar um funcionário da escola para navegar no Portal Escolar e praticar as tarefas disponíveis para seu perfil.

> **Atenção:** o Portal Escolar atual é um protótipo demonstrativo. Não use dados pessoais, notas reais ou informações oficiais da escola durante o treinamento.

## Público e duração

- **Público:** funcionários que usarão o perfil de professor ou administrador.
- **Duração sugerida:** 40 a 45 minutos.
- **Formato:** demonstração guiada seguida de prática individual.
- **Materiais:** computador ou celular com navegador; projetor, se disponível.

## Resultados esperados

Ao final, o funcionário deverá conseguir:

1. Entrar com a conta e o perfil corretos.
2. Encontrar as telas relevantes para sua função.
3. Executar uma tarefa de exemplo sem ajuda.
4. Consultar a Central de suporte.
5. Explicar onde os dados ficam armazenados e reconhecer as limitações do protótipo.

## Preparação do instrutor

1. Abra `index.html` em um navegador ou inicie o projeto pelo Live Server do VS Code.
2. Verifique a tela inicial e os atalhos de acesso rápido.
3. Prepare uma conta de demonstração:

   | Perfil | Usuário | Senha |
   | --- | --- | --- |
   | Professor | `professor` | `demo123` |
   | Administrador | `admin` | `demo123` |

4. Use uma conta fictícia. Não cadastre informações reais da escola.
5. Pergunte qual perfil o funcionário deverá usar e concentre a prática nas tarefas desse perfil.

## Roteiro da sessão

### 1. Abertura e objetivo — 3 minutos

**Diga ao participante:** “Vamos praticar as tarefas disponíveis no portal. Este ambiente é uma demonstração; não é o sistema oficial da escola.”

- Explique a duração e o objetivo da sessão.
- Confirme se o participante usará o perfil de professor ou administrador.

### 2. Entrada e navegação — 7 minutos

1. Mostre os campos de usuário, senha e perfil.
2. Entre com a conta fictícia correspondente.
3. Mostre a Visão geral e explique que as opções do menu dependem do perfil.
4. Em celular ou tablet na vertical, demonstre o ícone de hambúrguer para abrir e fechar o menu.
5. Mostre o botão **Sair**.

**Peça ao funcionário:** “Encontre no menu a área que você usará para a sua tarefa principal.”

### 3. Demonstração da função — 12 minutos

#### Trilha do professor

1. Abra **Minhas turmas** e mostre os dados de exemplo.
2. Em **Lançar notas**, use **+ Lançar nota** e preencha aluno, disciplina, período e nota.
3. Em **Registrar frequência**, use **+ Registrar chamada** e escolha data e situação.
4. Em **Atividades**, use **+ Publicar atividade** e preencha título, disciplina, turma e prazo.
5. Volte à tela correspondente para mostrar o registro demonstrativo.

#### Trilha do administrador

1. Em **Alunos**, pesquise um registro e demonstre **+ Novo aluno**.
2. Em **Professores**, demonstre **+ Novo professor**.
3. Em **Turmas**, demonstre **+ Nova turma**.
4. Mostre as áreas de notas, frequência, atividades e comunicados.
5. Se demonstrar exclusão de aluno, use apenas um cadastro criado para o exercício; não remova dados de exemplo sem autorização.

### 4. Prática acompanhada — 12 minutos

Peça ao funcionário que repita a tarefa da trilha escolhida, sem o instrutor controlar o mouse ou o celular.

- **Professor:** lançar uma nota fictícia ou registrar uma chamada de teste.
- **Administrador:** cadastrar uma turma fictícia ou localizar um aluno pela busca.
- Peça que confirme o resultado na lista ou tabela.
- Se houver dificuldade, dê uma instrução de cada vez e deixe o participante executar a ação.

### 5. Suporte e dúvidas — 4 minutos

1. Abra **Suporte** no menu.
2. Demonstre a busca de perguntas frequentes usando um termo como “senha”.
3. Explique que a Central responde dúvidas comuns, mas não abre chamados nem envia mensagens à equipe da escola.
4. Para informações oficiais, oriente o funcionário a procurar a secretaria ou o administrador responsável.

### 6. Revisão — 4 minutos

Faça estas perguntas:

- Qual perfil você deve selecionar ao entrar?
- Onde você encontra sua tarefa principal?
- Como confirma que um registro de demonstração foi incluído?
- Os dados aparecem em outro dispositivo?
- Onde procura uma resposta rápida?

## Limitações a explicar antes do uso

- O sistema não tem servidor nem banco de dados remoto.
- Contas e alterações ficam no `localStorage` do navegador e não são sincronizadas entre dispositivos.
- Limpar os dados do navegador pode apagar os registros locais.
- A recuperação de senha e o envio de chamados ainda não existem.
- Os dados são ilustrativos e podem não corresponder à conta utilizada.
- O cadastro de perfis não substitui a gestão segura de usuários de um sistema oficial.
- Não use credenciais reais, dados pessoais, notas ou informações escolares oficiais.

## Lista de conclusão do instrutor

- [ ] O funcionário entrou com o perfil de demonstração correto.
- [ ] O funcionário localizou as áreas que usará na função.
- [ ] O funcionário concluiu uma tarefa prática sem ajuda direta.
- [ ] O funcionário encontrou a Central de suporte.
- [ ] O funcionário entendeu que os dados são locais e não oficiais.
- [ ] O funcionário sabe a quem recorrer na escola para dúvidas sobre o sistema oficial.

**Data do treinamento:** ____________________

**Nome do funcionário:** ____________________

**Instrutor:** ____________________
