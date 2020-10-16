import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Workspace } from './components/Workspace';
import { SideBar } from './components/Sidebar';
import { State } from './Entity/types';
import { TopPanel } from './components/TopPanel';

function App(state: State): JSX.Element {
  return (
    <div>
      <TopPanel />
      <div className="presentation-block">
        <SideBar state={state}/>
        <Workspace />
      </div>
    </div>
  )
}

export default App
