const datosHorario = [
    { codigo: '0413', asignatura: 'PROGRAMACION WEB', grupo: 'Gpo1', dia: 'MARTES', horario: '10:00 - 11:40', aula: 'E201', color: 'table-primary' },
    { codigo: '0413', asignatura: 'PROGRAMACION WEB', grupo: 'Gpo1', dia: 'JUEVES', horario: '15:00 - 16:40', aula: 'E201', color: 'table-primary' },
    
    { codigo: '0402', asignatura: 'INTRO. INGENIERIA', grupo: 'Gpo3', dia: 'LUNES', horario: '08:00 - 09:40', aula: 'D104', color: 'table-success' },
    { codigo: '0402', asignatura: 'INTRO. INGENIERIA', grupo: 'Gpo3', dia: 'MIERCOLES', horario: '08:00 - 09:40', aula: 'D104', color: 'table-success' },
    
    { codigo: '0402', asignatura: 'INTRO. INGENIERIA', grupo: 'Gpo4', dia: 'LUNES', horario: '10:00 - 11:40', aula: 'E201', color: 'table-success' },
    { codigo: '0402', asignatura: 'INTRO. INGENIERIA', grupo: 'Gpo4', dia: 'JUEVES', horario: '08:00 - 09:40', aula: 'E201', color: 'table-success' },

    { codigo: '0402', asignatura: 'INTRO. INGENIERIA', grupo: 'Gpo7', dia: 'LUNES', horario: '15:00 - 16:40', aula: 'D104', color: 'table-success' },
    { codigo: '0402', asignatura: 'INTRO. INGENIERIA', grupo: 'Gpo7', dia: 'JUEVES', horario: '13:00 - 14:40', aula: 'D104', color: 'table-success' },
    
    { codigo: '0402', asignatura: 'INTRO. INGENIERIA', grupo: 'Gpo8', dia: 'MARTES', horario: '15:00 - 16:40', aula: 'D104', color: 'table-success' },
    { codigo: '0402', asignatura: 'INTRO. INGENIERIA', grupo: 'Gpo8', dia: 'MIERCOLES', horario: '13:00 - 14:40', aula: 'D104', color: 'table-success' }
];

const diasSemana = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
const bloquesHorarios = ['08:00 - 09:40', '10:00 - 11:40', '13:00 - 14:40', '15:00 - 16:40'];

const pesosDias = { 'LUNES': 1, 'MARTES': 2, 'MIERCOLES': 3, 'JUEVES': 4, 'VIERNES': 5 };

datosHorario.sort((a, b) => {
    if (pesosDias[a.dia] !== pesosDias[b.dia]) {
        return pesosDias[a.dia] - pesosDias[b.dia]; 
    }
    return a.horario.localeCompare(b.horario);
});

function renderizarLista(datosParaMostrar = datosHorario) {
    let html = `
    <div class="card shadow-sm border-0">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle m-0">
                    <thead class="table-dark text-center">
                        <tr>
                            <th>CÓDIGO</th><th class="text-start">ASIGNATURA</th><th>GRUPO</th><th>DÍA</th><th>HORARIO</th><th>AULA</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">`;
    
    if (datosParaMostrar.length === 0) {
        html += `<tr><td colspan="6" class="text-muted py-4">No se encontraron resultados</td></tr>`;
    } else {

        datosParaMostrar.forEach(clase => {
            html += `
                <tr class="${clase.color}">
                    <td>${clase.codigo}</td>
                    <td class="text-start fw-bold">${clase.asignatura}</td>
                    <td><span class="badge text-bg-${clase.color === 'table-primary' ? 'primary' : 'success'}">${clase.grupo}</span></td>
                    <td>${clase.dia}</td>
                    <td>${clase.horario}</td>
                    <td><span class="badge text-bg-dark">${clase.aula}</span></td>
                </tr>`;
        });
    }

    html += `</tbody></table></div></div></div>`;
    document.getElementById('contenedor-lista').innerHTML = html;
}
function renderizarCalendario() {
    let html = `
    <div class="card shadow-sm border-0">
        <div class="table-responsive">
            <table class="table table-bordered text-center align-middle m-0">
                <thead class="table-dark">
                    <tr><th>HORA / DÍA</th>`;
    
    diasSemana.forEach(dia => html += `<th>${dia}</th>`);
    html += `</tr></thead><tbody>`;

    bloquesHorarios.forEach(hora => {
        html += `<tr><td class="fw-bold bg-light">${hora}</td>`;
        
        diasSemana.forEach(dia => {
            const clase = datosHorario.find(c => c.dia === dia && c.horario === hora);
            
            if (clase) {
                html += `
                    <td class="${clase.color} p-2 border border-secondary">
                        <div class="fw-bold small">${clase.asignatura}</div>
                        <span class="badge text-bg-dark mt-1">${clase.grupo}</span>
                        <span class="badge text-bg-light text-dark mt-1">${clase.aula}</span>
                    </td>`;
            } else {
                html += `<td></td>`;
            }
        });
        html += `</tr>`;
    });

    html += `</tbody></table></div></div>`;
    document.getElementById('contenedor-calendario').innerHTML = html;
}

document.getElementById('btn-lista').addEventListener('click', () => {
    document.getElementById('contenedor-lista').classList.replace('d-none', 'd-block');
    document.getElementById('contenedor-calendario').classList.replace('d-block', 'd-none');
    document.getElementById('btn-lista').classList.replace('btn-outline-primary', 'btn-primary');
    document.getElementById('btn-calendario').classList.replace('btn-primary', 'btn-outline-primary');
});

document.getElementById('btn-calendario').addEventListener('click', () => {
    document.getElementById('contenedor-calendario').classList.replace('d-none', 'd-block');
    document.getElementById('contenedor-lista').classList.replace('d-block', 'd-none');
    document.getElementById('btn-calendario').classList.replace('btn-outline-primary', 'btn-primary');
    document.getElementById('btn-lista').classList.replace('btn-primary', 'btn-outline-primary');
});

window.onload = () => {
    renderizarLista();
    renderizarCalendario();
};

document.getElementById('buscador').addEventListener('input', (evento) => {
    const texto = evento.target.value.toLowerCase();
    
    const datosFiltrados = datosHorario.filter(clase => 
        clase.asignatura.toLowerCase().includes(texto) || 
        clase.codigo.includes(texto) ||                   
        clase.aula.toLowerCase().includes(texto) ||       
        clase.dia.toLowerCase().includes(texto)           
    );

    renderizarLista(datosFiltrados);
});