import { useState } from 'react'

// ⭐ EJERCICIO 1: useToggle Hook
// Objetivo: Crear un hook que permita alternar entre valores booleanos o entre valores específicos

const Exercise1 = () => {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="theory-content">
        <h2>🏋️ Ejercicio 1: useToggle Hook</h2>
        
        <div className="highlight-box">
          <h3>🎯 Objetivo</h3>
          <p>
            Crear un custom hook llamado <code>useToggle</code> que permita alternar entre 
            valores booleanos o entre dos valores específicos.
          </p>
        </div>

        <h3>📋 Requisitos</h3>
        <ul>
          <li>El hook debe aceptar un valor inicial (por defecto <code>false</code>)</li>
          <li>Debe retornar el valor actual y una función para alternarlo</li>
          <li>Opcionalmente, debe permitir alternar entre dos valores específicos</li>
          <li>Debe incluir una función para setear un valor específico</li>
        </ul>

        <h3>💡 Pistas</h3>
        <ul>
          <li>Usa <code>useState</code> para manejar el estado</li>
          <li>Usa <code>useCallback</code> para optimizar las funciones</li>
          <li>Considera cómo manejar diferentes tipos de valores (boolean, string, number)</li>
        </ul>

        <h3>🧪 Casos de Uso Esperados</h3>
        <div className="code-block">
{`// Uso básico con booleanos
const [isVisible, toggleVisible] = useToggle(false)

// Uso con valores específicos
const [theme, toggleTheme] = useToggle('light', 'dark')

// Con función setValue
const [status, toggleStatus, setStatus] = useToggle('active')`}
        </div>

        <div className="exercise-demo">
          <h3>🎮 Área de Práctica</h3>
          <p>Implementa tu hook siguiendo estos pasos:</p>
          
          <PracticeArea />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button 
            className="demo-button"
            onClick={() => setShowSolution(!showSolution)}
            style={{ 
              background: showSolution ? '#e53e3e' : '#4299e1',
              boxShadow: showSolution ? '0 4px 15px rgba(229, 62, 62, 0.4)' : '0 4px 15px rgba(66, 153, 225, 0.4)'
            }}
          >
            {showSolution ? '🙈 Ocultar Solución' : '👀 Ver Solución (¡Intenta primero!)'}
          </button>
          
          {!showSolution && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#fed7d7', 
              borderRadius: '8px',
              fontSize: '0.875rem',
              color: '#742a2a'
            }}>
              <strong>⚠️ Importante:</strong> Intenta resolver el ejercicio por ti mismo antes de ver la solución. 
              El aprendizaje real viene de enfrentar los desafíos y errores en el proceso.
            </div>
          )}
        </div>

        {showSolution && (
          <div style={{ marginTop: '1rem' }}>
            <h3>✅ Solución</h3>
            <div className="code-block">
{`// hooks/useToggle.js
import { useState, useCallback } from 'react'

function useToggle(initialValue = false, toggleValue = !initialValue) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => {
    setValue(prev => 
      prev === initialValue ? toggleValue : initialValue
    )
  }, [initialValue, toggleValue])
  
  const setSpecificValue = useCallback((newValue) => {
    setValue(newValue)
  }, [])
  
  return [value, toggle, setSpecificValue]
}

export default useToggle`}
            </div>

            <h4>Versión Alternativa (más flexible):</h4>
            <div className="code-block">
{`function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback((toggleValue) => {
    setValue(prev => {
      if (typeof toggleValue !== 'undefined') {
        return toggleValue
      }
      if (typeof prev === 'boolean') {
        return !prev
      }
      // Para otros tipos, necesitamos valores específicos
      throw new Error('Toggle value required for non-boolean types')
    })
  }, [])
  
  return [value, toggle, setValue]
}`}
            </div>

            <SolutionDemo />
          </div>
        )}
      </div>
    </div>
  )
}

