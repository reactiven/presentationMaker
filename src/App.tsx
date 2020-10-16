import React from 'react';
import './App.css';
import { Workspace } from './components/Workspace';
import { SideBar } from './components/Sidebar';
import { State } from './Entity/types';
import { TopPanel } from './components/TopPanel';
import { state } from './Entity/State';

type PropsType = {
  state: State
}

function App(props: PropsType): JSX.Element {
  return (
    <div>
      <TopPanel 
       state={state} 
      />
      <div className="presentation-block">
        <SideBar state={props.state}/>
        <Workspace />
      </div>
    </div>
  )
}

export default App
