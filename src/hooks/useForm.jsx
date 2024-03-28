import { useState } from 'react';

// Buat hook useForm dengan kemampuan validasi dan reset
export default function useForm(getFreshModelObject, validateForm) {
    const [formData, setFormData] = useState(getFreshModelObject());
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Validasi setiap kali ada perubahan nilai input
        if (validateForm) {
            const validationErrors = validateForm(formData);
            setErrors(validationErrors);
        }
    };

    const resetForm = () => {
        setFormData(getFreshModelObject());
        setErrors({});
    };

    return {
        formData,
        setFormData,
        handleChange,
        errors,
        resetForm
    };
}