// Área donde el estudiante puede practicar
const PracticeArea = () => {
  const [step, setStep] = useState(1)
  const [userProgress, setUserProgress] = useState({
    createdFile: false,
    implementedBasic: false,
    addedFeatures: false,
    tested: false
  })

  const steps = [
    {
      id: 1,
      title: "📁 Crear el archivo",
      description: "Crea el archivo src/hooks/useToggle.js",
      code: `// src/hooks/useToggle.js
import { useState } from 'react'

function useToggle() {
  // Tu implementación aquí
}

export default useToggle`
    },
    {
      id: 2,
      title: "⚡ Implementación básica",
      description: "Implementa la funcionalidad básica del toggle",
      hint: "Usa useState para el valor y una función para alternarlo"
    },
    {
      id: 3,
      title: "🔧 Añadir características",
      description: "Añade soporte para valores personalizados y función setValue",
      hint: "Considera cómo manejar diferentes tipos de valores"
    },
    {
      id: 4,
      title: "🧪 Probar el hook",
      description: "Crea un componente para probar tu hook",
      code: `// Ejemplo de uso:
function TestComponent() {
  const [isVisible, toggle, setVisible] = useToggle(false)
  
  return (
    <div>
      <p>Visible: {isVisible ? 'Sí' : 'No'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setVisible(true)}>Mostrar</button>
    </div>
  )
}`
    }
  ]

  const currentStep = steps.find(s => s.id === step)

  return (
    <div style={{ 
      background: '#f7fafc', 
      border: '2px solid #e2e8f0', 
      borderRadius: '10px', 
      padding: '2rem'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4>💻 Pasos de Implementación</h4>
          <div style={{ fontSize: '0.875rem', color: '#718096' }}>
            Paso {step} de {steps.length}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {steps.map(s => (
            <div
              key={s.id}
              style={{
                width: '100%',
                height: '4px',
                background: s.id <= step ? '#48bb78' : '#e2e8f0',
                borderRadius: '2px'
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h5 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>
          {currentStep.title}
        </h5>
        <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
          {currentStep.description}
        </p>
        
        {currentStep.hint && (
          <div style={{ 
            background: '#e6fffa', 
            border: '1px solid #4fd1c7', 
            borderRadius: '6px', 
            padding: '0.75rem',
            marginBottom: '1rem'
          }}>
            <strong>💡 Pista:</strong> {currentStep.hint}
          </div>
        )}
        
        {currentStep.code && (
          <div className="code-block" style={{ fontSize: '0.875rem' }}>
            {currentStep.code}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        <button 
          className="demo-button"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          style={{ 
            background: step === 1 ? '#e2e8f0' : '#4299e1',
            color: step === 1 ? '#a0aec0' : 'white'
          }}
        >
          ← Anterior
        </button>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="demo-button"
            onClick={() => setStep(Math.min(steps.length, step + 1))}
            disabled={step === steps.length}
            style={{ 
              background: step === steps.length ? '#e2e8f0' : '#48bb78',
              color: step === steps.length ? '#a0aec0' : 'white'
            }}
          >
            Siguiente →
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#fffaf0', 
        borderRadius: '8px',
        fontSize: '0.875rem',
        border: '1px solid #fed7a1'
      }}>
        <strong>📝 Recordatorio:</strong> Los estudiantes deben crear el archivo y escribir el código ellos mismos. 
        La solución está disponible más abajo solo como referencia después de intentar la implementación.
      </div>
    </div>
  )
}

// Demo de la solución funcionando
const SolutionDemo = () => {
  // Implementación del hook para la demo
  const useToggle = (initialValue = false, toggleValue) => {
    const [value, setValue] = useState(initialValue)
    
    const toggle = useState(() => {
      return () => {
        setValue(prev => {
          if (toggleValue !== undefined) {
            return prev === initialValue ? toggleValue : initialValue
          }
          return typeof prev === 'boolean' ? !prev : !initialValue
        })
      }
    })[0]
    
    return [value, toggle, setValue]
  }

  const [isVisible, toggleVisible] = useToggle(false)
  const [theme, toggleTheme] = useToggle('light', 'dark')
  const [count, toggleCount] = useToggle(0, 10)

  return (
    <div className="exercise-demo">
      <h4>🎮 Demo de la Solución</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>Toggle Boolean</h5>
          <p>Visible: <strong>{isVisible ? 'Sí' : 'No'}</strong></p>
          <button className="demo-button" onClick={toggleVisible}>
            {isVisible ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>Toggle Theme</h5>
          <p>Tema: <strong>{theme}</strong></p>
          <button className="demo-button" onClick={toggleTheme}>
            Cambiar Tema
          </button>
        </div>

        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>Toggle Numbers</h5>
          <p>Valor: <strong>{count}</strong></p>
          <button className="demo-button" onClick={toggleCount}>
            Toggle 0/10
          </button>
        </div>
      </div>
    </div>
  )
}

export default Exercise1
