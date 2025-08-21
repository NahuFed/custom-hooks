import { useState } from 'react'

const Exercise2 = () => {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="theory-content">
        <h2>💾 Ejercicio 2: useLocalStorage Hook</h2>
        
        <div className="highlight-box">
          <h3>🎯 Objetivo</h3>
          <p>
            Crear un custom hook simple llamado <code>useLocalStorage</code> que guarde 
            y recupere valores del localStorage del navegador.
          </p>
        </div>

        <h3>📋 Requisitos Simples</h3>
        <ul>
          <li>Recibir una <code>key</code> y un <code>valor inicial</code></li>
          <li>Retornar el <code>valor actual</code> y una <code>función para cambiarlo</code></li>
          <li>Guardar automáticamente en localStorage cuando cambie el valor</li>
          <li>Recuperar el valor del localStorage al cargar</li>
        </ul>

        <h3>💡 Pistas</h3>
        <ul>
          <li>Usa <code>useState</code> para manejar el valor</li>
          <li>Usa <code>useEffect</code> para guardar cuando cambie</li>
          <li>Usa <code>localStorage.getItem()</code> y <code>localStorage.setItem()</code></li>
          <li>No te preocupes por casos complejos, mantén la simplicidad</li>
        </ul>

        <h3>🧪 Uso Esperado</h3>
        <div className="code-block">
          <pre>{`// Así debería funcionar tu hook:
const [nombre, setNombre] = useLocalStorage('usuario', 'Juan')
const [edad, setEdad] = useLocalStorage('edad', '25')

// nombre = 'Juan' (o el valor guardado)
// setNombre('Pedro') guardará 'Pedro' en localStorage`}</pre>
        </div>

        <div className="exercise-demo">
          <h3>🎮 Área de Testing</h3>
          <TestingArea />
        </div>

        <div className="exercise-demo">
          <h3>🧪 Área de Práctica</h3>
          <PracticeArea />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button 
            className="demo-button"
            onClick={() => setShowSolution(!showSolution)}
            style={{ background: '#ff4444', color: 'white' }}
          >
            ⚠️ {showSolution ? 'Ocultar Solución' : 'Ver Solución (Solo si estás atascado)'}
          </button>
        </div>

        {showSolution && (
          <div style={{ marginTop: '1rem' }}>
            <div className="highlight-box" style={{ background: '#fff3cd', border: '2px solid #ffc107' }}>
              <h3>⚠️ ¡Alto! ¿Realmente necesitas ver la solución?</h3>
              <p>
                Recuerda que el objetivo es que <strong>TÚ</strong> implementes el hook. 
                Ver la solución debería ser tu último recurso.
              </p>
            </div>
            
            <h3>✅ Solución Simple</h3>
            <div className="code-block">
              <pre>{`// hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  // Obtener valor inicial del localStorage o usar el valor por defecto
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved !== null ? saved : initialValue
  })

  // Guardar en localStorage cuando el valor cambie
  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage`}</pre>
            </div>

            <h3>🎮 Ejemplo de Uso</h3>
            <div className="code-block">
              <pre>{`import useLocalStorage from './hooks/useLocalStorage'

function MiComponente() {
  const [nombre, setNombre] = useLocalStorage('nombre', '')
  const [favorito, setFavorito] = useLocalStorage('color', 'azul')

  return (
    <div>
      <input 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
      />
      <p>Hola {nombre}!</p>
      
      <input 
        value={favorito} 
        onChange={(e) => setFavorito(e.target.value)}
        placeholder="Color favorito"
      />
      <p>Tu color favorito es: {favorito}</p>
    </div>
  )
}`}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const TestingArea = () => {
  const [hookStatus, setHookStatus] = useState('no-tested')
  
  const testHook = async () => {
    try {
      const useLocalStorage = await import('../hooks/useLocalStorage.js').then(module => module.default)
      setHookStatus('success')
      alert('¡Perfecto! Tu hook useLocalStorage se importó correctamente.')
    } catch (error) {
      setHookStatus('error')
      alert(`Error: ${error.message}. Crea el archivo src/hooks/useLocalStorage.js`)
    }
  }

  return (
    <div style={{ 
      background: '#f1f8ff', 
      padding: '2rem', 
      borderRadius: '12px',
      border: '2px solid #0066cc',
      margin: '1rem 0'
    }}>
      <h4>🧪 Testing de tu Hook</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <button 
          className="demo-button"
          onClick={testHook}
          style={{ background: '#007acc' }}
        >
          🔍 Probar mi hook useLocalStorage
        </button>
        
        {hookStatus === 'success' && (
          <span style={{ color: 'green', marginLeft: '1rem' }}>
            ✅ Hook importado correctamente
          </span>
        )}
        {hookStatus === 'error' && (
          <span style={{ color: 'red', marginLeft: '1rem' }}>
            ❌ Error al importar hook
          </span>
        )}
      </div>

      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h4>🎯 Componente de Prueba</h4>
        <p>Usa este ejemplo para probar tu hook:</p>
        
        <div className="code-block">
          <pre>{`function LocalStorageTest() {
  // const [nombre, setNombre] = useLocalStorage('test-nombre', 'Usuario')
  // const [mensaje, setMensaje] = useLocalStorage('test-mensaje', 'Hola mundo')
  
  return (
    <div style={{background: 'white', padding: '1rem', borderRadius: '6px'}}>
      <h4>🧪 Test de Persistencia</h4>
      
      <div style={{marginBottom: '1rem'}}>
        <label>Nombre: </label>
        <input 
          // value={nombre}
          // onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre aquí"
        />
      </div>
      
      <div style={{marginBottom: '1rem'}}>
        <label>Mensaje: </label>
        <input 
          // value={mensaje}
          // onChange={(e) => setMensaje(e.target.value)}
          placeholder="Tu mensaje aquí"
        />
      </div>
      
      <div style={{padding: '1rem', background: '#f0f8ff', borderRadius: '4px'}}>
        {/* <p>👋 Hola {nombre}!</p> */}
        {/* <p>💬 {mensaje}</p> */}
        <p>📝 Los datos se guardan automáticamente</p>
        <p>🔄 Recarga la página para verificar persistencia</p>
      </div>
    </div>
  )
}`}</pre>
        </div>
        
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem',
          background: '#e7f3ff',
          borderRadius: '6px'
        }}>
          <p><strong>💡 ¿Cómo probar?</strong></p>
          <ol>
            <li>Crea tu hook <code>useLocalStorage</code> en el archivo especificado</li>
            <li>Haz clic en "🔍 Probar mi hook" arriba</li>
            <li>Si funciona, descomenta las líneas del componente</li>
            <li>Prueba escribir datos y recargar la página</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

const PracticeArea = () => {
  return (
    <div style={{ 
      background: '#f8f9fa', 
      padding: '2rem', 
      borderRadius: '12px',
      border: '2px dashed #6c757d' 
    }}>
      <h4>🧪 Instrucciones de Práctica</h4>
      
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h4>📝 Pasos a seguir:</h4>
        <ol>
          <li>Crea el archivo <code>src/hooks/useLocalStorage.js</code></li>
          <li>Importa <code>useState</code> y <code>useEffect</code> de React</li>
          <li>Crea la función <code>useLocalStorage(key, initialValue)</code></li>
          <li>Inicializa el estado leyendo del localStorage</li>
          <li>Agrega un useEffect para guardar cuando cambie el valor</li>
          <li>Retorna <code>[value, setValue]</code> como un array</li>
        </ol>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: '#e7f3ff', 
        borderRadius: '6px',
        borderLeft: '4px solid #007acc'
      }}>
        <h4>💡 Recuerda</h4>
        <p>
          Este ejercicio te enseña a <strong>reutilizar lógica</strong> entre componentes. 
          Una vez que tengas el hook, podrás usarlo en cualquier componente para 
          persistir datos fácilmente.
        </p>
      </div>
    </div>
  )
}

export default Exercise2
