import { useState } from 'react'
import BasicHookExample from './examples/BasicHookExample'
import ComplexHookExample from './examples/ComplexHookExample'

const TheorySection = () => {
  const [currentTopic, setCurrentTopic] = useState('introduction')

  const topics = [
    { id: 'introduction', label: '🎯 Introducción' },
    { id: 'rules', label: '📋 Reglas de los Hooks' },
    { id: 'basic-example', label: '🔧 Ejemplo Básico' },
    { id: 'advanced-example', label: '⚡ Ejemplo Avanzado' },
    { id: 'best-practices', label: '✨ Mejores Prácticas' }
  ]

  const renderContent = () => {
    switch (currentTopic) {
      case 'introduction':
        return (
          <div className="theory-content">
            <h2>¿Qué son los Custom Hooks?</h2>
            
            <p>
              Los <strong>Custom Hooks</strong> son funciones JavaScript que nos permiten extraer 
              lógica de componentes y reutilizarla entre diferentes componentes. Son una de las 
              características más poderosas de React para crear código reutilizable y mantenible.
            </p>

            <div className="highlight-box">
              <h3>🔑 Puntos Clave:</h3>
              <ul>
                <li><strong>Reutilización:</strong> Comparte lógica entre componentes</li>
                <li><strong>Separación de responsabilidades:</strong> Separa la lógica de la presentación</li>
                <li><strong>Composición:</strong> Combina múltiples hooks para crear funcionalidad compleja</li>
                <li><strong>Testing:</strong> Facilita las pruebas unitarias de la lógica</li>
              </ul>
            </div>

            <h3>¿Por qué usar Custom Hooks?</h3>
            <p>Antes de los hooks, compartir lógica estateful entre componentes era complicado:</p>
            
            <ul>
              <li><strong>Render Props:</strong> Patrones complejos y verbose</li>
              <li><strong>Higher-Order Components (HOCs):</strong> "Wrapper hell" y problemas de props</li>
              <li><strong>Mixins:</strong> Deprecated y problemáticos</li>
            </ul>

            <p>
              Los Custom Hooks resuelven estos problemas ofreciendo una API simple y elegante 
              para compartir lógica estateful.
            </p>

            <div className="code-block">
{`// ❌ Antes: Lógica duplicada en múltiples componentes
function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser().then(setUser).finally(() => setLoading(false))
  }, [])
  
  // ... resto del componente
}

function UserSettings() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser().then(setUser).finally(() => setLoading(false))
  }, [])
  
  // ... resto del componente
}

// ✅ Después: Lógica reutilizable con Custom Hook
function useUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser().then(setUser).finally(() => setLoading(false))
  }, [])
  
  return { user, loading }
}

function UserProfile() {
  const { user, loading } = useUser()
  // ... resto del componente
}

function UserSettings() {
  const { user, loading } = useUser()
  // ... resto del componente
}`}
            </div>
          </div>
        )

      case 'rules':
        return (
          <div className="theory-content">
            <h2>📋 Reglas de los Custom Hooks</h2>
            
            <div className="highlight-box">
              <h3>🚨 Reglas Fundamentales:</h3>
              <ol>
                <li><strong>Nombrado:</strong> Siempre deben empezar con "use"</li>
                <li><strong>Nivel superior:</strong> Solo se pueden llamar en el nivel superior</li>
                <li><strong>Componentes de función:</strong> Solo en componentes funcionales u otros hooks</li>
                <li><strong>Orden consistente:</strong> Siempre se deben llamar en el mismo orden</li>
              </ol>
            </div>

            <h3>1. Convención de Nombrado</h3>
            <div className="code-block">
{`// ✅ Correcto: Empieza con "use"
function useCounter() { ... }
function useLocalStorage() { ... }
function useApi() { ... }

// ❌ Incorrecto: No empieza con "use"
function counter() { ... }
function localStorage() { ... }
function apiHelper() { ... }`}
            </div>

            <h3>2. Solo en el Nivel Superior</h3>
            <div className="code-block">
{`function MyComponent() {
  // ✅ Correcto: En el nivel superior
  const [count, setCount] = useState(0)
  const { data } = useApi()
  
  if (count > 0) {
    // ❌ Incorrecto: Dentro de una condición
    const [error, setError] = useState(null)
  }
  
  for (let i = 0; i < 10; i++) {
    // ❌ Incorrecto: Dentro de un loop
    const value = useCallback(() => {}, [])
  }
  
  return <div>{count}</div>
}`}
            </div>

            <h3>3. Composición de Hooks</h3>
            <p>Los Custom Hooks pueden usar otros hooks (built-in u otros custom hooks):</p>
            
            <div className="code-block">
{`function useCounter(initialValue = 0) {
  // Usando hooks built-in
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])
  
  return { count, increment, decrement }
}

function useLocalStorageCounter(key, initialValue = 0) {
  // Usando otro custom hook
  const { count, increment, decrement } = useCounter(initialValue)
  
  // Persistir en localStorage
  useEffect(() => {
    localStorage.setItem(key, count.toString())
  }, [key, count])
  
  return { count, increment, decrement }
}`}
            </div>
          </div>
        )

      case 'basic-example':
        return (
          <div className="theory-content">
            <h2>🔧 Ejemplo Básico: useCounter</h2>
            
            <p>
              Vamos a crear nuestro primer Custom Hook: un contador reutilizable con 
              funcionalidades básicas.
            </p>

            <div className="code-block">
{`// hooks/useCounter.js
import { useState, useCallback } from 'react'

function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    setCount(prev => prev + step)
  }, [step])
  
  const decrement = useCallback(() => {
    setCount(prev => prev - step)
  }, [step])
  
  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])
  
  const setValue = useCallback((value) => {
    if (typeof value === 'function') {
      setCount(value)
    } else {
      setCount(value)
    }
  }, [])
  
  return {
    count,
    increment,
    decrement,
    reset,
    setValue
  }
}`}
            </div>

            <h3>Uso del Hook:</h3>
            
            <div className="code-block">
{`// Componente que usa el hook
function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(0, 2)
  
  return (
    <div>
      <h3>Contador: {count}</h3>
      <button onClick={increment}>+2</button>
      <button onClick={decrement}>-2</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`}
            </div>

            <div className="exercise-demo">
              <h3>Demo en Vivo:</h3>
              <BasicHookExample />
            </div>

            <div className="highlight-box">
              <h3>💡 Ventajas de este enfoque:</h3>
              <ul>
                <li><strong>Reutilizable:</strong> Puede usarse en múltiples componentes</li>
                <li><strong>Configurable:</strong> Acepta valor inicial y step</li>
                <li><strong>Testeable:</strong> La lógica puede probarse independientemente</li>
                <li><strong>Composable:</strong> Puede combinarse con otros hooks</li>
              </ul>
            </div>
          </div>
        )

      case 'advanced-example':
        return (
          <div className="theory-content">
            <h2>⚡ Ejemplo Avanzado: useApi</h2>
            
            <p>
              Ahora vamos a crear un hook más complejo que maneja llamadas a APIs 
              con estados de carga, error y datos.
            </p>

            <div className="code-block">
{`// hooks/useApi.js
import { useState, useEffect, useCallback, useRef } from 'react'

function useApi(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Para cancelar requests en componentes desmontados
  const cancelTokenRef = useRef()
  
  const fetchData = useCallback(async (customUrl = url, customOptions = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      // Crear AbortController para cancelar requests
      const abortController = new AbortController()
      cancelTokenRef.current = abortController
      
      const response = await fetch(customUrl, {
        ...options,
        ...customOptions,
        signal: abortController.signal
      })
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`)
      }
      
      const result = await response.json()
      setData(result)
      
    } catch (err) {
      // No setear error si el request fue cancelado
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [url, options])
  
  // Auto-fetch en mount si url está presente
  useEffect(() => {
    if (url) {
      fetchData()
    }
    
    // Cleanup: cancelar request si el componente se desmonta
    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.abort()
      }
    }
  }, [fetchData, url])
  
  // Función para refetch manual
  const refetch = useCallback(() => {
    return fetchData()
  }, [fetchData])
  
  // Función para hacer POST/PUT/DELETE
  const mutate = useCallback(async (method, body, customOptions = {}) => {
    return fetchData(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...customOptions.headers
      },
      body: JSON.stringify(body),
      ...customOptions
    })
  }, [fetchData, url])
  
  return {
    data,
    loading,
    error,
    refetch,
    mutate
  }
}`}
            </div>

            <h3>Uso del Hook Avanzado:</h3>
            
            <div className="code-block">
{`function UsersList() {
  const { data: users, loading, error, refetch } = useApi('/api/users')
  
  if (loading) return <div>Cargando usuarios...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <button onClick={refetch}>Recargar</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

function CreateUser() {
  const { mutate, loading } = useApi('/api/users')
  
  const handleSubmit = async (userData) => {
    try {
      await mutate('POST', userData)
      alert('Usuario creado exitosamente!')
    } catch (error) {
      alert('Error al crear usuario')
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* formulario */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Usuario'}
      </button>
    </form>
  )
}`}
            </div>

            <div className="exercise-demo">
              <h3>Demo en Vivo:</h3>
              <ComplexHookExample />
            </div>
          </div>
        )

      case 'best-practices':
        return (
          <div className="theory-content">
            <h2>✨ Mejores Prácticas</h2>
            
            <h3>1. 🎯 Single Responsibility Principle</h3>
            <p>Cada custom hook debe tener una responsabilidad específica y bien definida.</p>
            
            <div className="code-block">
{`// ✅ Bueno: Hook específico para gestión de formularios
function useForm(initialValues, validationRules) {
  // Lógica específica de formularios
}

// ✅ Bueno: Hook específico para localStorage
function useLocalStorage(key, defaultValue) {
  // Lógica específica de localStorage
}

// ❌ Malo: Hook que hace demasiadas cosas
function useEverything() {
  // Maneja formularios, localStorage, API calls, etc.
}`}
            </div>

            <h3>2. 🔄 Limpieza de Recursos</h3>
            <p>Siempre limpia recursos como timers, subscripciones, y event listeners.</p>
            
            <div className="code-block">
{`function useInterval(callback, delay) {
  const savedCallback = useRef()
  
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id) // ✅ Limpieza
    }
  }, [delay])
}`}
            </div>

            <h3>3. 📊 Retorno Consistente</h3>
            <p>Mantén un patrón consistente en lo que retornas.</p>
            
            <div className="code-block">
{`// ✅ Bueno: Retorno consistente con objeto
function useApi(url) {
  return {
    data,
    loading,
    error,
    refetch
  }
}

