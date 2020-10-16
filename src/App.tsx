import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Workspace } from './components/Workspace';
import { TopPanel } from './components/TopPanel';
import { SideBar } from './components/Sidebar';

function App(): JSX.Element {
  return (
    <div>
      <TopPanel />
      <div className="presentation-block">
        <SideBar />
        <Workspace />
      </div>
    </div>
  )
}

export default App
