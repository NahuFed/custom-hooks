import { useState } from 'react'

const Exercise4 = () => {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="theory-content">
        <h2>🔥 Ejercicio 4: useForm Hook</h2>
        
        <div className="highlight-box">
          <h3>🎯 Objetivo</h3>
          <p>
            Crear un custom hook completo llamado <code>useForm</code> que maneje 
            formularios con validación, errores, estados de submit y más.
          </p>
        </div>

        <h3>📋 Requisitos</h3>
        <ul>
          <li>Manejo de valores de campos con <code>values</code> y <code>handleChange</code></li>
          <li>Validación de campos con reglas personalizables</li>
          <li>Estados de error por campo y errores generales</li>
          <li>Estado de <code>isSubmitting</code> durante envío</li>
          <li>Función <code>handleSubmit</code> que maneje validación automática</li>
          <li>Función <code>reset</code> para limpiar el formulario</li>
          <li>Validación en tiempo real (opcional)</li>
        </ul>

        <h3>💡 Características Avanzadas</h3>
        <ul>
          <li><strong>Validación condicional:</strong> Reglas que dependen de otros campos</li>
          <li><strong>Formateo automático:</strong> Formatear valores mientras se escriben</li>
          <li><strong>Touched states:</strong> Saber qué campos han sido tocados</li>
          <li><strong>Async validation:</strong> Validaciones que requieren requests</li>
        </ul>

        <h3>🧪 API Esperada</h3>
        <div className="code-block">
{`const {
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleSubmit,
  setFieldValue,
  setFieldError,
  reset
} = useForm({
  initialValues: { email: '', password: '' },
  validationSchema: {
    email: [
      { rule: 'required', message: 'Email es requerido' },
      { rule: 'email', message: 'Email inválido' }
    ],
    password: [
      { rule: 'required', message: 'Contraseña requerida' },
      { rule: 'minLength', value: 6, message: 'Mínimo 6 caracteres' }
    ]
  },
  onSubmit: async (values) => {
    // Lógica de envío
  }
})`}
        </div>

        <h3>🔧 Tipos de Validación Sugeridos</h3>
        <div className="code-block">
{`const validationRules = {
  required: (value) => !!value,
  email: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
  minLength: (value, length) => value.length >= length,
  maxLength: (value, length) => value.length <= length,
  numeric: (value) => /^\\d+$/.test(value),
  custom: (value, validator) => validator(value)
}`}
        </div>

        <div className="exercise-demo">
          <h3>🎮 Área de Práctica</h3>
          <PracticeArea />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button 
            className="demo-button"
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? 'Ocultar Solución' : 'Ver Solución'}
          </button>
        </div>

        {showSolution && (
          <div style={{ marginTop: '1rem' }}>
            <h3>✅ Solución</h3>
            <div className="code-block">
{`// hooks/useForm.js
import { useState, useCallback } from 'react'

// Reglas de validación predefinidas
const validationRules = {
  required: (value) => {
    if (typeof value === 'string') return value.trim().length > 0
    return value != null && value !== ''
  },
  email: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
  minLength: (value, length) => value && value.length >= length,
  maxLength: (value, length) => value && value.length <= length,
  numeric: (value) => /^\\d+$/.test(value),
  pattern: (value, pattern) => new RegExp(pattern).test(value),
  custom: (value, validator) => validator(value)
}

function useForm({
  initialValues = {},
  validationSchema = {},
  onSubmit,
  validateOnChange = false,
  validateOnBlur = true
}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validar un campo específico
  const validateField = useCallback((name, value) => {
    const fieldRules = validationSchema[name]
    if (!fieldRules) return null

    for (const rule of fieldRules) {
      const { rule: ruleName, value: ruleValue, message } = rule
      const validator = validationRules[ruleName]
      
      if (!validator) {
        console.warn(\`Validation rule '\${ruleName}' not found\`)
        continue
      }

      const isValid = validator(value, ruleValue)
      if (!isValid) {
        return message || \`Validation failed for '\${name}'\`
      }
    }
    
    return null
  }, [validationSchema])

  // Validar todos los campos
  const validateForm = useCallback(() => {
    const newErrors = {}
    
    Object.keys(validationSchema).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName])
      if (error) {
        newErrors[fieldName] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [values, validateField, validationSchema])

  // Manejar cambios en campos
  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target
    const fieldValue = type === 'checkbox' ? checked : value
    
    setValues(prev => ({ ...prev, [name]: fieldValue }))
    
    if (validateOnChange) {
      const error = validateField(name, fieldValue)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [validateField, validateOnChange])

  // Manejar blur (cuando el campo pierde foco)
  const handleBlur = useCallback((event) => {
    const { name } = event.target
    
    setTouched(prev => ({ ...prev, [name]: true }))
    
    if (validateOnBlur) {
      const error = validateField(name, values[name])
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [validateField, validateOnBlur, values])

  // Setear valor de campo programáticamente
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (validateOnChange) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [validateField, validateOnChange])

  // Setear error de campo programáticamente
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [])

  // Manejar submit del formulario
  const handleSubmit = useCallback((event) => {
    if (event) {
      event.preventDefault()
    }

    const isValid = validateForm()
    
    if (isValid && onSubmit) {
      setIsSubmitting(true)
      
      try {
        const result = onSubmit(values)
        
        // Si onSubmit retorna una promesa, esperarla
        if (result && typeof result.then === 'function') {
          return result.finally(() => setIsSubmitting(false))
        }
        
        setIsSubmitting(false)
        return result
        
      } catch (error) {
        setIsSubmitting(false)
        throw error
      }
    }
    
    return Promise.resolve()
  }, [values, validateForm, onSubmit])

  // Reset del formulario
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  // Helpers para templates
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur
  }), [values, handleChange, handleBlur])

  const getFieldError = useCallback((name) => {
    return touched[name] ? errors[name] : null
  }, [errors, touched])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
    validateForm,
    getFieldProps,
    getFieldError,
    isValid: Object.keys(errors).length === 0
  }
}

export default useForm`}
            </div>

            <SolutionDemo />
          </div>
        )}
      </div>
    </div>
  )
}

