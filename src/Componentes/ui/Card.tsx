import React, { ReactNode } from "react";

interface CardProps {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {children}
    </div>
);

export const CardHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="p-4 border-b">
        {children}
    </div>
);

export const CardTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-bold text-gray-800">{children}</h2>
);

export const CardDescription: React.FC<{ children: ReactNode }> = ({ children }) => (
    <p className="text-gray-600">{children}</p>
);

export const CardContent: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="p-4">
        {children}
    </div>
);

export const CardFooter: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="p-4 border-t">
        {children}
    </div>
);
