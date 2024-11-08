import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from '../hooks/useAuth';
import {Button} from './Button';
import {Input} from './input';
import {Label} from './label';
import {EyeIcon, EyeOffIcon} from 'lucide-react'
import {loginFetch} from '../services/auth';


export default function LoginForm (){
    const router = useRouter();
    const [loginData, setLoginData] = useState({email:'', password:''});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLoginChange = (e) =>{
        const {name:value} = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleLoginSubmit = async (e) =>{
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise (resolve => setTimeout(resolve, 10000));
        console.log('Login data:', loginData);
        setIsSubmitting(false);
    }

    return(
        <form onSubmit ={handleLoginSubmit} className = "space-y-4" >
            <div className = "space-y-2">
                <Label htmlFor = "login-email"> Correo electronico</Label>
                <Input
                    id ="login-email"
                    name="email"
                    type ="email"
                    value = {loginData.email} onChange = {handleLoginChange} required />
            </div>
            <div className='space-y-2'>
                <Label htmlFor="login-password"> COntraseña</Label>
                <div className='relative'>
                    <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                        {showPassword? (
                            <EyeOffIcon className="h-4 w-4 text-gray-500"/>
                        ):(
                            <EyeIcon className="h-4 w-4 text-gray-500"/>
                        )
                        }
                    </Button>
                </div>
            </div>
            <Button
                type ="submit"
                className ="w-full" disabled = {isSubmitting}>
                    {isSubmitting ? 'Iniciando sesion...' : 'Iniciar sesion'}
                </Button>
        </form>
    );
}