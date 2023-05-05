import './app.css';
import { useState } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const d = new Date();
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = weekday[d.getDay()];
  const reg = /^[^\s][\w\W]+$/gm;

  const del = (id) => {
    const newToDos = toDos.filter((toDo) => toDo.id !== id);
    setToDos(newToDos);
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input type="text" value={toDo} onChange={(e) => setToDo(e.target.value)} placeholder="🖊️ Add item..." />
        <i
          onClick={() => {
            if (reg.test(toDo)) {
              setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
              setToDo('');
            }
          }}
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((val, index) => {
          return (
            <div key={val.id} className="todo">
              <div className="left">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    setToDos(
                      toDos.map((toDo) => {
                        if (toDo.id === val.id) {
                          return { ...toDo, status: e.target.checked };
                        }
                        return toDo;
                      })
                    );
                  }}
                />
                <p>{val.text}</p>
              </div>
              <div className="right">
                <i onClick={() => del(val.id)} className="fas fa-times"></i>
              </div>
            </div>
          );
        })}
        <br />
        <h2 style={{ paddingTop: '10px' }}>Completed tasks</h2>
      </div>
      {toDos.map((data) => {
        if (data.status) {
          return (
            <div key={data.id} className="cmplt">
              <h3>{data.text}</h3>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default App;
