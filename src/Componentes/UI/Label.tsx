import React from "react";
interface LabelProps extends React.HTMLProps<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({children, className='', ...props})=>{
    return (
        <Label className={`block text-gray-700 font-semibold mb-1 ${className}`} {...props}>
            {children}
            </Label>
    
    );
};
export default Label;