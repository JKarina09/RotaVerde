create table if not exists public.solicitacoes_coleta (
    id uuid primary key default gen_random_uuid(),
    nome text not null check (char_length(btrim(nome)) between 2 and 120),
    bairro text not null check (char_length(btrim(bairro)) between 2 and 120),
    endereco text not null check (char_length(btrim(endereco)) between 5 and 250),
    telefone text not null check (char_length(btrim(telefone)) between 8 and 30),
    material text not null check (material in (
        'Papel e Papelão',
        'Plástico',
        'Vidro',
        'Metal',
        'Óleo de cozinha',
        'Mistura de materiais'
    )),
    quantidade text not null check (char_length(btrim(quantidade)) between 1 and 100),
    horario time,
    criado_em timestamptz not null default now()
);

alter table public.solicitacoes_coleta enable row level security;

revoke all on table public.solicitacoes_coleta from public, anon, authenticated;
grant insert on table public.solicitacoes_coleta to anon;

drop policy if exists "Permitir envio publico de solicitacoes" on public.solicitacoes_coleta;
create policy "Permitir envio publico de solicitacoes"
on public.solicitacoes_coleta
for insert
to anon
with check (true);
