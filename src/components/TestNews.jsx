// 🧪 TestNews - Componente para probar useNews
// 
// INSTRUCCIONES PARA EL ESTUDIANTE:
// 1. Importa tu hook useNews desde '../hooks/useNews'
// 2. Úsalo en este componente para obtener noticias
// 3. Implementa la funcionalidad de filtrado por categoría
// 4. Maneja los estados de carga y error apropiadamente

import React from 'react'
// TODO: Importa tu hook aquí
// import useNews from '../hooks/useNews'

const TestNews = () => {
  // TODO: Usa tu hook aquí
  // const { noticias, loading, error, filtrarPorCategoria } = useNews()

  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      margin: '1rem 0'
    }}>
      <h4>🧪 Test: useNews</h4>
      <p>Este componente prueba tu hook useNews</p>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h5>📂 Filtros de Categoría:</h5>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { key: 'todas', emoji: '📄', label: 'Todas' },
            { key: 'tecnologia', emoji: '💻', label: 'Tecnología' },
            { key: 'deportes', emoji: '⚽', label: 'Deportes' },
            { key: 'politica', emoji: '🏛️', label: 'Política' },
            { key: 'entretenimiento', emoji: '🎬', label: 'Entretenimiento' },
            { key: 'ciencia', emoji: '🔬', label: 'Ciencia' },
            { key: 'negocios', emoji: '💼', label: 'Negocios' }
          ].map(categoria => (
            <button
              key={categoria.key}
              // onClick={() => filtrarPorCategoria(categoria.key)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                border: '1px solid #007acc',
                background: 'white',
                color: '#007acc',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {categoria.emoji} {categoria.label}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{
        minHeight: '200px',
        padding: '1rem',
        background: '#f8f9fa',
        borderRadius: '4px',
        border: '1px solid #e9ecef'
      }}>
        {/* {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>🔄 Cargando noticias...</p>
          </div>
        )}
        
        {error && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            <p>❌ Error: {error}</p>
          </div>
        )}
        
        {!loading && !error && noticias.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>📰 No hay noticias disponibles</p>
          </div>
        )}
        
        {!loading && !error && noticias.length > 0 && (
          <div>
            <h5>📰 Noticias ({noticias.length}):</h5>
            {noticias.map((noticia, index) => (
              <div key={index} style={{
                padding: '1rem',
                marginBottom: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white'
              }}>
                <h6 style={{ margin: 0, color: '#007acc' }}>
                  {noticia.titulo}
                </h6>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                  {noticia.descripcion}
                </p>
                <span style={{
                  fontSize: '0.8rem',
                  background: '#e7f3ff',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  color: '#007acc'
                }}>
                  📂 {noticia.categoria}
                </span>
              </div>
            ))}
          </div>
        )} */}
        
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>💡 Descomenta el código JSX para ver las noticias</p>
          <p>🔧 Asegúrate de implementar tu hook useNews primero</p>
        </div>
      </div>
      
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#e7f3ff',
        borderRadius: '4px'
      }}>
        <h5>🎯 ¿Cómo probar que funciona?</h5>
        <ol>
          <li>Asegúrate de que json-server esté corriendo (npm run api)</li>
          <li>Implementa tu hook useNews</li>
          <li>Descomenta las líneas del JSX</li>
          <li>Los filtros deberían mostrar diferentes noticias</li>
        </ol>
      </div>
    </div>
  )
}

export default TestNews
