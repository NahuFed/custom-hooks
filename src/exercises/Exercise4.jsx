import { useState } from 'react'

const Exercise4 = () => {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="theory-content">
        <h2>📝 Ejercicio 4: useForm Hook</h2>
        
        <div className="highlight-box">
          <h3>🎯 Objetivo</h3>
          <p>
            Crear un custom hook simple llamado <code>useForm</code> que maneje 
            los valores de un formulario y evite repetir código.
          </p>
        </div>

        <h3>📋 Requisitos Simples</h3>
        <ul>
          <li>Recibir <code>valores iniciales</code> del formulario</li>
          <li>Manejar el <code>cambio de valores</code> automáticamente</li>
          <li>Función <code>handleChange</code> para usar en inputs</li>
          <li>Función <code>reset</code> para limpiar el formulario</li>
          <li>Retornar <code>values</code>, <code>handleChange</code> y <code>reset</code></li>
        </ul>

        <h3>💡 Pistas</h3>
        <ul>
          <li>Usa <code>useState</code> para manejar los valores</li>
          <li>La función <code>handleChange</code> debe actualizar el campo correcto</li>
          <li>Usa <code>event.target.name</code> y <code>event.target.value</code></li>
          <li>Mantén la simplicidad, no agregues validaciones complejas</li>
        </ul>

        <h3>🧪 Uso Esperado</h3>
        <div className="code-block">
          <pre>{`// Así debería funcionar tu hook:
const { values, handleChange, reset } = useForm({
  nombre: '',
  email: '',
  mensaje: ''
})

// values = { nombre: '', email: '', mensaje: '' }
// handleChange manejará automáticamente todos los campos
// reset() volverá a los valores iniciales`}</pre>
        </div>

        <div className="exercise-demo">
          <h3>🎮 Área de Práctica</h3>
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
              <pre>{`// hooks/useForm.js
import { useState } from 'react'

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const reset = () => {
    setValues(initialValues)
  }

  return {
    values,
    handleChange,
    reset
  }
}

export default useForm`}</pre>
            </div>

            <h3>🎮 Ejemplo de Uso</h3>
            <div className="code-block">
              <pre>{`import useForm from './hooks/useForm'

function ContactForm() {
  const { values, handleChange, reset } = useForm({
    nombre: '',
    email: '',
    mensaje: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos del formulario:', values)
    alert('Formulario enviado!')
    reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={values.nombre}
        onChange={handleChange}
        placeholder="Tu nombre"
      />
      
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Tu email"
      />
      
      <textarea
        name="mensaje"
        value={values.mensaje}
        onChange={handleChange}
        placeholder="Tu mensaje"
      />
      
      <button type="submit">Enviar</button>
      <button type="button" onClick={reset}>Limpiar</button>
    </form>
  )
}`}</pre>
            </div>
          </div>
        )}
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
          <li>Crea el archivo <code>src/hooks/useForm.js</code></li>
          <li>Importa <code>useState</code> de React</li>
          <li>Crea la función <code>useForm(initialValues)</code></li>
          <li>Crea estado <code>values</code> con los valores iniciales</li>
          <li>Crea función <code>handleChange</code> que use <code>event.target</code></li>
          <li>Crea función <code>reset</code> que vuelva a valores iniciales</li>
          <li>Retorna un objeto con <code>values</code>, <code>handleChange</code>, <code>reset</code></li>
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
          Este hook te permite <strong>reutilizar la lógica</strong> de formularios. 
          Una vez implementado, podrás usarlo en cualquier formulario sin repetir 
          el código de manejo de valores.
        </p>
      </div>
    </div>
  )
}

export default Exercise4
