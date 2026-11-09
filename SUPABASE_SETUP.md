# Configuração do Supabase

O formulário só confirma o envio depois que o Supabase aceitar e gravar a solicitação. Sem configuração, ele mostra um erro e não finge que os dados foram enviados.

## Preparar o banco

1. Crie um projeto no [Supabase](https://supabase.com/).
2. No painel do projeto, abra **SQL Editor**, cole o conteúdo de `supabase/schema.sql` e execute.
3. Em **Connect** (ou nas configurações de API do projeto), copie o **Project URL** e a chave **publishable** (`sb_publishable_...`).
4. Preencha `url` e `publishableKey` em `supabase-config.js`.
5. Publique novamente o site e teste com dados fictícios. Confira o registro na tabela `solicitacoes_coleta` pelo painel do Supabase.

## Segurança e dados pessoais

- A chave publishable pode estar no código do navegador; ela não é uma chave secreta. Nunca coloque uma chave `secret` ou `service_role` neste projeto.
- O banco permite que visitantes não autenticados insiram solicitações, mas não permite que o navegador leia, altere ou apague registros. Consulte os pedidos pelo painel autenticado do Supabase.
- Nome, telefone e endereço são dados pessoais. Antes de coletar dados reais, defina e informe quem é responsável pelo tratamento, a finalidade, quem terá acesso, por quanto tempo os dados serão guardados e como alguém pode pedir a exclusão.
- Esta configuração não inclui autenticação administrativa, CAPTCHA nem proteção contra spam. Faça primeiro um piloto controlado com dados fictícios; não divulgue para coleta pública de dados reais até completar essas proteções e os avisos de privacidade.
