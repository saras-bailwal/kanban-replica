import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Task } from "./components/card/task";
import { Details, Users } from "./utils/cardDetails";
import { useDispatch, useSelector } from "react-redux";
import { groupBy, loadUsers, orderBy } from "./ticketReducer";

function App() {
  const [boardData, setBoardData] = useState<Details[]>([]);
  const [usersData, setUsersData] = useState<Users[]>([]);
  const filteredUsers = useSelector((state: any) => {
    return (state.ticketReducer.tickets)
  });
  const dispatch = useDispatch();
  const displayWin = useRef(null);


   useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
    .then(response => response.json())
    .then(data => {
      setBoardData(data.tickets);
      setUsersData(data.users);
      dispatch(loadUsers(data.users))
      dispatch(groupBy({data: data.tickets, grouby: 'status'}))
    })
  },[])


  const handleOrderBy = (e: any) => {
    dispatch(orderBy({currentData: filteredUsers, sortBy: e.target.value}))
  }


  return (
    <>
    <header>
      <div className="parent">
      <div className="display-menu" tabIndex={0}>
        <img src="/src/assets/Display.svg" /> Display
      </div>
      <ul className="dropdown open" ref={displayWin}>
        <li>
          <span>Grouping By</span> 
        <select id="groupBy" name="groupBy" onChange={(e) => {
            dispatch(groupBy({data: boardData, groupby: e.target.value, users: usersData}))
          }}>
          <option value="status">Status</option>
          <option value="userId">User</option>
          <option value="priority">Priority</option>
        </select>
        </li>
        <li>
        <span>Ordering By</span> 
        <select id="sortBy" name="sortBy" onChange={(e) => {
            handleOrderBy(e)
          }}>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
        </li>
      </ul>
      </div>
    </header>
      <div className="kanban">
        <div className="kanban-container">
          {filteredUsers.map((col: any) => {
            return (
              <>
                <div className="kanban-column" key={col.name}>
                  <div className="kanban-column-header">
                    <span>{col.name}</span>
                    <span>
                      <img src="/src/assets/add.svg" />
                      <img src="/src/assets/Menu.svg" style={{ paddingLeft: "6px" }} />
                    </span>
                  </div>
                  <div className="kanban-column-list">
                    {col.tasks.map((task: Details) => <Task details={task} key={task.id} />)}
                  </div>
                </div>

              </>
            );
          })}

        </div>
      </div>



    </>

  )
}

export default App
