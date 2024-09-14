import { priorityFlags } from "../../utils/prirorityFlags"
import "../../App.css";
import { Details } from "../../utils/cardDetails";

interface DetailsList {
    details: Details
}

export const Task = ({details}: DetailsList) => {
    return (
        <div className="card">
        <div className="d-flex" style={{justifyContent: "space-between"}}>
          <div className="card-id">
            {details.id}
          </div>
          <div>
          <div className='kanban-avatar'>
            <img className='kanban-avatar-image' src='https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' alt=''/>
            <span className='kanban-avatar-status'></span>
          </div>
          </div>
        </div>
        
        <div className="card-title">
          {details.title}
        </div>

        <div className="d-flex" style={{gap: "10"}}>
          <div className="card-minibox">
            <img src={priorityFlags[details.priority]} className="card-priority"/>
          </div>

          <div className="card-minibox" style={{marginLeft: "12px"}}>
            <span className="grey-circle"></span>
            <span className="card-tag">{details.tag[0]}</span>
          </div>
        </div>
        
      </div>
    )
}