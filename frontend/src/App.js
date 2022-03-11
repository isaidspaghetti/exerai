
import React, { useContext, useEffect, useState } from 'react';
import ContentContainer from './components/ContentContainer';
import Movements from './components/Movements'
import Loading from './components/Loading';
import SideBar from './components/SideBar';
// import env from 'react-dotenv';

function App() {
  // const isLoading = useContext(React.createContext({ isLoading: true }));
  const [activeTab, setActiveTab] = useState()

  return (
    <div className ="flex bg-primary-500">
      <SideBar />
      {/* <Loading /> */}
      <Movements />
    </div>
  );
}

export default App;
