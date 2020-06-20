# Recuperação de senha

**RF - Requisitos funcionais**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções para recuperação de senha;
- O usuário deve poder alterar sua senha;

**RNF - Requisitos não funcionais**

- Utilizar o Mailtrap para testar envio de e-mail, em ambiente de desenvolvimento;
- Utilizar Amazon SES para envio de e-mail em ambiente de produção;
- O envio de e-mails deve acontecer em segundo plano;

**RN - Regras de negócio**

- O link de alteração de senha, enviado ao e-mail do usuário, deve expirar em 2 horas;
- O usuário deve confirmar a senha alterada, inserindo-a 2 vezes no formulário;

# Atualização do perfil do usuário

**RF**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail existente no banco de dados;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador, no dia ,devem ser armazenados em cache;
- As notificações do prestador devem ser armazanedas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real, utilizando Socket.io;

**RN**

- A notificação deve poder ser alterada entre lida e não lida, pelo prestador;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês específico, com pelo menos um horário disponível, de um prestador específico;
- O usuário deve poder listar os horários disponíveis de um dia específico, de um prestador específico;
- O usuário deve poder realizar um novo agendamento com um prestador específico;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1 hora exatamente;
- Os agendamentos deve estar disponíveis entre 8h e 18h (O último horário disponível será o das 17h);
- O usuário não deve poder agendar um horário ocupado;
- O usuário não deve poder agendar um horário que já passou;
- O usuário não deve poder agendar um serviço consigo mesmo;
