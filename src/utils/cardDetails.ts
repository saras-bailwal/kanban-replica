export type Status = "Backlog" | "Todo" | "In progress" | "Done" | "Canceled";
export type Priority = "No priority" | "Low" | "Medium" | "High" | "Urgent";



export type Details = {
    "id": string,
    "title": string,
    "tag": [string],
    "userId": string,
    "status": Status,
    "priority": number
}

export type Users = {
    "id": string,
    "name": string,
    "available": boolean
}

export const statuses: Status[] = ["Backlog" , "Todo" , "In progress" , "Done" , "Canceled"];
export const priorities: Priority[] = ["No priority" , "Low" , "Medium" , "High" , "Urgent"];

export type Board =  {
    name: string,
    tasks: Details[]
}

export type BoardState =  {
    ticketReducer: {
        tickets: Board,
        users: Users[]
    }
}