const $ = s => document.querySelector(s);
const seed = {
  users: [
    { id: 1, name: 'Aluno de demonstração', user: 'aluno', password: 'demo123', role: 'aluno', email: 'aluno@exemplo.com' },
    { id: 2, name: 'Professor de demonstração', user: 'professor', password: 'demo123', role: 'professor', email: 'professor@exemplo.com' },
    { id: 3, name: 'Administrador', user: 'admin', password: 'demo123', role: 'admin', email: 'admin@exemplo.com' }
  ],
  students: [{ id: 1, name: 'Ana Silva', user: 'ana.silva', class: '2º A', email: 'ana@exemplo.com', status: 'Ativo' }, { id: 2, name: 'Bruno Costa', user: 'bruno.costa', class: '2º A', email: 'bruno@exemplo.com', status: 'Ativo' }, { id: 3, name: 'Carla Souza', user: 'carla.souza', class: '1º B', email: 'carla@exemplo.com', status: 'Ativo' }],
  teachers: [{ id: 1, name: 'Mariana Lima', subject: 'Matemática', email: 'mariana@exemplo.com' }, { id: 2, name: 'Rafael Alves', subject: 'História', email: 'rafael@exemplo.com' }],
  classes: [{ id: 1, name: '2º A', level: 'Ensino Médio', shift: 'Matutino', year: '2026' }, { id: 2, name: '1º B', level: 'Ensino Médio', shift: 'Vespertino', year: '2026' }],
  grades: [{ id: 1, student: 'Ana Silva', subject: 'Matemática', term: '3º trimestre', grade: 8.7 }, { id: 2, student: 'Ana Silva', subject: 'Português', term: '3º trimestre', grade: 9.0 }, { id: 3, student: 'Bruno Costa', subject: 'Matemática', term: '3º trimestre', grade: 7.5 }],
  attendance: [{ id: 1, student: 'Ana Silva', subject: 'Matemática', date: '2026-11-24', status: 'Presente' }, { id: 2, student: 'Bruno Costa', subject: 'História', date: '2026-11-24', status: 'Ausente' }, { id: 3, student: 'Carla Souza', subject: 'Português', date: '2026-11-24', status: 'Presente' }],
  notices: [{ id: 1, title: 'Período de avaliações', body: 'Consulte o calendário e confirme os conteúdos com seus professores.', date: '24/11/2026' }, { id: 2, title: 'Reunião pedagógica', body: 'Comunicado demonstrativo da coordenação escolar.', date: '20/11/2026' }],
  tasks: [{ id: 1, title: 'Lista de exercícios de Matemática', subject: 'Matemática', due: '2026-11-28', class: '2º A' }]
};
let db; try { db = JSON.parse(localStorage.getItem('portal_escolar_db')) || seed } catch (e) { db = seed }
if (!Array.isArray(db.users)) db.users = seed.users;
function save() { localStorage.setItem('portal_escolar_db', JSON.stringify(db)) }
let current = null, page = 'inicio';
const menus = {
  aluno: [['inicio', '⌂', 'Visão geral'], ['boletim', '▤', 'Meu boletim'], ['frequencia', '◷', 'Minha frequência'], ['tarefas', '✓', 'Atividades'], ['calendario', '▦', 'Calendário'], ['avisos', '♧', 'Comunicados'], ['perfil', '◎', 'Meu perfil'], ['suporte', '?', 'Suporte']],
  professor: [['inicio', '⌂', 'Visão geral'], ['turmas', '▧', 'Minhas turmas'], ['notas', '▤', 'Lançar notas'], ['chamada', '◷', 'Registrar frequência'], ['tarefas', '✓', 'Atividades'], ['avisos', '♧', 'Comunicados'], ['suporte', '?', 'Suporte']],
  admin: [['inicio', '⌂', 'Visão geral'], ['alunos', '♙', 'Alunos'], ['professores', '♟', 'Professores'], ['turmas', '▧', 'Turmas'], ['notas', '▤', 'Notas'], ['frequencia', '◷', 'Frequência'], ['tarefas', '✓', 'Atividades'], ['avisos', '♧', 'Comunicados'], ['suporte', '?', 'Suporte']]
};
const names = { aluno: 'Aluno de demonstração', professor: 'Professor de demonstração', admin: 'Administrador' };
const supportFaqs = [
  ['Como faço para entrar no portal?', 'Digite seu usuário e sua senha, selecione o perfil correspondente e toque em Entrar. O usuário e o perfil escolhidos precisam pertencer à mesma conta.'],
  ['Esqueci meu usuário ou minha senha. O que faço?', 'A recuperação de conta ainda não está disponível neste protótipo. As contas ficam salvas somente neste navegador. Para ajuda com uma conta oficial, procure o administrador da escola.'],
  ['Como crio uma conta?', 'Na tela de acesso, toque em Criar uma conta, preencha seus dados e selecione o perfil. Use dados fictícios: este protótipo não é um sistema oficial.'],
  ['Por que não consigo acessar?', 'Confira se digitou o usuário e a senha corretamente e se selecionou o perfil usado no cadastro. Se o problema continuar em uma conta oficial, fale com o administrador da escola.'],
  ['Meus dados aparecem em outro celular ou computador?', 'Não. Neste protótipo, os dados são armazenados apenas no navegador e dispositivo em que foram cadastrados. Eles não são sincronizados.'],
  ['Onde encontro notas, frequência e atividades?', 'As opções disponíveis dependem do seu perfil. Use o menu de navegação para abrir boletim, frequência, atividades, turmas ou comunicados.'],
  ['Como falo com o suporte da escola?', 'Este protótipo não envia chamados. Para dúvidas sobre dados oficiais ou acesso à escola, procure a secretaria ou o administrador da instituição.']
];
function authenticate() {
  let u = $('#user').value.trim().toLowerCase();
  let p = $('#pass').value.trim();
  let r = $('#role').value;
  const account = db.users.find(item => item.user.toLowerCase() === u && item.password === p && item.role === r);
  if (account) {
    current = { role: account.role, name: account.name };
    page = 'inicio';
    sessionStorage.setItem('portal_demo_role', r);
    $('#loginError').textContent = '';
    openApp();
  } else {
    $('#loginError').textContent = 'Acesso não autorizado. Confira usuário, senha e perfil selecionado.';
  }
}
$('#loginForm').addEventListener('submit', e => { e.preventDefault(); authenticate() });
$('#openRegister').onclick = registerForm;
document.querySelectorAll('.quick-login').forEach(btn => btn.addEventListener('click', () => {
  const r = btn.dataset.role;
  $('#role').value = r;
  $('#user').value = r;
  $('#pass').value = 'demo123';
  authenticate();
}));
const mobileMenu = document.querySelector('.layout aside');
function closeMobileMenu() {
  mobileMenu.classList.remove('menu-open');
  mobileMenu.style.removeProperty('--menu-top');
  const toggle = $('#menuToggle');
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }
}
document.addEventListener('click', e => {
  const toggle = e.target.closest('#menuToggle');
  if (toggle) {
    const isOpen = !mobileMenu.classList.contains('menu-open');
    if (isOpen) {
      mobileMenu.style.setProperty('--menu-top', `${Math.ceil(toggle.getBoundingClientRect().bottom + 8)}px`);
      mobileMenu.classList.add('menu-open');
    } else {
      closeMobileMenu();
    }
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    return;
  }
  if (!mobileMenu.contains(e.target)) closeMobileMenu();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('menu-open')) {
    closeMobileMenu();
    const toggle = $('#menuToggle');
    if (toggle) toggle.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 620) closeMobileMenu();
});
function openApp() { if (!current) return; closeMobileMenu(); $('#login').classList.add('hidden'); $('#app').classList.remove('hidden'); $('#who').textContent = current.name || names[current.role]; $('#avatar').textContent = current.role[0].toUpperCase(); $('#nav').innerHTML = menus[current.role].map(x => `<button class="nav ${x[0] === page ? 'active' : ''}" data-page="${x[0]}"><span>${x[1]}</span>${x[2]}</button>`).join(''); $('#nav').querySelectorAll('button').forEach(b => b.onclick = () => { closeMobileMenu(); render(b.dataset.page) }); render(page) }
function logout() { closeMobileMenu(); current = null; sessionStorage.removeItem('portal_demo_role'); $('#app').classList.add('hidden'); $('#login').classList.remove('hidden'); $('#pass').value = ''; $('#user').value = ''; $('#loginError').textContent = ''; }
$('#logout').onclick = logout; $('#closeModal').onclick = () => $('#modal').classList.add('hidden');
function head(title, sub, tag = '') { return `<div class="head"><div><div class="eyebrow">${current.role.toUpperCase()} • PORTAL ESCOLAR</div><h2>${title}</h2><div class="muted">${sub}</div></div><div class="head-tools">${tag ? `<span class="badge info">${tag}</span>` : ''}<button type="button" class="menu-toggle" id="menuToggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav"><span class="hamburger-icon" aria-hidden="true"></span></button></div></div>` }
function stat(label, val, note) { return `<div class="card"><div class="stat-label">${label}</div><div class="stat-value">${val}</div><div class="stat-note">${note}</div></div>` }
function table(headers, rows) { return `<div class="table-wrap"><table class="table"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.join('') : `<tr><td colspan="${headers.length}" class="empty">Nenhum registro encontrado.</td></tr>`}</tbody></table></div>` }
function row(cells) { return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>` }
function render(p) {
  page = p; $('#nav').querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.page === p)); let out = '';
  if (p === 'inicio') { let r = current.role; out = head('Bem-vindo(a)!', 'Resumo das informações do ambiente escolar.', 'Ano letivo 2026') + `<div class="grid stats">${r === 'aluno' ? stat('Média demonstrativa', '8,6', 'Notas cadastradas') + stat('Frequência', '96%', 'Presença ilustrativa') + stat('Atividades', db.tasks.length, 'Atividades publicadas') + stat('Comunicados', db.notices.length, 'Avisos disponíveis') : r === 'professor' ? stat('Turmas', db.classes.length, 'Turmas cadastradas') + stat('Alunos', db.students.length, 'Alunos no exemplo') + stat('Notas lançadas', db.grades.length, 'Registros demonstrativos') + stat('Atividades', db.tasks.length, 'Atividades publicadas') : stat('Alunos', db.students.length, 'Cadastros de demonstração') + stat('Professores', db.teachers.length, 'Cadastros de demonstração') + stat('Turmas', db.classes.length, 'Turmas cadastradas') + stat('Comunicados', db.notices.length, 'Avisos publicados')}</div><div class="grid two"><div class="card"><h3>Atalhos</h3><div class="item">Consulte as informações usando o menu lateral.<small>As opções disponíveis variam conforme seu perfil.</small></div><div class="item">Dados de demonstração editáveis neste navegador.<small>Não representam registros oficiais de uma escola.</small></div></div><div class="card"><h3>Comunicados recentes</h3>${db.notices.slice(0, 3).map(n => `<div class="item"><b>${esc(n.title)}</b><small>${esc(n.date)} • ${esc(n.body)}</small></div>`).join('')}</div></div>` }
  else if (p === 'alunos' && current.role === 'admin') { out = head('Gestão de alunos', 'Cadastre, pesquise e acompanhe estudantes.') + `<div class="card"><div class="toolbar"><input id="search" placeholder="Pesquisar aluno..."><button class="primary" onclick="studentForm()">+ Novo aluno</button></div><div id="studentTable">${studentTable()}</div></div>` }
  else if (p === 'professores' && current.role === 'admin') { out = head('Gestão de professores', 'Cadastro e organização do corpo docente.') + `<div class="card"><div class="toolbar"><button class="primary" onclick="teacherForm()">+ Novo professor</button></div>${table(['Nome', 'Disciplina', 'E-mail'], db.teachers.map(t => row([esc(t.name), esc(t.subject), esc(t.email)])))}</div>` }
  else if (p === 'turmas' && (current.role === 'admin' || current.role === 'professor')) { out = head('Turmas', 'Consulte as turmas e suas informações.') + `<div class="card">${current.role === 'admin' ? '<div class="toolbar"><button class="primary" onclick="classForm()">+ Nova turma</button></div>' : ''}${table(['Turma', 'Etapa', 'Turno', 'Ano'], db.classes.map(c => row([esc(c.name), esc(c.level), esc(c.shift), esc(c.year)])))}</div>` }
  else if (p === 'boletim' || p === 'notas') { let rows = db.grades.filter(g => current.role !== 'aluno' || g.student === 'Ana Silva').map(g => row([esc(g.student), esc(g.subject), esc(g.term), g.grade.toFixed(1), g.grade >= 6 ? '<span class="badge">Atingida</span>' : '<span class="badge warn">Atenção</span>'])); out = head(current.role === 'aluno' ? 'Meu boletim' : 'Lançamento de notas', 'Notas de exemplo por estudante e disciplina.') + `<div class="card">${current.role !== 'aluno' ? `<div class="toolbar"><button class="primary" onclick="gradeForm()">+ Lançar nota</button></div>` : ''}${table(['Aluno', 'Disciplina', 'Período', 'Nota', 'Situação'], rows)}</div>` }
  else if (p === 'frequencia' || p === 'chamada') { let rows = db.attendance.filter(a => current.role !== 'aluno' || a.student === 'Ana Silva').map(a => row([esc(a.student), esc(a.subject), esc(a.date), a.status === 'Presente' ? '<span class="badge">Presente</span>' : '<span class="badge warn">Ausente</span>'])); out = head(current.role === 'aluno' ? 'Minha frequência' : 'Registro de frequência', 'Acompanhamento de presença nas aulas.') + `<div class="card">${current.role !== 'aluno' ? `<div class="toolbar"><button class="primary" onclick="attendanceForm()">+ Registrar chamada</button></div>` : ''}${table(['Aluno', 'Disciplina', 'Data', 'Situação'], rows)}</div>` }
  else if (p === 'tarefas') { out = head(current.role === 'aluno' ? 'Minhas atividades' : 'Atividades e trabalhos', 'Acompanhe atividades e prazos.') + `<div class="card">${current.role !== 'aluno' ? `<div class="toolbar"><button class="primary" onclick="taskForm()">+ Publicar atividade</button></div>` : ''}${table(['Atividade', 'Disciplina', 'Turma', 'Entrega'], db.tasks.map(t => row([esc(t.title), esc(t.subject), esc(t.class), esc(t.due)])))}</div>` }
  else if (p === 'avisos') { out = head('Comunicados', 'Avisos e informações da comunidade escolar.') + `<div class="card">${current.role === 'admin' ? `<div class="toolbar"><button class="primary" onclick="noticeForm()">+ Novo comunicado</button></div>` : ''}${db.notices.map(n => `<div class="item"><b>${esc(n.title)}</b><small>${esc(n.date)} • ${esc(n.body)}</small></div>`).join('') || '<div class="empty">Nenhum comunicado.</div>'}</div>` }
  else if (p === 'suporte') { out = head('Central de suporte', 'Encontre respostas para as dúvidas mais comuns.') + `<div class="card support-card"><div class="field"><label for="supportSearch">Buscar uma dúvida</label><input class="support-search" id="supportSearch" type="search" placeholder="Ex.: senha, notas, cadastro"></div><div class="faq-list" id="supportFaq">${supportFaqs.map(([question, answer]) => `<details class="faq-item"><summary>${esc(question)}</summary><div class="faq-answer">${esc(answer)}</div></details>`).join('')}</div><div id="supportEmpty" class="empty hidden">Nenhuma dúvida encontrada. Tente buscar por outro termo.</div><div class="hint support-contact"><b>Precisa de ajuda com dados oficiais?</b><br>Procure a secretaria ou o administrador da sua escola. Este protótipo não envia chamados.</div></div>` }
  else if (p === 'calendario') { out = head('Calendário escolar', 'Datas acadêmicas e prazos importantes.') + `<div class="card"><h3>Novembro de 2026</h3>${['24/11 — Período de avaliações', '28/11 — Entrega de atividade', '04/12 — Reunião pedagógica'].map(x => `<div class="item">${x}</div>`).join('')}</div>` }
  else if (p === 'perfil') { out = head('Meu perfil', 'Informações do usuário conectado.') + `<div class="card"><h3>${names[current.role]}</h3><div class="item">Perfil de acesso<small>${current.role}</small></div><div class="item">Ambiente<small>Demonstração local</small></div><div class="hint">Em uma implantação real, os dados do perfil serão carregados do banco de dados após a autenticação.</div></div>` }
  else { out = head('Área não disponível', 'Este recurso não faz parte do seu perfil de acesso.') }
  $('#main').innerHTML = out;
  if ($('#search')) $('#search').oninput = () => $('#studentTable').innerHTML = studentTable($('#search').value);
  if ($('#supportSearch')) $('#supportSearch').oninput = () => {
    let visible = 0;
    const query = $('#supportSearch').value.trim().toLowerCase();
    $('#supportFaq').querySelectorAll('.faq-item').forEach(item => {
      const matches = item.textContent.toLowerCase().includes(query);
      item.hidden = !matches;
      if (matches) visible++;
    });
    $('#supportEmpty').classList.toggle('hidden', visible > 0);
  };
}
function studentTable(q = '') { let list = db.students.filter(s => (s.name + s.class + s.email).toLowerCase().includes(q.toLowerCase())); return table(['Nome', 'Turma', 'E-mail', 'Status', 'Ações'], list.map(s => row([esc(s.name), esc(s.class), esc(s.email), '<span class="badge">Ativo</span>', `<button class="secondary" onclick="deleteStudent(${s.id})">Excluir</button>`]))) }
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])) }
function openModal(title, body) { $('#modalTitle').textContent = title; $('#modalBody').innerHTML = body; $('#modal').classList.remove('hidden') }
function formField(label, name, placeholder = '', type = 'text') { return `<div class="field"><label>${label}</label><input name="${name}" type="${type}" placeholder="${placeholder}" required></div>` }
function registerForm() {
  openModal('Criar conta', `<form id="registerForm" class="form-grid">
    ${formField('Nome completo', 'name', 'Seu nome')}
    ${formField('Nome de usuário', 'user', 'ex: maria.santos')}
    ${formField('E-mail', 'email', 'voce@escola.com', 'email')}
    ${formField('Senha', 'password', 'Mínimo 6 caracteres', 'password')}
    <div class="field"><label>Tipo de conta</label><select name="role" required>
      <option value="aluno">Aluno</option>
      <option value="professor">Professor</option>
      <option value="admin">Administrador</option>
    </select></div>
    <div class="wide hint">Esta demonstração salva a conta somente neste navegador. Não use uma senha real.</div>
    <div class="wide error" id="registerError"></div>
    <div class="wide actions"><button class="primary" type="submit">CRIAR CONTA</button></div>
  </form>`);
  $('#registerForm').onsubmit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    d.name = d.name.trim();
    d.user = d.user.trim().toLowerCase();
    d.email = d.email.trim().toLowerCase();
    d.password = d.password.trim();
    if (d.password.length < 6) {
      $('#registerError').textContent = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }
    if (db.users.some(item => item.user.toLowerCase() === d.user)) {
      $('#registerError').textContent = 'Este nome de usuário já está cadastrado.';
      return;
    }
    db.users.push({ id: Date.now(), ...d });
    if (d.role === 'aluno') db.students.push({ id: Date.now(), name: d.name, user: d.user, class: 'Não definida', email: d.email, status: 'Ativo' });
    if (d.role === 'professor') db.teachers.push({ id: Date.now(), name: d.name, subject: 'Não definida', email: d.email });
    save();
    $('#modal').classList.add('hidden');
    $('#loginError').textContent = '';
    $('#user').value = d.user;
    $('#pass').value = d.password;
    $('#role').value = d.role;
    $('#loginError').textContent = 'Conta criada com sucesso. Clique em ENTRAR para acessar.';
  };
}
function studentForm() { openModal('Cadastrar aluno', `<form id="entityForm" class="form-grid">${formField('Nome completo', 'name')}${formField('Turma', 'class')}${formField('E-mail', 'email', 'aluno@escola.com', 'email')}<div class="wide actions"><button class="primary">Salvar aluno</button></div></form>`); $('#entityForm').onsubmit = e => { e.preventDefault(); let d = Object.fromEntries(new FormData(e.target)); db.students.push({ id: Date.now(), ...d, status: 'Ativo' }); save(); $('#modal').classList.add('hidden'); render(page) } }
function teacherForm() { openModal('Cadastrar professor', `<form id="entityForm">${formField('Nome completo', 'name')}${formField('Disciplina', 'subject')}${formField('E-mail', 'email', '', 'email')}<button class="primary">Salvar professor</button></form>`); $('#entityForm').onsubmit = e => { e.preventDefault(); db.teachers.push({ id: Date.now(), ...Object.fromEntries(new FormData(e.target)) }); save(); $('#modal').classList.add('hidden'); render(page) } }
function classForm() { openModal('Cadastrar turma', `<form id="entityForm" class="form-grid">${formField('Nome da turma', 'name')}${formField('Etapa', 'level')}${formField('Turno', 'shift')}${formField('Ano letivo', 'year')}<div class="wide"><button class="primary">Salvar turma</button></div></form>`); $('#entityForm').onsubmit = e => { e.preventDefault(); db.classes.push({ id: Date.now(), ...Object.fromEntries(new FormData(e.target)) }); save(); $('#modal').classList.add('hidden'); render(page) } }
function gradeForm() { openModal('Lançar nota', `<form id="entityForm">${formField('Nome do aluno', 'student')}${formField('Disciplina', 'subject')}${formField('Período', 'term', '3º trimestre')}${formField('Nota (0 a 10)', 'grade', '8.5', 'number')}<button class="primary">Salvar nota</button></form>`); $('#entityForm').onsubmit = e => { e.preventDefault(); let d = Object.fromEntries(new FormData(e.target)); d.grade = Math.max(0, Math.min(10, Number(d.grade))); db.grades.push({ id: Date.now(), ...d }); save(); $('#modal').classList.add('hidden'); render(page) } }
function attendanceForm() { openModal('Registrar frequência', `<form id="entityForm">${formField('Nome do aluno', 'student')}${formField('Disciplina', 'subject')}${formField('Data', 'date', '', 'date')}<div class="field"><label>Situação</label><select name="status"><option>Presente</option><option>Ausente</option></select></div><button class="primary">Salvar chamada</button></form>`); $('#entityForm').onsubmit = e => { e.preventDefault(); db.attendance.push({ id: Date.now(), ...Object.fromEntries(new FormData(e.target)) }); save(); $('#modal').classList.add('hidden'); render(page) } }
function taskForm() { openModal('Publicar atividade', `<form id="entityForm">${formField('Título', 'title')}${formField('Disciplina', 'subject')}${formField('Turma', 'class')}${formField('Data de entrega', 'due', '', 'date')}<button class="primary">Publicar</button></form>`); $('#entityForm').onsubmit = e => { e.preventDefault(); db.tasks.push({ id: Date.now(), ...Object.fromEntries(new FormData(e.target)) }); save(); $('#modal').classList.add('hidden'); render(page) } }
function noticeForm() { openModal('Novo comunicado', `<form id="entityForm">${formField('Título', 'title')}${formField('Data', 'date', 'DD/MM/AAAA')}<div class="field"><label>Mensagem</label><textarea name="body" rows="4" required></textarea></div><button class="primary">Publicar comunicado</button></form>`); $('#entityForm').onsubmit = e => { e.preventDefault(); db.notices.unshift({ id: Date.now(), ...Object.fromEntries(new FormData(e.target)) }); save(); $('#modal').classList.add('hidden'); render(page) } }
function deleteStudent(id) { if (confirm('Excluir este aluno do protótipo?')) { db.students = db.students.filter(s => s.id !== id); save(); render(page) } }
let storedRole = sessionStorage.getItem('portal_demo_role'); if (storedRole && Object.prototype.hasOwnProperty.call(names, storedRole)) { const account = db.users.find(item => item.role === storedRole); current = { role: storedRole, name: account ? account.name : names[storedRole] }; page = 'inicio'; openApp() }
