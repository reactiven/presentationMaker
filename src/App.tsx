import React, {useEffect} from 'react';
import './App.css';
import { SideBar } from './components/sidebar/Sidebar';
import { TopPanel } from './components/topPanel/TopPanel';
import { Workspace } from './components/workspace/Workspace';
import { State } from './Entity/types';


type PropsType = {
  state: State
}

function App(props: PropsType): JSX.Element {

  useEffect(() => {
      document.title = props.state.presentationInfo.name
  }, [props.state])

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
