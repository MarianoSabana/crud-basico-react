import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
// import shortid from "shortid";

// import { firebase } from "./firebase";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const obtenerDatos = async (db) => {
      const tareasCol = collection(db, "tareas");
      const tareaSnapshot = await getDocs(tareasCol);
      const tareasList = tareaSnapshot.docs.map((doc) => ({
        id: doc.id,
        nuevaTarea: doc.data().nuevaTarea,
      }));
      setTareas(tareasList);
    };

    obtenerDatos(db);
  }, []);

  const agregarTarea = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      // console.log("Elemento Vacío");
      setError("Elemento vacío");
      return;
    }

    try {
      const nuevoDocumento = await addDoc(collection(db, "tareas"), {
        nuevaTarea: tarea,
        fecha: Date.now(),
      });

      setTareas([...tareas, { id: nuevoDocumento.id, nuevaTarea: tarea }]);
      setTarea("");
      setError(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const eliminarTarea = async (id) => {
    // console.log(id);
    try {
      await deleteDoc(doc(db, "tareas", id));
    } catch (error) {}
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

  const editarTarea = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      // console.log("Elemento Vacío");
      setError("Elemento vacío");
      return;
    }

    try {
      await updateDoc(doc(db, "tareas", e.id), { nuevaTarea: tarea });
    } catch (error) {}

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
