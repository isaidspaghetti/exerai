import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SideBar from './components/SideBar';
import App from './App';
import { Link, Route, Routes, BrowserRouter} from 'react-router-dom';
import { render } from "react-dom";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={
        <>
          <h1>There's nothing here</h1>
          <Link to="/">Go home</Link>
        </>
      } />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// const routing = (
//   <Router>
//     <React.StrictMode>
//       <SideBar />
//       <Switch>
//         <Route exact path="/" component={App} />
//       </Switch>
//     </React.StrictMode>
//   </Router>
// )


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
