"use client";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import  Button  from "../Componentes/UI/Button";
import  Input  from "../Componentes/UI/Input";
import  Label  from "../Componentes/UI/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Componentes/UI/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Componentes/UI/Select";
import  Progress  from "../Componentes/UI/Progress";
import { Alert, AlertDescription, AlertTitle } from "../Componentes/UI/Alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Componentes/UI/Tabs";
import { CheckCircle2, AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";

export default function AuthPage() {
  const router = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userName:"",
    primerNombre:"",
    segundoNombre:"",
    primerApellido:"",
    segundoApellido: "",
    edad:0, //edad de tipo int numeric
    email: "",
    password: "",
    confirmPassword: "",
    role:"",
    //aca termina la primera parte


    //Aca empieza la segunda parte
    dateBirth: "",
    gender:"",
    direccion:"",
    pais:"",
    ciudad:"", 
    latitud:0, //latitud de tipo double numeric
    longitud:0, //longitud de tipo double numeric
    telefono:"",
    //aca termina la segunda parte

    //Aca empieza la tercera parte
    descripcion:"", 
    foto: null,
    //aca termina la tercera parte
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Lógica simulada de inicio de sesión
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Datos de inicio de sesión:", loginData);
      setIsSubmitting(false);
      router("/dashboard");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setFormData((prevState) => ({
        ...prevState,
        foto: file,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        foto: "Por favor, selecciona una imagen válida.",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
        if (!formData.apellido) newErrors.apellido = "El apellido es requerido";
        if (!formData.email) newErrors.email = "El email es requerido";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
        if (!formData.password) newErrors.password = "La contraseña es requerida";
        else if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
        break;
      case 2:
        if (!formData.calle) newErrors.calle = "La calle es requerida";
        if (!formData.ciudad) newErrors.ciudad = "La ciudad es requerida";
        if (!formData.codigoPostal) newErrors.codigoPostal = "El código postal es requerido";
        if (!formData.pais) newErrors.pais = "El país es requerido";
        break;
      case 3:
        if (!formData.foto) newErrors.foto = "La foto de perfil es requerida";
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
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          console.log("Datos del formulario:", formData);
          setIsSubmitting(false);
          router.push("/registro-exitoso");
        } catch (error) {
          console.error("Error en el envío de datos:", error);
          setIsSubmitting(false);
        }
      }
    }
  };

  const prevStep = () => setStep(step - 1);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
                {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            {/* Campos de la segunda etapa */}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            {/* Campos de la tercera etapa */}
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Bienvenido</CardTitle>
          <CardDescription className="text-center text-gray-600">Inicia sesión o regístrate para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Campos de inicio de sesión */}
              </form>
            </TabsContent>
            <TabsContent value="register">
              <Progress value={(step / 3) * 100} className="mb-6" />
              <form onSubmit={handleSubmit}>
                {renderStepContent()}
              </form>
              {/* Navegación entre pasos y alerta */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 