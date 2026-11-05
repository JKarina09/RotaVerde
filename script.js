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

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    form.style.display = 'none';
    mensagem.classList.remove('oculto');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js');
    });
}