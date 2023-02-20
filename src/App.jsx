import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento Vacío");
      return;
    }

    setTareas([...tareas, { id: shortid.generate(), nuevaTarea: tarea }]);

    setTarea("");
  };

  const eliminarTarea = (id) => {
    // console.log(id);
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center text-warning">MIS TAREAS DEL DÍA</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span className="lead mb-2">{item.nuevaTarea}</span>

                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => {
                    eliminarTarea(item.id);
                  }}
                >
                  Eliminar
                </button>

                <button className="btn btn-warning btn-sm float-end">
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">INGRESAR NUEVA TAREA</h4>
          <form onSubmit={agregarTarea}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese una Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            <button className="btn btn-dark btn-block" type="submit">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
