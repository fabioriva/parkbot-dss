import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
// import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import Client from "./Client";
import Monitor from './Monitor';

export default function App() {
  const [data, setData] = useState({ online: false, monitors: [] })

  useEffect(() => {
    const interval = setInterval(() => {
      Client.fetch(json => setData(json))
    }, 1000)
    return () => clearInterval(interval)
  }, [data])

  return (
    <div className="App text-center">
      {/* <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item action href="#link1">
          Link 1
        </ListGroup.Item>
        <ListGroup.Item action href="#link2" disabled>
          Link 2
        </ListGroup.Item>
        <ListGroup.Item action href="#link3">
          This one is a button
        </ListGroup.Item>
      </ListGroup> */}
      <Routes>
        {/* {data.monitors !== undefined && data.monitors.map((monitor, key) => console.log(key, monitor))} */}
        <Route path="a" element={<Monitor online={data.online} monitor={data.monitors[0]} />} />
        <Route path="b" element={<Monitor online={data.online} monitor={data.monitors[1]} />} />
        <Route path="c" element={<Monitor online={data.online} monitor={data.monitors[2]} />} />
      </Routes>
    </div>
  );
}

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
