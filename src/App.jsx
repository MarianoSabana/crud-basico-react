import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import shortid from "shortid";

// import { firebase } from "./firebase";
import { useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import { app } from "./firebase";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState(null);

  useEffect(() => {
    // const obtenerDatos = async () => {
    //   try {
    //     const db = app.firestore();
    //     const data = await db.collection("tareas").get();
    //     console.log(data.docs);
    //   } catch (error) {}
    // };

    const db = getFirestore(app);
    const obtenerDatos = async (db) => {
      const tareasCol = collection(db, "tareas");
      const tareaSnapshot = await getDocs(tareasCol);
      const tareasList = tareaSnapshot.docs.map((doc) => {
        console.log(doc.data().tarea);
        setTareas([...tareas, { id: doc.id, nuevaTarea: doc.data().tarea }]);
        console.log(doc.id);
      });
    };

    obtenerDatos(db);
  }, []);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      // console.log("Elemento Vacío");
      setError("Elemento vacío");
      return;
    }

    setTareas([...tareas, { id: shortid.generate(), nuevaTarea: tarea }]);

    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    // console.log(id);
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const editar = (item) => {
    // console.log(item);
    setModoEdicion(true);
    setTarea(item.nuevaTarea);
    setId(item.id);
  };

  const cancelar = () => {
    setModoEdicion(false);
    setTarea("");
  };

  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      // console.log("Elemento Vacío");
      setError("Elemento vacío");
      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: id, nuevaTarea: tarea } : item
    );

    setTareas(arrayEditado);

    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-warning">MIS TAREAS DEL DÍA</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">NO HAY TAREAS</li>
            ) : (
              tareas.map((item) => (
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

                  <button
                    className="btn btn-warning btn-sm float-end"
                    onClick={() => {
                      editar(item);
                    }}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? `Editar Tarea` : `Insertar Tarea Nueva`}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder={
                modoEdicion
                  ? "Ingrese la tarea editada"
                  : "Ingrese una nueva tarea"
              }
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />

            {modoEdicion ? (
              <div>
                <button className="btn btn-warning btn-block" type="submit">
                  Editar
                </button>
                <button
                  className="btn btn-dark btn-block mx-2"
                  type="submit"
                  onClick={() => {
                    cancelar();
                  }}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
      <hr />
      <footer>MARIANO LUIS SABANA MENDOZA</footer>
    </div>
  );
}

export default App;