// ✅ Bueno: Retorno consistente con array
function useToggle(initial = false) {
  return [value, toggle, setValue]
}

// ❌ Malo: Retorno inconsistente
function useInconsistent(condition) {
  if (condition) {
    return { data, loading }
  }
  return [error, retry]
}`}
            </div>

            <h3>4. 🔒 Tipado con TypeScript</h3>
            <div className="code-block">
{`interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

function useApi<T>(url: string): UseApiReturn<T> {
  // Implementación tipada
}`}
            </div>

            <h3>5. 🧪 Testing</h3>
            <p>Escribe tests para tus custom hooks usando React Testing Library.</p>
            
            <div className="code-block">
{`import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter(0))
  
  act(() => {
    result.current.increment()
  })
  
  expect(result.current.count).toBe(1)
})`}
            </div>

            <div className="highlight-box">
              <h3>📝 Checklist de Mejores Prácticas:</h3>
              <ul>
                <li>✅ Nombre empieza con "use"</li>
                <li>✅ Una sola responsabilidad</li>
                <li>✅ Limpieza de recursos en useEffect</li>
                <li>✅ Retorno consistente</li>
                <li>✅ Documentación clara</li>
                <li>✅ Tests unitarios</li>
                <li>✅ Manejo de edge cases</li>
                <li>✅ Tipado con TypeScript</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="theory-section">
      <div className="exercise-tabs">
        {topics.map(topic => (
          <button
            key={topic.id}
            className={`tab-button ${currentTopic === topic.id ? 'active' : ''}`}
            onClick={() => setCurrentTopic(topic.id)}
          >
            {topic.label}
          </button>
        ))}
      </div>
      
      <div className="exercise-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default TheorySection
