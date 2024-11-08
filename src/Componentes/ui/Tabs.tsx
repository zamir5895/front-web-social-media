import React, {useState, ReactNode} from "react";

interface TabProps {
    valor:string;
    onValueChange: (valor:string) => void;
    children:  React.ReactNode;    
}
export const Tab: React.FC<TabProps> = ({valor, onValueChange, children}) => {
    return (
        <div >
            {children}
        </div>
    );
}

interface TabsListProps{
    children: React.ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({children})=>{
    return <div className="flex space-x-4">{children}</div>
}

interface TabsTriggerProps{
    valor:string;
    children: React.ReactNode;
    onClick: (valor:string) => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({valor, children, onClick})=>{
    return (
        <button
            onClick={()=>onClick(valor)}
            className={`px-4 py-2 rounded-lg ${valor === children ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
                {children}
            </button>
    );
};

interface TabsContentProps{
    valor:string;
    valorActual:string;
    children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({valor, valorActual, children})=>{
    return valor === valorActual ? <div>{children}</div >:null;
};