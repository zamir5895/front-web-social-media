import React, { useState, ReactElement, ReactNode } from "react";

interface SelectProps {
  holder: string;
  onValueChange: (valor: string) => void;
  children: ReactNode;
}

export const Select: React.FC<SelectProps> = ({ holder, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('');

  const handleSelect = (valor: string) => {
    setSelectValue(valor);
    onValueChange(valor);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue>
          {selectValue || holder}
        </SelectValue>
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) =>
            React.isValidElement(child) ? React.cloneElement(child as ReactElement<{ onSelect: (valor: string) => void }>, { onSelect: handleSelect }) : child
          )}
        </SelectContent>
      )}
    </div>
  );
};

export const SelectTrigger: React.FC<{ onClick: () => void; children: ReactNode }> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2 border rounded-lg text-left">
      {children}
    </button>
  );
};

export const SelectValue: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <span>{children}</span>;
};

export const SelectContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="absolute mt-1 w-full bg-white shadow-lg rounded-lg border">
      {children}
    </div>
  );
};

export const SelectItem: React.FC<{ valor: string; onSelect: (valor: string) => void; children: ReactNode }> = ({
  valor,
  onSelect,
  children,
}) => {
  return (
    <div onClick={() => onSelect(valor)}
      className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white">
      {children}
    </div>
  );
};
