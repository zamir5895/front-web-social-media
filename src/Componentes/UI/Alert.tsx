import React, { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AlertProps {
  variant?: 'exito' | 'error';
  title: string;
  description: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'exito',
  title,
  description
}) => {
  const variantClasses = variant === 'exito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const icon = variant === 'exito' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />;
  return (
    <div className={`p-4 rounded-lg flex items-center ${variantClasses}`}>
      {icon}
      <div className="ml-2">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </div>
    </div>
  );
};
export const AlertTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
    <p className="font-semibold text-sm">{children}</p>
  );
  
  export const AlertDescription: React.FC<{ children: ReactNode }> = ({ children }) => (
    <p className="text-sm">{children}</p>
  );