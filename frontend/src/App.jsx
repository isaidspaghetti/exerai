import React from 'react';
import { Movements } from './components/Movements';
import { SideBar } from './components/SideBar';

function App() {
  return (
    <div className="flex bg-primary-500">
      <SideBar />
      <Movements />
    </div>
  );
}

export { App };
