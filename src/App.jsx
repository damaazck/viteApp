import { useState } from "react";
import "./App.css";

export default function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  const agregar = (e) => {
    e.preventDefault();
    if (!tarea.trim()) return;

    setTareas([...tareas, {
      id: Date.now(),
      texto: tarea,
      completada: false
    }]);

    setTarea("");
  };

  const completar = (id) => {
    setTareas(tareas.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  };

  const eliminar = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  return (
    <main>
      <h1>Organizador de tareas</h1>

      <form onSubmit={agregar}>
        <input
          placeholder="Nueva tarea"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
        />
        <button>Agregar</button>
      </form>

      {tareas.map(t => (
        <article key={t.id}>
          <input
            type="checkbox"
            checked={t.completada}
            onChange={() => completar(t.id)}
          />

          <span style={{
            textDecoration: t.completada ? "line-through" : "none"
          }}>
            {t.texto}
          </span>

          <button onClick={() => eliminar(t.id)}>Eliminar</button>
        </article>
      ))}
    </main>
  );
}