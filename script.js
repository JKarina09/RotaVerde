// Inicializar mapa — coordenadas de Cajamar/SP
const mapa = L.map('mapa-recicla').setView([-23.35, -46.88], 13);

// Adicionar camada pública de ruas do Esri (sem chave de API)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Sources: Esri, HERE, Garmin, USGS, Intermap, INCREMENT P, NRCan, Esri Japan, METI, Esri China (Hong Kong), OpenStreetMap contributors, and the GIS User Community',
    maxZoom: 19
}).addTo(mapa);

// Pontos de coleta mapeados
const pontos = [
    {
        nome: "EMEB Odir da Silva Araújo",
        endereco: "Rua Teodoro Sampaio, 411 — Jd. Adelaide",
        material: "Óleo de Cozinha",
        horario: "7h às 17h",
        lat: -23.352,
        lng: -46.875
    },
    {
        nome: "EMEB Vinícius de Silva",
        endereco: "Rua das Cisalpinas, 250",
        material: "Óleo de Cozinha",
        horario: "7h às 17h",
        lat: -23.358,
        lng: -46.882
    },
    {
        nome: "EMEB Victor H. Costa Possebon",
        endereco: "Rua Benedita Leme da Silva",
        material: "Óleo de Cozinha",
        horario: "8h às 16h",
        lat: -23.345,
        lng: -46.890
    },
    {
        nome: "Paço Municipal",
        endereco: "Praça José Rodrigues do Nascimento",
        material: "Papelão, Sacolas",
        horario: "8h às 15h",
        lat: -23.339,
        lng: -46.870
    }
];

// Adicionar marcadores no mapa
pontos.forEach(p => {
    L.marker([p.lat, p.lng])
        .addTo(mapa)
        .bindPopup(`
            <strong>${p.nome}</strong><br>
            ${p.endereco}<br>
            📦 ${p.material}<br>
            🕐 ${p.horario}
        `);
});

// Formulário de solicitação de coleta
const form = document.getElementById('form-coleta');
const mensagem = document.getElementById('mensagem-sucesso');
const mensagemErro = document.getElementById('mensagem-erro');
const botaoEnviar = form.querySelector('button[type="submit"]');
const configSupabase = window.SUPABASE_CONFIG;
const configuracaoValida = configSupabase
    && /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(configSupabase.url)
    && /^sb_publishable_[A-Za-z0-9_-]+$/.test(configSupabase.publishableKey);
const clienteSupabase = configuracaoValida && window.supabase
    ? window.supabase.createClient(configSupabase.url, configSupabase.publishableKey)
    : null;

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    mensagemErro.classList.add('oculto');
    mensagemErro.textContent = '';

    if (!clienteSupabase) {
        mensagemErro.textContent = 'O envio ainda não está configurado. Configure o projeto Supabase antes de testar.';
        mensagemErro.classList.remove('oculto');
        return;
    }

    botaoEnviar.disabled = true;

    try {
        const { error } = await clienteSupabase
            .from('solicitacoes_coleta')
            .insert({
                nome: document.getElementById('nome').value.trim(),
                bairro: document.getElementById('bairro').value.trim(),
                endereco: document.getElementById('endereco').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                material: document.getElementById('material').value,
                quantidade: document.getElementById('quantidade').value.trim(),
                horario: document.getElementById('horario').value || null
            });

        if (error) {
            throw error;
        }

        form.style.display = 'none';
        mensagem.classList.remove('oculto');
    } catch (error) {
        console.error('Falha ao enviar solicitação de coleta:', error);
        mensagemErro.textContent = 'Não foi possível enviar a solicitação. Verifique a conexão e tente novamente.';
        mensagemErro.classList.remove('oculto');
    } finally {
        botaoEnviar.disabled = false;
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js');
    });
}