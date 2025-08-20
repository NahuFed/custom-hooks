import { useState, useEffect } from 'react'

const Exercise2 = () => {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="theory-content">
        <h2>🎯 Ejercicio 2: useLocalStorage Hook</h2>
        
        <div className="highlight-box">
          <h3>🎯 Objetivo</h3>
          <p>
            Crear un custom hook llamado <code>useLocalStorage</code> que sincronice 
            automáticamente el estado de un componente con localStorage.
          </p>
        </div>

        <h3>📋 Requisitos</h3>
        <ul>
          <li>El hook debe aceptar una <code>key</code> y un <code>defaultValue</code></li>
          <li>Debe cargar el valor desde localStorage al inicializar</li>
          <li>Debe guardar automáticamente en localStorage cuando el valor cambie</li>
          <li>Debe manejar errores de serialización/deserialización</li>
          <li>Debe retornar el valor actual y una función para actualizarlo</li>
          <li>Debe funcionar con cualquier tipo de dato serializable</li>
        </ul>

        <h3>💡 Pistas</h3>
        <ul>
          <li>Usa <code>JSON.stringify</code> y <code>JSON.parse</code> para serialización</li>
          <li>Maneja casos donde localStorage no esté disponible (SSR)</li>
          <li>Usa <code>useEffect</code> para sincronizar con localStorage</li>
          <li>Considera el performance con <code>useCallback</code></li>
        </ul>

        <h3>🧪 Casos de Uso Esperados</h3>
        <div className="code-block">
{`// Uso básico
const [name, setName] = useLocalStorage('username', '')

// Con objetos
const [user, setUser] = useLocalStorage('user', { name: '', email: '' })

// Con arrays
const [todos, setTodos] = useLocalStorage('todos', [])`}
        </div>

        <h3>⚠️ Consideraciones Especiales</h3>
        <ul>
          <li><strong>SSR:</strong> localStorage no está disponible en el servidor</li>
          <li><strong>Errores:</strong> JSON.parse puede fallar con datos corruptos</li>
          <li><strong>Límites:</strong> localStorage tiene límites de tamaño</li>
          <li><strong>Sincronización:</strong> ¿Qué pasa si localStorage cambia en otra pestaña?</li>
        </ul>

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
{`// hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from 'react'

function useLocalStorage(key, defaultValue) {
  // Función helper para leer de localStorage
  const readFromStorage = useCallback(() => {
    if (typeof window === 'undefined') {
      return defaultValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error)
      return defaultValue
    }
  }, [key, defaultValue])

  // Estado inicializado con valor de localStorage
  const [value, setValue] = useState(readFromStorage)

  // Función para actualizar valor y localStorage
  const setStoredValue = useCallback((newValue) => {
    try {
      // Permite funciones actualizadoras como useState
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue
      
      setValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error)
    }
  }, [key, value])

  // Sincronizar con localStorage si cambia externamente
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(\`Error parsing localStorage change for key "\${key}":\`, error)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return [value, setStoredValue]
}

export default useLocalStorage`}
            </div>

            <h4>Versión Simplificada (para empezar):</h4>
            <div className="code-block">
{`function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const setStoredValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue]
}`}
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
      title: "🏗️ Estructura básica",
      description: "Crea el archivo y la estructura básica del hook",
      tasks: [
        "Crear src/hooks/useLocalStorage.js",
        "Importar useState y useEffect",
        "Definir la función useLocalStorage con parámetros",
        "Configurar el estado inicial"
      ],
      code: `// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

function useLocalStorage(key, defaultValue) {
  // TODO: Implementar estado inicial
  // TODO: Implementar función de actualización
  // TODO: Retornar [value, setValue]
}

export default useLocalStorage`
    },
    {
      id: 2,
      title: "📖 Lectura de localStorage",
      description: "Implementa la lectura inicial desde localStorage",
      tasks: [
        "Crear función para leer de localStorage",
        "Manejar casos donde localStorage no esté disponible",
        "Parsear JSON de forma segura",
        "Usar defaultValue como fallback"
      ],
      hint: "Recuerda que localStorage puede no estar disponible en SSR"
    },
    {
      id: 3,
      title: "✏️ Escritura a localStorage",
      description: "Implementa la sincronización automática con localStorage",
      tasks: [
        "Crear función setStoredValue",
        "Serializar valor a JSON",
        "Manejar funciones actualizadoras",
        "Manejar errores de escritura"
      ],
      hint: "Usa useEffect para escribir a localStorage cuando el valor cambie"
    },
    {
      id: 4,
      title: "🔄 Sincronización avanzada",
      description: "Añade sincronización entre pestañas (opcional)",
      tasks: [
        "Escuchar el evento 'storage'",
        "Actualizar estado cuando localStorage cambie externamente",
        "Limpiar event listeners en cleanup"
      ],
      hint: "El evento 'storage' se dispara cuando localStorage cambia en otra pestaña"
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
          <h4>🔧 Fases de Desarrollo</h4>
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
                background: p.id <= currentPhase ? '#ed8936' : '#e2e8f0',
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
          <strong>📋 Tareas de esta fase:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {currentPhaseData.tasks.map((task, index) => (
              <li key={index} style={{ marginBottom: '0.25rem', color: '#4a5568' }}>
                {task}
              </li>
            ))}
          </ul>
        </div>
        
        {currentPhaseData.hint && (
          <div style={{ 
            background: '#e6fffa', 
            border: '1px solid #4fd1c7', 
            borderRadius: '6px', 
            padding: '0.75rem',
            marginBottom: '1rem'
          }}>
            <strong>💡 Pista:</strong> {currentPhaseData.hint}
          </div>
        )}
        
        {currentPhaseData.code && (
          <div className="code-block" style={{ fontSize: '0.875rem' }}>
            {currentPhaseData.code}
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
            background: currentPhase === phases.length ? '#e2e8f0' : '#ed8936',
            color: currentPhase === phases.length ? '#a0aec0' : 'white'
          }}
        >
          Siguiente Fase →
        </button>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#fffaf0', 
        borderRadius: '8px',
        fontSize: '0.875rem',
        border: '1px solid #fed7a1'
      }}>
        <strong>🎯 Objetivo:</strong> Al final deberías tener un hook que permita:
        <br />• <code>const [name, setName] = useLocalStorage('username', '')</code>
        <br />• Persistencia automática en localStorage
        <br />• Sincronización entre pestañas (avanzado)
      </div>
    </div>
  )
}

