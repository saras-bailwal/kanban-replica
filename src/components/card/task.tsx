import { priorityFlags } from "../../utils/imgFlags"
import "../../App.css";
import { Details, BoardState } from "../../utils/cardDetails";
import { useSelector } from "react-redux";
import React from "react";
interface DetailsList {
    details: Details,
}

export const Task = ({details}: DetailsList) => {
    const getUsersData = useSelector((state: BoardState) => {
        return (state.ticketReducer.users)
      });
    
    const RenderUserImg = React.memo(() => {
        return (<div className='kanban-avatar'>
        <img className='kanban-avatar-image' src='https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' alt=''/>
        {getUsersData.map((user, indx) => (
            (user.available) ? <span className='kanban-avatar-status-green' key={indx}></span> : <span className='kanban-avatar-status-grey' key={indx}></span>
        ))}
      </div>)
    })
    
    return (
        <div className="card" key={details.id}>
        <div className="d-flex" style={{justifyContent: "space-between"}}>
          <div className="card-id">
            {details.id}
          </div>
          <div>
       <RenderUserImg />
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