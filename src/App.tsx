import "./App.css";
import {Task} from "./components/card/task";
import { Details, tasks } from "./utils/cardDetails";


function App() {




  
  return (
    <div className="kanban-column-list">
      {tasks.map((task) => {
        return (
          <Task details={task}/>
        )
      })}
    </div>
  )
}

export default App
