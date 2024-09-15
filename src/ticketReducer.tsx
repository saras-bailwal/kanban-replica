import { createSlice } from "@reduxjs/toolkit";
import { Details, Users, priorities, statuses, Board } from "./utils/cardDetails";


interface boardState {
    tickets: Details[],
    users: Users[]
}

const initialState : boardState = {
    tickets: [],
    users: []
};


const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        loadUsers: (state, action) => {
            return {
                ...state,
                users: action.payload
            }
        },
        orderBy: (state, action) => {
            if (action.payload.sortBy === "priority") {
                return {
                    ...state,
                    tickets: action.payload.currentData.map((dat: Board) => {
                        const sortedValues = [...dat.tasks].sort((a,b) => b['priority'] - a['priority'])
                        return ({name: dat.name, tasks: sortedValues})
                    })
                }
            } else {
                return {
                    ...state,
                    tickets: action.payload.currentData.map((dat: Board) => {
                        const sortedValues = [...dat.tasks].sort((a,b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
                        return ({name: dat.name, tasks: sortedValues})
                    })
                }
            }
           
        },
        groupBy: (state, action) => {
            if (action.payload.groupby === "userId") {
                return {
                    ...state,
                    tickets: action.payload.users.map((det: Users) => {
                        const cardsIncolsUsr = action.payload.data.filter((task: Details) => task.userId === det.id)
                        return ({ name: det.name, tasks: cardsIncolsUsr })
                    })
                }
            } else if (action.payload.groupby === "priority") {
                return {
                    ...state,
                    tickets: priorities.map((det, indx) => {
                        const cardsIncolsUsr = action.payload.data.filter((task: Details) => task.priority === indx)
                        return ({ name: det, tasks: cardsIncolsUsr })
                    })
                }
            } else {
                const filteredData = statuses.map((det) => {
                    const cardsIncolsUsr = action.payload.data.filter((task: Details) => task.status === det)
                    return ({ name: det, tasks: cardsIncolsUsr })
                })
                return {
                    ...state,
                    tickets: filteredData
                }
               
            }
        }
    }
})
export const {loadUsers, groupBy, orderBy} = ticketsSlice.actions;
export default ticketsSlice.reducer;