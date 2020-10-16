import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Workspace } from './components/Workspace';
import { TopPanel } from './components/TopPanel';

function App(): JSX.Element {
  return (
    <div>
      <TopPanel />
      <div className="presentation-block">
        <Sidebar />
        <Workspace />
      </div>
    </div>
  )
}

export default App
