export default function Task({title,text,taskStatus}){
    let borderColor;
    switch(taskStatus){
        case 'To Do':{
            borderColor = "blue-400"
            break
        }
        case 'In Progress':{
            borderColor = "orange-400"
            break
        }
        case 'Done':{
            borderColor = "purple-500"
            break
        }
        case 'Approved':{
            borderColor = "green-500"
            break
        }
    }
    // ${borderColor}
    return(
        <div className={`bg-inherit flex flex-col w-[90%] ml-[5%] border-3 p-2 pl-4 rounded-xl border-${borderColor} justify-between gap-2`}>
            <div className="text-base">
                {title}
            </div>
            <div className="text-xs">
                {text}
            </div>
        </div>
    )
}