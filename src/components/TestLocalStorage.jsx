// 🧪 TestLocalStorage - Componente para probar useLocalStorage
// 
// INSTRUCCIONES PARA EL ESTUDIANTE:
// 1. Importa tu hook useLocalStorage desde '../hooks/useLocalStorage'
// 2. Úsalo en este componente para manejar el estado de 'nombre'
// 3. El input debe mostrar el valor actual y persistirlo en localStorage
// 4. Debería mantener el valor al recargar la página

import React from 'react'
// TODO: Importa tu hook aquí
// import useLocalStorage from '../hooks/useLocalStorage'

const TestLocalStorage = () => {
  // TODO: Usa tu hook aquí
  // const [nombre, setNombre] = useLocalStorage('nombre', '')

  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      margin: '1rem 0'
    }}>
      <h4>🧪 Test: useLocalStorage</h4>
      <p>Este componente prueba tu hook useLocalStorage</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Nombre (se guarda automáticamente): </label>
        <input
          type="text"
          placeholder="Escribe tu nombre..."
          // value={nombre}
          // onChange={(e) => setNombre(e.target.value)}
          style={{
            marginLeft: '0.5rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      
      <div style={{
        padding: '1rem',
        background: '#f8f9fa',
        borderRadius: '4px',
        border: '1px solid #e9ecef'
      }}>
        <p><strong>📊 Estado actual:</strong></p>
        {/* <p>Valor guardado: {nombre || '(vacío)'}</p> */}
        <p>💡 Descomenta las líneas para ver el hook en acción</p>
      </div>
      
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#e7f3ff',
        borderRadius: '4px'
      }}>
        <h5>🎯 ¿Cómo probar que funciona?</h5>
        <ol>
          <li>Escribe algo en el input</li>
          <li>Recarga la página (F5)</li>
          <li>El valor debería persistir</li>
        </ol>
      </div>
    </div>
  )
}

export default TestLocalStorage
