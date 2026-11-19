export class TaskManager {
    tareas = [
        { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
        { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
        { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false },
    ];
    filtroActual = 'Todas';
    // funcion para agregar una nueva tarea al arreglo de tareas y actualizar la vista
    agregarTarea() {
        const formulario = document.querySelector('#form-tareas');
        const inputTitulo = document.querySelector('#input-titulo');
        const selectPrioridad = document.querySelector('#select-prioridad');
        if (!formulario || !inputTitulo || !selectPrioridad) {
            throw new Error('No se encontraron los elementos necesarios para agregar una tarea.');
        }
        const titulo = inputTitulo.value.trim();
        const prioridad = selectPrioridad.value;
        if (!titulo || (prioridad !== 'Alta' && prioridad !== 'Media' && prioridad !== 'Baja')) {
            return;
        }
        const nuevaTarea = {
            id: Date.now(),
            titulo,
            prioridad,
            completada: false,
        };
        this.tareas = [...this.tareas, nuevaTarea];
        this.pintarTareas();
        formulario.reset();
    }
    //Metodo para pintar las tareas en la interfaz de usuario, filtrando según el estado 
    pintarTareas() {
        const listaContenedor = document.querySelector('#lista-tareas');
        if (!listaContenedor) {
            throw new Error('No se encontró el contenedor de tareas.');
        }
        listaContenedor.innerHTML = '';
        const tareasFiltradas = this.tareas.filter((tarea) => {
            if (this.filtroActual === 'Pendientes') {
                return !tarea.completada;
            }
            if (this.filtroActual === 'Completadas') {
                return tarea.completada;
            }
            return true;
        });
        tareasFiltradas.forEach((tarea) => {
            const elementoTarea = document.createElement('li');
            elementoTarea.classList.add('item-tarea', tarea.prioridad);
            if (tarea.completada) {
                elementoTarea.classList.add('completada');
            }
            const textoTarea = document.createElement('span');
            textoTarea.textContent = `${tarea.titulo} (${tarea.prioridad})`;
            const botonEstado = document.createElement('button');
            botonEstado.type = 'button';
            botonEstado.textContent = tarea.completada ? 'Marcar Pendiente' : 'Completar';
            botonEstado.addEventListener('click', () => {
                this.cambiarEstado(tarea.id);
            });
            elementoTarea.append(textoTarea, botonEstado);
            listaContenedor.appendChild(elementoTarea);
        });
    }
    filtrar(filtro) {
        this.filtroActual = filtro;
        this.pintarTareas();
    }
    // Metodo para cambiar el estado
    cambiarEstado(id) {
        const tareaExiste = this.tareas.some((tarea) => tarea.id === id);
        if (!tareaExiste) {
            throw new Error(`No se encontró la tarea con id ${id}.`);
        }
        this.tareas = this.tareas.map((tarea) => tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea);
        this.pintarTareas();
    }
}
//# sourceMappingURL=TaskManager.js.map