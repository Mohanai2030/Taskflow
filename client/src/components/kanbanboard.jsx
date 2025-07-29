import Task from "./task";

export default function KanbanBoard(){
    return(
        <div className="KanbanContainer text-2xl font-bold border flex w-[90%] ml-[5%] mt-[5%] justify-evenly p-4">
            <div className="border-2 min-w-[20%] min-h-[500px] b-radius-[20px] rounded-xl overflow-hidden">
                <div className="text-center pt-2 pb-2 bg-blue-400">
                    To Do
                </div>
                <div className="flex-col justify-center p-1 pt-4">
                    <Task title={"Client routing"} text={"Add basic routing for the website"} taskStatus={"To Do"}/>
                </div>
            </div>
            <div className="border-2 min-w-[20%] min-h-[500px] b-radius-[20px] rounded-xl overflow-hidden">
                <div className="text-center pt-2 pb-2 bg-orange-300">
                    In Progress
                </div>
                <div className="flex-col justify-center p-1 pt-4">
                    <Task title={"Client routing"} text={"Add basic routing for the website"} taskStatus={"In Progress"}/>
                </div>
            </div>
            <div className="border-2 min-w-[20%] min-h-[500px] b-radius-[20px] rounded-xl overflow-hidden">
                <div className="text-center pt-2 pb-2 bg-purple-400">
                    Done
                </div>
                <div className="flex-col justify-center p-1 pt-4">
                    <Task title={"Client routing"} text={"Add basic routing for the website"} taskStatus={"Done"}/>
                </div>
            </div>
            <div className="border-2 min-w-[20%] min-h-[500px] b-radius-[20px] rounded-xl overflow-hidden">
                <div className="text-center pt-2 pb-2 bg-green-500">
                    Approved
                </div>
                <div className="flex-col justify-center p-1 pt-4">
                    <Task title={"Client routing"} text={"Add basic routing for the website"} taskStatus={"Approved"}/>
                </div>
            </div>
        </div>  
    )
}