const PracticeArea = () => {
  const [currentPhase, setCurrentPhase] = useState(1)

  const phases = [
    {
      id: 1,
      title: "🏗️ Fundamentos",
      description: "Estructura básica y manejo de valores",
      objectives: [
        "Crear src/hooks/useForm.js",
        "Configurar estado inicial con initialValues",
        "Implementar handleChange básico",
        "Retornar values y handleChange"
      ],
      template: `function useForm({ initialValues = {} }) {
  // TODO: Estado para values
  // TODO: Función handleChange
  
  return {
    values: {},
    handleChange: () => {}
  }
}`,
      testCase: "Probar con un input simple que actualice su valor"
    },
    {
      id: 2,
      title: "🛡️ Sistema de validación",
      description: "Implementar validación de campos",
      objectives: [
        "Añadir estado para errors",
        "Crear sistema de reglas de validación",
        "Implementar validateField",
        "Integrar validación en handleChange (opcional)"
      ],
      concepts: [
        "Reglas: required, email, minLength, maxLength",
        "Schema de validación por campo",
        "Mensajes de error personalizados"
      ],
      testCase: "Validar email y password con reglas específicas"
    },
    {
      id: 3,
      title: "🎯 Estados avanzados",
      description: "Touched, blur y estados de UI",
      objectives: [
        "Añadir estado touched",
        "Implementar handleBlur",
        "Crear getFieldError helper",
        "Mostrar errores solo en campos touched"
      ],
      userExperience: "Los errores solo aparecen después de que el usuario interact con el campo",
      testCase: "Errores que aparecen solo después de blur"
    },
    {
      id: 4,
      title: "📤 Submit y completar",
      description: "Sistema de envío y funciones finales",
      objectives: [
        "Implementar handleSubmit",
        "Añadir estado isSubmitting",
        "Validar todo el form antes de submit",
        "Crear función reset",
        "Añadir helpers útiles"
      ],
      finalAPI: `{
  values, errors, touched, isSubmitting,
  handleChange, handleBlur, handleSubmit,
  reset, setFieldValue, getFieldProps
}`,
      testCase: "Formulario completo de registro con validación"
    }
  ]

  const currentPhaseData = phases.find(p => p.id === currentPhase)

  return (
    <div style={{ 
      background: '#f7fafc', 
      border: '2px solid #e2e8f0', 
      borderRadius: '10px', 
      padding: '2rem'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4>🔥 Fases de Desarrollo</h4>
          <div style={{ fontSize: '0.875rem', color: '#718096' }}>
            Fase {currentPhase} de {phases.length}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {phases.map(p => (
            <div
              key={p.id}
              style={{
                width: '100%',
                height: '4px',
                background: p.id <= currentPhase ? '#e53e3e' : '#e2e8f0',
                borderRadius: '2px'
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h5 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>
          {currentPhaseData.title}
        </h5>
        <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
          {currentPhaseData.description}
        </p>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>🎯 Objetivos de esta fase:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {currentPhaseData.objectives.map((objective, index) => (
              <li key={index} style={{ marginBottom: '0.25rem', color: '#4a5568' }}>
                {objective}
              </li>
            ))}
          </ul>
        </div>

        {currentPhaseData.template && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>📝 Template inicial:</strong>
            <div className="code-block" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {currentPhaseData.template}
            </div>
          </div>
        )}

        {currentPhaseData.concepts && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>🧠 Conceptos clave:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              {currentPhaseData.concepts.map((concept, index) => (
                <li key={index} style={{ marginBottom: '0.25rem', color: '#4a5568' }}>
                  {concept}
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentPhaseData.userExperience && (
          <div style={{ 
            background: '#e6fffa', 
            border: '1px solid #4fd1c7', 
            borderRadius: '6px', 
            padding: '0.75rem',
            marginBottom: '1rem'
          }}>
            <strong>👤 UX Objetivo:</strong> {currentPhaseData.userExperience}
          </div>
        )}

        {currentPhaseData.finalAPI && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>🎯 API Final:</strong>
            <div className="code-block" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {currentPhaseData.finalAPI}
            </div>
          </div>
        )}

        {currentPhaseData.testCase && (
          <div style={{ 
            background: '#fffaf0', 
            border: '1px solid #fed7a1', 
            borderRadius: '6px', 
            padding: '0.75rem'
          }}>
            <strong>🧪 Caso de prueba:</strong> {currentPhaseData.testCase}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        <button 
          className="demo-button"
          onClick={() => setCurrentPhase(Math.max(1, currentPhase - 1))}
          disabled={currentPhase === 1}
          style={{ 
            background: currentPhase === 1 ? '#e2e8f0' : '#4299e1',
            color: currentPhase === 1 ? '#a0aec0' : 'white'
          }}
        >
          ← Fase Anterior
        </button>
        
        <button 
          className="demo-button"
          onClick={() => setCurrentPhase(Math.min(phases.length, currentPhase + 1))}
          disabled={currentPhase === phases.length}
          style={{ 
            background: currentPhase === phases.length ? '#e2e8f0' : '#e53e3e',
            color: currentPhase === phases.length ? '#a0aec0' : 'white'
          }}
        >
          Siguiente Fase →
        </button>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#fed7d7', 
        borderRadius: '8px',
        fontSize: '0.875rem',
        border: '1px solid #fc8181',
        color: '#742a2a'
      }}>
        <strong>⚠️ Desafío Avanzado:</strong> Este es el ejercicio más complejo. Tómate tu tiempo, 
        implementa fase por fase, y no dudes en experimentar con diferentes enfoques.
        <br />
        <strong>💡 Consejo:</strong> Empieza simple y ve añadiendo funcionalidades gradualmente.
      </div>
    </div>
  )
}

const SolutionDemo = () => {
  // Implementación simplificada para la demo
  const validationRules = {
    required: (value) => {
      if (typeof value === 'string') return value.trim().length > 0
      return value != null && value !== ''
    },
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    minLength: (value, length) => value && value.length >= length,
    custom: (value, validator) => validator(value)
  }

  const useForm = ({ initialValues = {}, validationSchema = {}, onSubmit }) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateField = (name, value) => {
      const fieldRules = validationSchema[name]
      if (!fieldRules) return null

      for (const rule of fieldRules) {
        const { rule: ruleName, value: ruleValue, message } = rule
        const validator = validationRules[ruleName]
        
        if (validator && !validator(value, ruleValue)) {
          return message
        }
      }
      return null
    }

    const handleChange = (event) => {
      const { name, value, type, checked } = event.target
      const fieldValue = type === 'checkbox' ? checked : value
      setValues(prev => ({ ...prev, [name]: fieldValue }))
    }

    const handleBlur = (event) => {
      const { name } = event.target
      setTouched(prev => ({ ...prev, [name]: true }))
      const error = validateField(name, values[name])
      setErrors(prev => ({ ...prev, [name]: error }))
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      
      // Validar todos los campos
      const newErrors = {}
      Object.keys(validationSchema).forEach(fieldName => {
        const error = validateField(fieldName, values[fieldName])
        if (error) newErrors[fieldName] = error
      })
      
      setErrors(newErrors)
      setTouched(Object.keys(validationSchema).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      
      if (Object.keys(newErrors).length === 0) {
        setIsSubmitting(true)
        try {
          await onSubmit(values)
        } finally {
          setIsSubmitting(false)
        }
      }
    }

    const reset = () => {
      setValues(initialValues)
      setErrors({})
      setTouched({})
      setIsSubmitting(false)
    }

    return {
      values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      reset
    }
  }

  // Demo del hook en uso
  const registrationForm = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    },
    validationSchema: {
      name: [
        { rule: 'required', message: 'El nombre es requerido' },
        { rule: 'minLength', value: 2, message: 'Mínimo 2 caracteres' }
      ],
      email: [
        { rule: 'required', message: 'El email es requerido' },
        { rule: 'email', message: 'Email inválido' }
      ],
      password: [
        { rule: 'required', message: 'La contraseña es requerida' },
        { rule: 'minLength', value: 6, message: 'Mínimo 6 caracteres' }
      ],
      confirmPassword: [
        { rule: 'required', message: 'Confirma tu contraseña' },
        { 
          rule: 'custom', 
          value: (value) => value === registrationForm.values.password,
          message: 'Las contraseñas no coinciden' 
        }
      ],
      acceptTerms: [
        { rule: 'required', message: 'Debes aceptar los términos' }
      ]
    },
    onSubmit: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('¡Formulario enviado exitosamente!\n' + JSON.stringify(values, null, 2))
    }
  })

  return (
    <div className="exercise-demo">
      <h4>🎮 Demo del useForm Hook</h4>
      
      <form onSubmit={registrationForm.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Nombre Completo
          </label>
          <input
            type="text"
            name="name"
            value={registrationForm.values.name}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
            className="demo-input"
            style={{ 
              width: '100%',
              borderColor: registrationForm.touched.name && registrationForm.errors.name ? '#e53e3e' : '#e2e8f0'
            }}
          />
          {registrationForm.touched.name && registrationForm.errors.name && (
            <div style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {registrationForm.errors.name}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={registrationForm.values.email}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
            className="demo-input"
            style={{ 
              width: '100%',
              borderColor: registrationForm.touched.email && registrationForm.errors.email ? '#e53e3e' : '#e2e8f0'
            }}
          />
          {registrationForm.touched.email && registrationForm.errors.email && (
            <div style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {registrationForm.errors.email}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={registrationForm.values.password}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
            className="demo-input"
            style={{ 
              width: '100%',
              borderColor: registrationForm.touched.password && registrationForm.errors.password ? '#e53e3e' : '#e2e8f0'
            }}
          />
          {registrationForm.touched.password && registrationForm.errors.password && (
            <div style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {registrationForm.errors.password}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={registrationForm.values.confirmPassword}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
            className="demo-input"
            style={{ 
              width: '100%',
              borderColor: registrationForm.touched.confirmPassword && registrationForm.errors.confirmPassword ? '#e53e3e' : '#e2e8f0'
            }}
          />
          {registrationForm.touched.confirmPassword && registrationForm.errors.confirmPassword && (
            <div style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {registrationForm.errors.confirmPassword}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={registrationForm.values.acceptTerms}
              onChange={registrationForm.handleChange}
              onBlur={registrationForm.handleBlur}
            />
            Acepto los términos y condiciones
          </label>
          {registrationForm.touched.acceptTerms && registrationForm.errors.acceptTerms && (
            <div style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {registrationForm.errors.acceptTerms}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="submit" 
            className="demo-button"
            disabled={registrationForm.isSubmitting}
            style={{ flex: 1 }}
          >
            {registrationForm.isSubmitting ? 'Enviando...' : 'Registrarse'}
          </button>
          
          <button 
            type="button" 
            onClick={registrationForm.reset}
            className="demo-button"
            style={{ background: '#e2e8f0', color: '#4a5568' }}
          >
            Reset
          </button>
        </div>
      </form>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#e6fffa', 
        borderRadius: '8px',
        fontSize: '0.875rem'
      }}>
        <strong>💡 Características demostradas:</strong>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
          <li>Validación en tiempo real (onBlur)</li>
          <li>Múltiples tipos de validación</li>
          <li>Validación condicional (confirm password)</li>
          <li>Estados de error por campo</li>
          <li>Estado de submitting</li>
          <li>Reset de formulario</li>
        </ul>
      </div>
    </div>
  )
}

export default Exercise4
