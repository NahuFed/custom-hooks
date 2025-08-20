import { useState, useEffect, useRef } from 'react'

const Exercise3 = () => {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="theory-content">
        <h2>⚡ Ejercicio 3: useFetch Hook</h2>
        
        <div className="highlight-box">
          <h3>🎯 Objetivo</h3>
          <p>
            Crear un custom hook llamado <code>useFetch</code> que maneje peticiones HTTP 
            con estados de carga, error y datos, incluyendo cancelación de requests.
          </p>
        </div>

        <h3>📋 Requisitos</h3>
        <ul>
          <li>Manejar estados: <code>data</code>, <code>loading</code>, <code>error</code></li>
          <li>Ejecutar fetch automáticamente o manualmente</li>
          <li>Cancelar requests cuando el componente se desmonte</li>
          <li>Función <code>refetch</code> para volver a hacer el request</li>
          <li>Soporte para diferentes métodos HTTP (GET, POST, PUT, DELETE)</li>
          <li>Configuración de headers y opciones</li>
        </ul>

        <h3>💡 Pistas</h3>
        <ul>
          <li>Usa <code>AbortController</code> para cancelar requests</li>
          <li>Implementa cleanup en <code>useEffect</code></li>
          <li>Considera cuándo hacer auto-fetch vs manual</li>
          <li>Maneja errores de red y de HTTP status</li>
        </ul>

        <h3>🧪 Casos de Uso Esperados</h3>
        <div className="code-block">
{`// Auto-fetch al montar
const { data, loading, error, refetch } = useFetch('/api/users')

// Fetch manual
const { execute, data, loading, error } = useFetch('/api/users', { manual: true })

// Con opciones
const { data } = useFetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' })
})`}
        </div>

        <h3>⚠️ Consideraciones Avanzadas</h3>
        <ul>
          <li><strong>Memory leaks:</strong> Cancelar requests en componentes desmontados</li>
          <li><strong>Race conditions:</strong> Manejar múltiples requests simultáneos</li>
          <li><strong>Retry logic:</strong> Reintentar en caso de error</li>
          <li><strong>Caching:</strong> Evitar requests duplicados</li>
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
{`// hooks/useFetch.js
import { useState, useEffect, useRef, useCallback } from 'react'

function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!options.manual)
  const [error, setError] = useState(null)
  
  const abortControllerRef = useRef()
  const optionsRef = useRef(options)
  
  // Actualizar options ref cuando cambien
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const execute = useCallback(async (customUrl = url, customOptions = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      // Cancelar request anterior si existe
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      
      // Crear nuevo AbortController
      const abortController = new AbortController()
      abortControllerRef.current = abortController
      
      const finalOptions = {
        ...optionsRef.current,
        ...customOptions,
        signal: abortController.signal
      }
      
      const response = await fetch(customUrl, finalOptions)
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
      }
      
      const result = await response.json()
      setData(result)
      return result
      
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
        throw err
      }
    } finally {
      setLoading(false)
    }
  }, [url])

  const refetch = useCallback(() => {
    return execute()
  }, [execute])

  // Auto-fetch si no es manual
  useEffect(() => {
    if (!options.manual && url) {
      execute()
    }
    
    // Cleanup: cancelar request si el componente se desmonta
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [execute, options.manual, url])

  return {
    data,
    loading,
    error,
    execute,
    refetch
  }
}

export default useFetch`}
            </div>

            <h4>Versión con Retry Logic:</h4>
            <div className="code-block">
{`function useFetchWithRetry(url, options = {}) {
  const { retries = 3, retryDelay = 1000 } = options
  const [retryCount, setRetryCount] = useState(0)
  
  const fetchWithRetry = useCallback(async (currentRetry = 0) => {
    try {
      return await execute()
    } catch (error) {
      if (currentRetry < retries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay))
        setRetryCount(currentRetry + 1)
        return fetchWithRetry(currentRetry + 1)
      }
      throw error
    }
  }, [execute, retries, retryDelay])
  
  return { ...useFetch(url, options), retryCount, fetchWithRetry }
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
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: "🏗️ Configuración inicial",
      description: "Crea la estructura básica del hook useFetch",
      template: `// src/hooks/useFetch.js
import { useState, useEffect, useRef, useCallback } from 'react'

function useFetch(url, options = {}) {
  // TODO: Estados para data, loading, error
  // TODO: Ref para AbortController
  // TODO: Función execute
  // TODO: useEffect para auto-fetch
  // TODO: Cleanup
  
  return {
    data: null,
    loading: false,
    error: null,
    execute: () => {},
    refetch: () => {}
  }
}

export default useFetch`,
      challenges: [
        "Definir los estados necesarios (data, loading, error)",
        "Configurar useRef para AbortController",
        "Decidir si hacer auto-fetch o manual"
      ]
    },
    {
      id: 2,
      title: "🔄 Implementar execute",
      description: "Crea la función principal que hace el fetch",
      challenges: [
        "Manejar estados de loading y error",
        "Implementar AbortController para cancelación",
        "Parsear respuesta JSON",
        "Manejar errores HTTP y de red"
      ],
      hint: "Recuerda que AbortError no debe considerarse un error real"
    },
    {
      id: 3,
      title: "⚡ Auto-fetch y manual",
      description: "Implementa auto-fetch y modo manual",
      challenges: [
        "useEffect que ejecute fetch automáticamente",
        "Condición para modo manual",
        "Dependencias correctas del useEffect",
        "Cleanup al desmontar componente"
      ],
      hint: "Usa options.manual para controlar el comportamiento"
    },
    {
      id: 4,
      title: "🧪 Testing y optimización",
      description: "Prueba tu hook y optimiza",
      testCases: [
        "Auto-fetch al montar: useFetch('/api/users')",
        "Fetch manual: useFetch('/api/users', { manual: true })",
        "Con opciones: useFetch('/api/data', { method: 'POST' })",
        "Cancelación al desmontar"
      ],
      hint: "Asegúrate de que no hay memory leaks"
    }
  ]

  const currentStepData = steps.find(s => s.id === currentStep)

  return (
    <div style={{ 
      background: '#f7fafc', 
      border: '2px solid #e2e8f0', 
      borderRadius: '10px', 
      padding: '2rem'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4>⚡ Roadmap de Implementación</h4>
          <div style={{ fontSize: '0.875rem', color: '#718096' }}>
            Paso {currentStep} de {steps.length}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {steps.map(s => (
            <div
              key={s.id}
              style={{
                width: '100%',
                height: '4px',
                background: s.id <= currentStep ? '#667eea' : '#e2e8f0',
                borderRadius: '2px'
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h5 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>
          {currentStepData.title}
        </h5>
        <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
          {currentStepData.description}
        </p>
        
        {currentStepData.template && (
          <div className="code-block" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
            {currentStepData.template}
          </div>
        )}
        
        {currentStepData.challenges && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>🎯 Desafíos de este paso:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              {currentStepData.challenges.map((challenge, index) => (
                <li key={index} style={{ marginBottom: '0.25rem', color: '#4a5568' }}>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentStepData.testCases && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>🧪 Casos de prueba:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              {currentStepData.testCases.map((testCase, index) => (
                <li key={index} style={{ marginBottom: '0.25rem', color: '#4a5568' }}>
                  <code style={{ background: '#e2e8f0', padding: '0.125rem 0.25rem', borderRadius: '3px' }}>
                    {testCase}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {currentStepData.hint && (
          <div style={{ 
            background: '#e6fffa', 
            border: '1px solid #4fd1c7', 
            borderRadius: '6px', 
            padding: '0.75rem'
          }}>
            <strong>💡 Pista:</strong> {currentStepData.hint}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        <button 
          className="demo-button"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          style={{ 
            background: currentStep === 1 ? '#e2e8f0' : '#4299e1',
            color: currentStep === 1 ? '#a0aec0' : 'white'
          }}
        >
          ← Paso Anterior
        </button>
        
        <button 
          className="demo-button"
          onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          disabled={currentStep === steps.length}
          style={{ 
            background: currentStep === steps.length ? '#e2e8f0' : '#667eea',
            color: currentStep === steps.length ? '#a0aec0' : 'white'
          }}
        >
          Siguiente Paso →
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
        <strong>🎯 API Objetivo:</strong> <code>{'const { data, loading, error, execute, refetch } = useFetch(url, options)'}</code>
        <br />
        <strong>🌐 Para pruebas:</strong> Usa <code>https://jsonplaceholder.typicode.com/users</code>
      </div>
    </div>
  )
}

const SolutionDemo = () => {
  // Mock API para demostración
  const mockApi = {
    users: [
      { id: 1, name: 'Ana García', email: 'ana@example.com' },
      { id: 2, name: 'Carlos López', email: 'carlos@example.com' },
      { id: 3, name: 'María Rodríguez', email: 'maria@example.com' }
    ],
    
    async fetch(endpoint, options = {}) {
      const delay = Math.random() * 2000 + 500 // 500-2500ms
      await new Promise(resolve => setTimeout(resolve, delay))
      
      // Simular error ocasional
      if (Math.random() < 0.2) {
        throw new Error('Error de red simulado')
      }
      
      if (endpoint === '/users') {
        return { ok: true, json: async () => this.users }
      }
      
      if (endpoint === '/slow-endpoint') {
        await new Promise(resolve => setTimeout(resolve, 3000))
        return { ok: true, json: async () => ({ message: 'Respuesta lenta' }) }
      }
      
      throw new Error('Endpoint no encontrado')
    }
  }

  // Implementación simplificada del hook para la demo
  const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(!options.manual)
    const [error, setError] = useState(null)
    const abortControllerRef = useRef()

    const execute = useState(() => {
      return async () => {
        try {
          setLoading(true)
          setError(null)
          
          if (abortControllerRef.current) {
            abortControllerRef.current.abort()
          }
          
          abortControllerRef.current = new AbortController()
          
          const response = await mockApi.fetch(url, options)
          const result = await response.json()
          setData(result)
          
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message)
          }
        } finally {
          setLoading(false)
        }
      }
    })[0]

    useEffect(() => {
      if (!options.manual) {
        execute()
      }
      
      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }
      }
    }, [execute, options.manual])

    return { data, loading, error, execute, refetch: execute }
  }

  const [activeDemo, setActiveDemo] = useState('auto')
  
  // Demos
  const autoFetch = useFetch('/users')
  const manualFetch = useFetch('/users', { manual: true })
  const slowFetch = useFetch('/slow-endpoint', { manual: true })

  return (
    <div className="exercise-demo">
      <h4>🎮 Demo de la Solución</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <button 
          className={`demo-button ${activeDemo === 'auto' ? '' : ''}`}
          onClick={() => setActiveDemo('auto')}
          style={{ 
            background: activeDemo === 'auto' ? '#48bb78' : '#e2e8f0',
            color: activeDemo === 'auto' ? 'white' : '#4a5568'
          }}
        >
          Auto Fetch
        </button>
        <button 
          className={`demo-button ${activeDemo === 'manual' ? '' : ''}`}
          onClick={() => setActiveDemo('manual')}
          style={{ 
            background: activeDemo === 'manual' ? '#48bb78' : '#e2e8f0',
            color: activeDemo === 'manual' ? 'white' : '#4a5568'
          }}
        >
          Manual Fetch
        </button>
        <button 
          className={`demo-button ${activeDemo === 'slow' ? '' : ''}`}
          onClick={() => setActiveDemo('slow')}
          style={{ 
            background: activeDemo === 'slow' ? '#48bb78' : '#e2e8f0',
            color: activeDemo === 'slow' ? 'white' : '#4a5568'
          }}
        >
          Slow Request
        </button>
      </div>

      {activeDemo === 'auto' && (
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>Auto Fetch Demo</h5>
          <p>Este request se ejecuta automáticamente al montar el componente:</p>
          
          {autoFetch.loading && <div>⏳ Cargando usuarios...</div>}
          {autoFetch.error && <div style={{ color: '#e53e3e' }}>❌ Error: {autoFetch.error}</div>}
          {autoFetch.data && (
            <div>
              <p>✅ {autoFetch.data.length} usuarios cargados:</p>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                {autoFetch.data.map(user => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button className="demo-button" onClick={autoFetch.refetch} disabled={autoFetch.loading}>
            Refetch
          </button>
        </div>
      )}

      {activeDemo === 'manual' && (
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>Manual Fetch Demo</h5>
          <p>Este request solo se ejecuta cuando hagas click:</p>
          
          {manualFetch.loading && <div>⏳ Cargando usuarios...</div>}
          {manualFetch.error && <div style={{ color: '#e53e3e' }}>❌ Error: {manualFetch.error}</div>}
          {manualFetch.data && (
            <div>
              <p>✅ {manualFetch.data.length} usuarios cargados:</p>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                {manualFetch.data.map(user => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button className="demo-button" onClick={manualFetch.execute} disabled={manualFetch.loading}>
            {manualFetch.loading ? 'Cargando...' : 'Fetch Manual'}
          </button>
        </div>
      )}

      {activeDemo === 'slow' && (
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>Slow Request Demo</h5>
          <p>Request lento para demostrar cancelación:</p>
          
          {slowFetch.loading && <div>⏳ Request lento en progreso... (puede cancelarse)</div>}
          {slowFetch.error && <div style={{ color: '#e53e3e' }}>❌ Error: {slowFetch.error}</div>}
          {slowFetch.data && (
            <div style={{ color: '#38a169' }}>
              ✅ {slowFetch.data.message}
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="demo-button" 
              onClick={slowFetch.execute} 
              disabled={slowFetch.loading}
            >
              Ejecutar Request Lento
            </button>
            {slowFetch.loading && (
              <button 
                className="demo-button" 
                onClick={() => window.location.reload()}
                style={{ background: '#e53e3e' }}
              >
                Cancelar (reload)
              </button>
            )}
          </div>
        </div>
      )}

      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: '#e6fffa', 
        borderRadius: '8px',
        fontSize: '0.875rem'
      }}>
        <strong>💡 Características implementadas:</strong>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
          <li>Estados de loading, error y data</li>
          <li>Auto-fetch vs manual</li>
          <li>Función refetch</li>
          <li>Cancelación de requests (simulada con reload)</li>
          <li>Manejo de errores de red</li>
        </ul>
      </div>
    </div>
  )
}

export default Exercise3
