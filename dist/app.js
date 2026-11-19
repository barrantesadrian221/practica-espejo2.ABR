import { TaskManager } from "./models/TaskManager.js";
const taskManager = new TaskManager();
const formulario = document.querySelector("#form-tareas");
const botonesFiltro = document.querySelectorAll(".btn-filtro");
if (!formulario || botonesFiltro.length === 0) {
    throw new Error("No se encontraron el formulario o los botones de filtro.");
}
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    taskManager.agregarTarea();
});
botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
        const filtro = boton.dataset.filtro;
        if (filtro !== "Todas" && filtro !== "Pendientes" && filtro !== "Completadas") {
            throw new Error(`Filtro no válido: ${filtro ?? "(sin definir)"}.`);
        }
        botonesFiltro.forEach((botonFiltro) => {
            botonFiltro.classList.toggle("active", botonFiltro === boton);
        });
        taskManager.filtrar(filtro);
    });
});
taskManager.pintarTareas();
//# sourceMappingURL=app.js.map