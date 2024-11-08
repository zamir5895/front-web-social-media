import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from 'lucide-react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    calle: '',
    ciudad: '',
    codigoPostal: '',
    pais: '',
    foto: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setFormData(prevState => ({
        ...prevState,
        foto: file
      }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, foto: 'Por favor, selecciona una imagen válida.' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido) newErrors.apellido = 'El apellido es requerido';
        if (!formData.email) newErrors.email = 'El email es requerido';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
        if (!formData.password) newErrors.password = 'La contraseña es requerida';
        else if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        break;
      case 2:
        if (!formData.calle) newErrors.calle = 'La calle es requerida';
        if (!formData.ciudad) newErrors.ciudad = 'La ciudad es requerida';
        if (!formData.codigoPostal) newErrors.codigoPostal = 'El código postal es requerido';
        if (!formData.pais) newErrors.pais = 'El país es requerido';
        break;
      case 3:
        if (!formData.foto) newErrors.foto = 'La foto de perfil es requerida';
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        setIsSubmitting(true);
        // Simular envío de datos
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Datos del formulario:', formData);
        setIsSubmitting(false);
        // Redirigir al usuario o mostrar mensaje de éxito
        router.push('/registro-exitoso');
      }
    }
  };

  const prevStep = () => setStep(step - 1);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <Step2 formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return <Step3 formData={formData} handleFileChange={handleFileChange} errors={errors} />;
    }
  };

  return (
    <div>
      <Progress value={(step / 3) * 100} className="mb-6" />
      <form onSubmit={handleSubmit}>
        {renderStepContent()}
      </form>
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <Button onClick={prevStep} variant="outline">
            Anterior
          </Button>
        )}
        <Button onClick={handleSubmit} className={`ml-auto ${step < 3 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`} disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : step < 3 ? 'Siguiente' : 'Registrarse'}
        </Button>
      </div>
      <Alert variant={step === 3 ? "default" : "secondary"} className="mt-4">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Progreso</AlertTitle>
        <AlertDescription>
          {step === 1 && "Datos personales"}
          {step === 2 && "Dirección"}
          {step === 3 && "Foto de perfil"}
        </AlertDescription>
      </Alert>
    </div>
  );
}