const SolutionDemo = () => {
  // Implementación simplificada del hook para la demo
  const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
      } catch {
        return defaultValue
      }
    })

    const setStoredValue = (newValue) => {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue
      setValue(valueToStore)
      try {
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }

    return [value, setStoredValue]
  }

  const [name, setName] = useLocalStorage('demo-name', '')
  const [age, setAge] = useLocalStorage('demo-age', 0)
  const [preferences, setPreferences] = useLocalStorage('demo-preferences', {
    theme: 'light',
    language: 'es',
    notifications: true
  })

  return (
    <div className="exercise-demo">
      <h4>🎮 Demo de la Solución</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {/* Demo string */}
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>String en localStorage</h5>
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="demo-input"
            style={{ width: '100%', margin: '0.5rem 0' }}
          />
          <p>Guardado: <strong>{name || 'Sin nombre'}</strong></p>
          <button className="demo-button" onClick={() => setName('')}>
            Limpiar
          </button>
        </div>

        {/* Demo number */}
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>Number en localStorage</h5>
          <input
            type="number"
            placeholder="Tu edad"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="demo-input"
            style={{ width: '100%', margin: '0.5rem 0' }}
          />
          <p>Guardado: <strong>{age} años</strong></p>
          <button className="demo-button" onClick={() => setAge(prev => prev + 1)}>
            +1 Año
          </button>
        </div>

        {/* Demo object */}
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>Object en localStorage</h5>
          <div style={{ margin: '0.5rem 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  notifications: e.target.checked
                }))}
              />
              Notificaciones
            </label>
          </div>
          <select
            value={preferences.theme}
            onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
            className="demo-input"
            style={{ width: '100%', margin: '0.5rem 0' }}
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
          <p style={{ fontSize: '0.875rem' }}>
            <strong>Objeto guardado:</strong><br/>
            {JSON.stringify(preferences, null, 2)}
          </p>
        </div>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: '#e6fffa', 
        borderRadius: '8px',
        fontSize: '0.875rem'
      }}>
        <strong>💡 Prueba esto:</strong> Recarga la página y verás que los valores se mantienen. 
        También puedes abrir las DevTools → Application → Local Storage para ver los datos guardados.
      </div>
    </div>
  )
}

export default Exercise2
