import React, { useState } from 'react';

function UserRegistrationForm() {
  const [accountType, setAccountType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [errors, setErrors] = useState({});

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
    setRegistrationNumber('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      
      const formData = {
        name,
        email,
        accountType,
        registrationNumber: accountType === 'Profissional' ? registrationNumber : undefined,
      };
      console.log('Dados enviados:', formData);
     
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!name) validationErrors.name = 'Nome é obrigatório.';
    if (!email) {
      validationErrors.email = 'Email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email inválido.';
    }
    if (accountType === 'Profissional' && !registrationNumber) {
      validationErrors.registrationNumber = 'Número de registro profissional é obrigatório.';
    }
    return validationErrors;
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Registro de Usuário</h2>
      
      <div>
        <label>
          <input
            type="radio"
            value="Pessoal"
            checked={accountType === 'Pessoal'}
            onChange={handleAccountTypeChange}
          />
          Pessoal
        </label>
        <label>
          <input
            type="radio"
            value="Profissional"
            checked={accountType === 'Profissional'}
            onChange={handleAccountTypeChange}
          />
          Profissional
        </label>
        <label>
          <input
            type="radio"
            value="Empresarial"
            checked={accountType === 'Empresarial'}
            onChange={handleAccountTypeChange}
          />
          Empresarial
        </label>
      </div>

      <div>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
      </div>

      {accountType === 'Profissional' && (
        <div>
          <label>
            Número de Registro Profissional:
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
            {errors.registrationNumber && <span className="error">{errors.registrationNumber}</span>}
          </label>
        </div>
      )}

      <button type="submit">Registrar</button>
    </form>
  );
}

export default UserRegistrationForm;
