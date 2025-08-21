// 🧪 TestForm - Componente para probar useForm
// 
// INSTRUCCIONES PARA EL ESTUDIANTE:
// 1. Importa tu hook useForm desde '../hooks/useForm'
// 2. Úsalo en este componente para manejar el formulario
// 3. Conecta los inputs con handleChange del hook
// 4. Implementa la funcionalidad de reset

import React from 'react'
// TODO: Importa tu hook aquí
// import useForm from '../hooks/useForm'

const TestForm = () => {
  // TODO: Usa tu hook aquí
  // const { values, handleChange, reset } = useForm({
  //   nombre: '',
  //   email: '',
  //   comentario: 'Me gusta React!'
  // })

  const enviarFormulario = (e) => {
    e.preventDefault()
    // TODO: Descomenta cuando tengas el hook listo
    // console.log('Datos del formulario:', values)
    alert('¡Formulario enviado! (Revisa la consola para ver los datos)')
    // reset()
  }

  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      margin: '1rem 0'
    }}>
      <h4>🧪 Test: useForm</h4>
      <p>Este componente prueba tu hook useForm</p>
      
      <form onSubmit={enviarFormulario} style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h5>📝 Formulario de Contacto</h5>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            👤 Nombre:
          </label>
          <input 
            name="nombre"
            type="text"
            placeholder="Tu nombre completo"
            // value={values.nombre}
            // onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            📧 Email:
          </label>
          <input 
            name="email"
            type="email"
            placeholder="tu@email.com"
            // value={values.email}
            // onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            💬 Comentario:
          </label>
          <textarea 
            name="comentario"
            placeholder="Escribe tu comentario aquí..."
            // value={values.comentario}
            // onChange={handleChange}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#007acc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📤 Enviar
          </button>
          
          <button 
            type="button"
            // onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🧹 Limpiar
          </button>
        </div>
      </form>
      
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#f0f8ff',
        borderRadius: '4px',
        border: '1px solid #007acc'
      }}>
        <h5>📊 Estado actual del formulario:</h5>
        {/* <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
          <p>👤 Nombre: "{values.nombre}"</p>
          <p>📧 Email: "{values.email}"</p>
          <p>💬 Comentario: "{values.comentario}"</p>
        </div> */}
        <p>🔧 Descomenta las líneas para ver los valores en tiempo real</p>
      </div>
      
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#e7f3ff',
        borderRadius: '4px'
      }}>
        <h5>🎯 Pasos para usar este componente:</h5>
        <ol>
          <li>Implementa tu hook <code>useForm</code> en <code>src/hooks/useForm.js</code></li>
          <li>Importa el hook al inicio de este archivo</li>
          <li>Descomenta la línea del hook en el componente</li>
          <li>Descomenta las props de los inputs (value, onChange)</li>
          <li>Descomenta el onClick del botón reset</li>
          <li>Descomenta la sección del estado para ver los valores</li>
        </ol>
      </div>
    </div>
  )
}

export default TestForm
