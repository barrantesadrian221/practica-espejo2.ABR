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
    //this.pintarTareas();
    formulario.reset();
  }
}