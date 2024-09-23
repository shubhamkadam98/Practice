import React, { useEffect, useState } from 'react';
import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

function Publisher() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClick = (event) => {
    emitter.emit('update', text);
  };
  return (
    <>
      <h3>Publisher</h3>
      <input type="text" value={text} onChange={handleChange} />
      <button>Publish Data</button>
    </>

  );
}

function Subscriber() {

  const [data, setData] = useState('');

  useEffect(() => {
    const handleUpdate = (newData) => {
      setData(newData);
    };

    emitter.on('update', handleUpdate)
    return () => {
      emitter.off('update', handleUpdate);
    }}, []);

return (
  <>
    <h2>Subscriber</h2>
    <p>Data received : {data} </p>
  </>
);
};

function App() {
  return (
    <>
      <div>
        <p>React App Using Emmiter</p>
        <table>
          <tr>
            <td><Publisher /></td>
            <td></td>
          </tr>
          <tr>
          <td><Subscriber /></td>
          <td><Subscriber /></td>
          </tr>
        </table>

      </div>

    </>
  )
}

export default App
