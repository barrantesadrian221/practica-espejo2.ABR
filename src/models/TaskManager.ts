import type { Tarea } from '../interfaces/tarea.interface';

export class TaskManager {
  private tareas: Tarea[] = [
    { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
    { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
    { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false },
  ];

  private filtroActual: string = 'Todas';
// funcion para agregar una nueva tarea al arreglo de tareas y actualizar la vista
  public agregarTarea(): void {
    const formulario = document.querySelector<HTMLFormElement>('#form-tareas');
    const inputTitulo = document.querySelector<HTMLInputElement>('#input-titulo');
    const selectPrioridad = document.querySelector<HTMLSelectElement>('#select-prioridad');

    if (!formulario || !inputTitulo || !selectPrioridad) {
      throw new Error('No se encontraron los elementos necesarios para agregar una tarea.');
    }

    const titulo = inputTitulo.value.trim();
    const prioridad = selectPrioridad.value;
    if (!titulo || (prioridad !== 'Alta' && prioridad !== 'Media' && prioridad !== 'Baja')) {
      return;
    }

    const nuevaTarea: Tarea = {
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
  public pintarTareas(): void {
    const listaContenedor = document.querySelector<HTMLUListElement>('#lista-tareas');
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

  public cambiarEstado(id: number): void {
    const tareaExiste = this.tareas.some((tarea) => tarea.id === id);
    if (!tareaExiste) {
      throw new Error(`No se encontró la tarea con id ${id}.`);
    }

    this.tareas = this.tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea,
    );
    this.pintarTareas();
  }
}