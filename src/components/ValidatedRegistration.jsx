import { useRef, useState } from 'react';

const ValidatedRegistration = () => {
    const formRef = useRef(null);
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        const newErrors = {};
        if (!name) {
            newErrors.name = 'Please enter your name';
        } else if (name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
        }

        if (!email) {
            newErrors.email = 'Please enter your email';
        } else if (!email.includes('@')) {
            newErrors.email = 'Invalid email address';
        }

        if (!password) {
            newErrors.password = 'Please enter a password';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/\d/.test(password)) {
            newErrors.password = 'Password must contain at least one digit';
        } else if (!/[a-zA-Z]/.test(password)) {
            newErrors.password = 'Password must contain at least one letter';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Submit the form
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required /><br />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required /><br />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required /><br />
                {errors.password && <span>{errors.password}</span>}
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required /><br />
                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ValidatedRegistration;
