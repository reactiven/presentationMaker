import React from 'react';
import './App.css';
import { Workspace } from './components/Workspace';
import { SideBar } from './components/Sidebar';
import { State } from './Entity/types';
import { TopPanel } from './components/TopPanel';

type PropsType = {
  state: State
}

function App(props: PropsType): JSX.Element {
  return (
    <div className="app-layout">
      <TopPanel
        state={props.state} 
      />
      <div className="presentation-block">
        <SideBar state={props.state}/>
        <Workspace state={props.state}/>
      </div>
    </div>
  )
}

export default App
