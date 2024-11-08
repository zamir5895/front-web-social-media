import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
  title: string;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, title }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{title}</h2>
      {children}
    </div>
  );
};

export default FormContainer;
