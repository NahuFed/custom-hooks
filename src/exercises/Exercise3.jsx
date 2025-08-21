import { useState } from 'react'

const Exercise3 = () => {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="theory-content">
        <h2>📰 Ejercicio 3: useNews Hook - API Simple</h2>
        
        <div className="highlight-box">
          <h3>🎯 Objetivo</h3>
          <p>
            Crear un custom hook llamado <code>useNews</code> que obtenga noticias 
            de una API y permita filtrar por categoría de forma simple.
          </p>
        </div>

        <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
          <h4>🚀 Para empezar:</h4>
          <ol>
            <li>Ejecuta <code>npm run api</code> en una terminal para iniciar la API fake</li>
            <li>La API estará disponible en <code>http://localhost:3001</code></li>
            <li>Crea el archivo <code>src/hooks/useNews.js</code></li>
          </ol>
        </div>

        <h3>📋 Requisitos Simples</h3>
        <ul>
          <li>Estado <code>noticias</code> para guardar la lista</li>
          <li>Estado <code>loading</code> para mostrar "Cargando..."</li>
          <li>Función <code>cargarNoticias()</code> para obtener datos de la API</li>
          <li>Función <code>filtrarPorCategoria(categoria)</code> para filtrar</li>
        </ul>

        <h3>🗂️ API Disponible</h3>
        <div className="highlight-box">
          <ul>
            <li><code>GET http://localhost:3001/noticias</code> - Todas las noticias</li>
            <li><code>GET http://localhost:3001/noticias?categoria=tecnologia</code> - Por categoría</li>
          </ul>
        </div>

        <h3>💡 Pistas</h3>
        <ul>
          <li>Usa <code>useState</code> para manejar noticias y loading</li>
          <li>Usa <code>useEffect</code> para cargar noticias al inicio</li>
          <li>Usa <code>fetch()</code> para hacer las peticiones</li>
          <li>¡Mantén la simplicidad! No te compliques</li>
        </ul>

        <h3>🧪 Uso Esperado</h3>
        <div className="code-block">
          <pre>{`// Así debería funcionar tu hook:
const { noticias, loading, cargarNoticias, filtrarPorCategoria } = useNews()

// cargarNoticias() - carga todas las noticias
// filtrarPorCategoria('tecnologia') - solo noticias de tecnología`}</pre>
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
              <pre>{`// hooks/useNews.js
import { useState, useEffect } from 'react'

function useNews() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(false)

  const cargarNoticias = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/noticias')
      const data = await response.json()
      setNoticias(data)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  const filtrarPorCategoria = async (categoria) => {
    setLoading(true)
    try {
      let url = 'http://localhost:3001/noticias'
      if (categoria !== 'todas') {
        url += '?categoria=' + categoria
      }
      
      const response = await fetch(url)
      const data = await response.json()
      setNoticias(data)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  // Cargar noticias al inicio
  useEffect(() => {
    cargarNoticias()
  }, [])

  return {
    noticias,
    loading,
    cargarNoticias,
    filtrarPorCategoria
  }
}

export default useNews`}</pre>
            </div>

            <h3>🎮 Ejemplo de Uso</h3>
            <div className="code-block">
              <pre>{`import useNews from './hooks/useNews'

function NoticiasApp() {
  const { noticias, loading, filtrarPorCategoria } = useNews()

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <button onClick={() => filtrarPorCategoria('todas')}>Todas</button>
      <button onClick={() => filtrarPorCategoria('tecnologia')}>Tecnología</button>
      <button onClick={() => filtrarPorCategoria('deportes')}>Deportes</button>
      
      {noticias.map(noticia => (
        <div key={noticia.id}>
          <h3>{noticia.titulo}</h3>
          <p>{noticia.contenido}</p>
          <small>Categoría: {noticia.categoria}</small>
        </div>
      ))}
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
          <li>Crea el archivo <code>src/hooks/useNews.js</code></li>
          <li>Importa <code>useState</code> y <code>useEffect</code> de React</li>
          <li>Crea estados para <code>noticias</code> y <code>loading</code></li>
          <li>Crea función <code>cargarNoticias</code> que use fetch()</li>
          <li>Crea función <code>filtrarPorCategoria</code></li>
          <li>Usa useEffect para cargar noticias al inicio</li>
          <li>Retorna las funciones y estados en un objeto</li>
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
          El objetivo es <strong>reutilizar la lógica</strong> de cargar noticias. 
          Una vez que tengas el hook, cualquier componente podrá usar noticias 
          fácilmente sin repetir código.
        </p>
      </div>
    </div>
  )
}

export default Exercise3
