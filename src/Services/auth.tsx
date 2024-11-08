// services/auth.ts
import axios from 'axios';

export const registerUser = async (formData: any) => {
  try {
    const response = await axios.post('/api/auth/register', formData);
    return response;
  } catch (error) {
    throw error;
  }
};
