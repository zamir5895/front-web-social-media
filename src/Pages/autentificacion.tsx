import React, { useState } from 'react';
import axios from 'axios';
import FormContainer from '../Componentes/Utils/FormContainer';
import InputField from '../Componentes/Utils/InputField';
import { registerUser } from '../Services/auth';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    edad: 0,
    email: '',
    password: '',
    role: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.status === 200) {
        alert('Registro exitoso. Continuando con la siguiente etapa...');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 200) {
        setErrorMessage('El email ya existe. Intente con otro.');
      }
    }
  };

  return (
    <FormContainer title="Registro de Usuario">
      <form onSubmit={handleSubmit}>
        <InputField label="Username" type="text" value={formData.userName} onChange={(e) => handleChange(e)} />
        <InputField label="Primer Nombre" type="text" value={formData.primerNombre} onChange={(e) => handleChange(e)} />
        <InputField label="Segundo Nombre" type="text" value={formData.segundoNombre} onChange={(e) => handleChange(e)} />
        <InputField label="Primer Apellido" type="text" value={formData.primerApellido} onChange={(e) => handleChange(e)} />
        <InputField label="Segundo Apellido" type="text" value={formData.segundoApellido} onChange={(e) => handleChange(e)} />
        <InputField label="Edad" type="number" value={formData.edad} onChange={(e) => handleChange(e)} />
        <InputField label="Email" type="email" value={formData.email} onChange={(e) => handleChange(e)} />
        <InputField label="Password" type="password" value={formData.password} onChange={(e) => handleChange(e)} />
        <InputField label="Role" type="text" value={formData.role} onChange={(e) => handleChange(e)} />
        
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600">
          Registrar
        </button>
      </form>
    </FormContainer>
  );
};

export default RegisterPage;