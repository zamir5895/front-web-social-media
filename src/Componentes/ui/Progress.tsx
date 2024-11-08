import React from "react";

interface ProgressProps {
    valor: number;
}

const Progress : React.FC<ProgressProps> = ({valor}) =>{
    return (
        <div className="w-full bg-gray-200  rounded-full h-2.5" >
            <div 
            className="bg-blue-600  h-2.5 rounded-full"
            style = {{width: `${valor}%`}}
            />
        </div>
    )
}
export default Progress;