import { useState } from 'react'

const Exercise5 = () => {
  const [currentProject, setCurrentProject] = useState('todo-app')

  const projects = [
    {
      id: 'todo-app',
      title: '📝 Todo App Avanzada',
      description: 'Una aplicación de tareas que combine múltiples custom hooks',
      difficulty: 'Experto'
    },
    {
      id: 'user-dashboard',
      title: '👤 Dashboard de Usuario',
      description: 'Dashboard con gestión de perfil y configuraciones',
      difficulty: 'Experto'
    },
    {
      id: 'data-fetcher',
      title: '📊 Data Fetcher Dashboard',
      description: 'Dashboard para visualizar datos de múltiples APIs',
      difficulty: 'Experto'
    }
  ]

  const renderProject = () => {
    switch (currentProject) {
      case 'todo-app':
        return <TodoAppProject />
      case 'user-dashboard':
        return <UserDashboardProject />
      case 'data-fetcher':
        return <DataFetcherProject />
      default:
        return <TodoAppProject />
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="theory-content">
        <h2>💪 Ejercicio 5: Proyecto Integrador</h2>
        
        <div className="highlight-box">
          <h3>🎯 Objetivo Final</h3>
          <p>
            Combinar todos los custom hooks aprendidos en un proyecto real y funcional. 
            Elige uno de los proyectos sugeridos o crea el tuyo propio siguiendo las 
            especificaciones detalladas.
          </p>
          <p style={{ marginTop: '0.5rem', fontWeight: '600', color: '#e53e3e' }}>
            ⚠️ Este es un proyecto para implementar desde cero, no una demo.
          </p>
        </div>

        <h3>📊 Lo que habrás logrado</h3>
        <ul>
          <li>✅ Dominio completo de custom hooks</li>
          <li>✅ Capacidad de combinar múltiples hooks</li>
          <li>✅ Arquitectura escalable con hooks</li>
          <li>✅ Manejo de estados complejos</li>
          <li>✅ Optimización de performance</li>
          <li>✅ Testing de custom hooks</li>
        </ul>

        <div style={{ marginTop: '2rem' }}>
          <h3>🚀 Elige tu Proyecto</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {projects.map(project => (
              <button
                key={project.id}
                className={`tab-button ${currentProject === project.id ? 'active' : ''}`}
                onClick={() => setCurrentProject(project.id)}
                style={{ flex: '1', minWidth: '200px' }}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>

        {renderProject()}
      </div>
    </div>
  )
}

const TodoAppProject = () => {
  const [showImplementation, setShowImplementation] = useState(false)

  return (
    <div>
      <h3>📝 Proyecto: Todo App Avanzada</h3>
      
      <div className="highlight-box">
        <h4>🎯 Descripción del Proyecto</h4>
        <p>
          Crear una aplicación de tareas completa que demuestre el poder de los custom hooks
          en un escenario real con múltiples funcionalidades complejas.
        </p>
      </div>

      <h4>🔧 Custom Hooks a Implementar</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>🗃️ useTodos</h5>
          <ul style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>
            <li>Gestión del estado de tareas</li>
            <li>CRUD completo</li>
            <li>Filtros y búsqueda</li>
            <li>Persistencia con localStorage</li>
          </ul>
        </div>

        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>📝 useForm</h5>
          <ul style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>
            <li>Formulario de nueva tarea</li>
            <li>Validación en tiempo real</li>
            <li>Campos dinámicos</li>
            <li>Auto-guardado</li>
          </ul>
        </div>

        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>🎨 useTheme</h5>
          <ul style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>
            <li>Modo claro/oscuro</li>
            <li>Persistencia de preferencias</li>
            <li>CSS custom properties</li>
            <li>Transiciones suaves</li>
          </ul>
        </div>

        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>⌨️ useKeyboard</h5>
          <ul style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>
            <li>Shortcuts de teclado</li>
            <li>Navegación con teclas</li>
            <li>Accesibilidad mejorada</li>
            <li>Comandos rápidos</li>
          </ul>
        </div>

        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>🔄 useUndo</h5>
          <ul style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>
            <li>Sistema de undo/redo</li>
            <li>Historial de cambios</li>
            <li>Stack de acciones</li>
            <li>Límites de memoria</li>
          </ul>
        </div>

        <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h5>📊 useAnalytics</h5>
          <ul style={{ fontSize: '0.875rem', margin: '0.5rem 0' }}>
            <li>Tracking de acciones</li>
            <li>Estadísticas de uso</li>
            <li>Métricas de productividad</li>
            <li>Reportes automáticos</li>
          </ul>
        </div>
      </div>

      <h4>🌟 Características de la App</h4>
      <div className="code-block">
{`✨ Funcionalidades Principales:
• ➕ Crear, editar y eliminar tareas
• 🔍 Búsqueda y filtros avanzados
• 🏷️ Categorías y etiquetas
• ⭐ Sistema de prioridades
• 📅 Fechas de vencimiento
• 📊 Estadísticas y progreso
• 🌙 Modo oscuro/claro
• ⌨️ Shortcuts de teclado
• 🔄 Undo/Redo
• 💾 Persistencia offline
• 📱 Diseño responsive

🎯 Características Avanzadas:
• 🤖 Sugerencias inteligentes
• 📈 Análisis de productividad
• 🔔 Notificaciones
• 📤 Exportar/Importar datos
• 🎨 Temas personalizables
• ♿ Accesibilidad completa`}
      </div>

      <h4>🛠️ Estructura Sugerida</h4>
      <div className="code-block">
{`src/
├── hooks/
│   ├── useTodos.js
│   ├── useForm.js
│   ├── useTheme.js
│   ├── useKeyboard.js
│   ├── useUndo.js
│   └── useAnalytics.js
├── components/
│   ├── TodoList/
│   ├── TodoForm/
│   ├── TodoFilters/
│   ├── TodoStats/
│   └── ThemeToggle/
├── utils/
│   ├── storage.js
│   ├── validation.js
│   └── constants.js
└── App.js`}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button 
          className="demo-button"
          onClick={() => setShowImplementation(!showImplementation)}
          style={{ 
            background: showImplementation ? '#e53e3e' : '#48bb78',
            boxShadow: showImplementation ? '0 4px 15px rgba(229, 62, 62, 0.4)' : '0 4px 15px rgba(72, 187, 120, 0.4)'
          }}
        >
          {showImplementation ? '🙈 Ocultar Guía' : '📋 Ver Guía de Implementación'}
        </button>
        
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: '#e6fffa', 
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: '#065f46'
        }}>
          <strong>🎯 Recuerda:</strong> El objetivo es que implementes el proyecto completo por tu cuenta.
          La guía te dará la estructura y puntos clave, pero el código lo escribes tú.
        </div>
      </div>

      {showImplementation && (
        <div style={{ marginTop: '1rem' }}>
          <h4>� Guía de Implementación: useTodos Hook</h4>
          
          <div style={{ 
            background: '#fffaf0', 
            border: '1px solid #fed7a1', 
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1rem'
          }}>
            <h5>🎯 Especificaciones del useTodos Hook</h5>
            <div style={{ marginTop: '1rem' }}>
              <strong>📥 Parámetros de entrada:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Ninguno (usa configuración interna)</li>
              </ul>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <strong>📤 Valores de retorno:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><code>todos</code> - Array de todos filtrados</li>
                <li><code>addTodo(todoData)</code> - Función para añadir</li>
                <li><code>toggleTodo(id)</code> - Alternar completado</li>
                <li><code>updateTodo(id, updates)</code> - Actualizar todo</li>
                <li><code>deleteTodo(id)</code> - Eliminar todo</li>
                <li><code>filter, setFilter</code> - Estado del filtro</li>
                <li><code>searchTerm, setSearchTerm</code> - Búsqueda</li>
                <li><code>stats</code> - Estadísticas calculadas</li>
              </ul>
            </div>
          </div>

          <div className="code-block">
{`// Estructura sugerida para useTodos
function useTodos() {
  // Estados principales
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Todos filtrados (useMemo para performance)
  const filteredTodos = useMemo(() => {
    // TODO: Implementar filtrado por estado y búsqueda
  }, [todos, filter, searchTerm])
  
  // Estadísticas (useMemo para performance)
  const stats = useMemo(() => {
    // TODO: Calcular total, completed, active, overdue
  }, [todos])
  
  // Funciones CRUD
  const addTodo = useCallback((todoData) => {
    // TODO: Crear nuevo todo con ID único y timestamp
  }, [])
  
  const toggleTodo = useCallback((id) => {
    // TODO: Alternar estado completed
  }, [])
  
  // ... más funciones
  
  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    // ... resto de la API
  }
}`}
          </div>

          <div style={{ 
            background: '#e6fffa', 
            border: '1px solid #4fd1c7', 
            borderRadius: '8px',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <h5>💡 Consejos de Implementación</h5>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li><strong>Estructura de Todo:</strong> {'{ id, title, description, completed, priority, dueDate, createdAt }'}</li>
              <li><strong>IDs únicos:</strong> Usa Date.now() o crypto.randomUUID()</li>
              <li><strong>Performance:</strong> useMemo para filtros y estadísticas</li>
              <li><strong>Persistencia:</strong> Combina con useLocalStorage</li>
              <li><strong>Inmutabilidad:</strong> Siempre retorna nuevos arrays/objetos</li>
            </ul>
          </div>

          <div style={{ 
            background: '#fed7d7', 
            border: '1px solid #fc8181', 
            borderRadius: '8px',
            padding: '1rem',
            marginTop: '1rem',
            color: '#742a2a'
          }}>
            <h5>🚀 Desafíos Adicionales</h5>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li><strong>Undo/Redo:</strong> Implementa un sistema de historial</li>
              <li><strong>Drag & Drop:</strong> Reordenar todos arrastrando</li>
              <li><strong>Categorías:</strong> Grupos de todos con colores</li>
              <li><strong>Fechas:</strong> Recordatorios y notificaciones</li>
              <li><strong>Sync:</strong> Guardar en la nube (Firebase/Supabase)</li>
            </ul>
          </div>

          <ProjectChecklistGuide />
        </div>
      )}
    </div>
  )
}

const UserDashboardProject = () => (
  <div>
    <h3>👤 Proyecto: Dashboard de Usuario</h3>
    
    <div className="highlight-box">
      <h4>🎯 Descripción del Proyecto</h4>
      <p>
        Un dashboard completo para gestión de perfil de usuario con configuraciones,
        preferencias y análisis de actividad.
      </p>
    </div>

    <h4>🔧 Custom Hooks Principales</h4>
    <ul>
      <li><strong>useAuth:</strong> Autenticación y autorización</li>
      <li><strong>useProfile:</strong> Gestión de datos del perfil</li>
      <li><strong>useSettings:</strong> Configuraciones de usuario</li>
      <li><strong>useNotifications:</strong> Sistema de notificaciones</li>
      <li><strong>useActivityFeed:</strong> Feed de actividad reciente</li>
      <li><strong>useDataPrivacy:</strong> Gestión de privacidad</li>
    </ul>

    <h4>🌟 Características</h4>
    <div className="code-block">
{`• 🔐 Sistema de autenticación completo
• 👤 Edición de perfil con validación
• ⚙️ Configuraciones avanzadas
• 🔔 Centro de notificaciones
• 📊 Análisis de actividad
• 🛡️ Configuración de privacidad
• 📱 Preferencias de la app
• 🎨 Personalización de tema
• 📈 Estadísticas de uso
• 💾 Backup y restauración`}
    </div>
  </div>
)

const DataFetcherProject = () => (
  <div>
    <h3>📊 Proyecto: Data Fetcher Dashboard</h3>
    
    <div className="highlight-box">
      <h4>🎯 Descripción del Proyecto</h4>
      <p>
        Dashboard para visualizar y gestionar datos de múltiples fuentes APIs
        con cache inteligente y sincronización en tiempo real.
      </p>
    </div>

    <h4>🔧 Custom Hooks Principales</h4>
    <ul>
      <li><strong>useApiManager:</strong> Gestión de múltiples APIs</li>
      <li><strong>useCache:</strong> Sistema de cache inteligente</li>
      <li><strong>useRealTimeSync:</strong> Sincronización en tiempo real</li>
      <li><strong>useDataVisualization:</strong> Configuración de gráficos</li>
      <li><strong>useExportData:</strong> Exportación en múltiples formatos</li>
      <li><strong>useDataFilters:</strong> Filtros y búsqueda avanzada</li>
    </ul>

    <h4>🌟 Características</h4>
    <div className="code-block">
{`• 🔄 Sincronización con múltiples APIs
• 📊 Visualizaciones interactivas
• 🗂️ Sistema de cache inteligente
• 🔍 Búsqueda y filtros avanzados
• 📈 Gráficos en tiempo real
• 📤 Exportación de datos
• ⚡ Optimización de performance
• 🔔 Alertas automáticas
• 📱 Dashboard responsive
• 🎯 Métricas personalizables`}
    </div>
  </div>
)

// Guía de checklist para el proyecto
const ProjectChecklistGuide = () => {
  const [checkedItems, setCheckedItems] = useState({})

  const toggleCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const checklistSections = [
    {
      title: "🏗️ Setup del Proyecto",
      items: [
        { id: "setup-1", text: "Crear estructura de carpetas (hooks/, components/, utils/)" },
        { id: "setup-2", text: "Configurar archivo de constantes" },
        { id: "setup-3", text: "Instalar dependencias adicionales si es necesario" }
      ]
    },
    {
      title: "🎣 Custom Hooks Básicos",
      items: [
        { id: "hooks-1", text: "Implementar useLocalStorage" },
        { id: "hooks-2", text: "Implementar useToggle para UI" },
        { id: "hooks-3", text: "Implementar useForm para entrada de datos" }
      ]
    },
    {
      title: "📝 Hook Principal - useTodos",
      items: [
        { id: "todos-1", text: "Estados básicos (todos, filter, search)" },
        { id: "todos-2", text: "Funciones CRUD (add, update, delete, toggle)" },
        { id: "todos-3", text: "Sistema de filtros y búsqueda" },
        { id: "todos-4", text: "Cálculo de estadísticas" },
        { id: "todos-5", text: "Integración con localStorage" }
      ]
    },
    {
      title: "🎨 Componentes UI",
      items: [
        { id: "ui-1", text: "TodoForm - formulario de nueva tarea" },
        { id: "ui-2", text: "TodoList - lista de tareas" },
        { id: "ui-3", text: "TodoItem - item individual" },
        { id: "ui-4", text: "TodoFilters - filtros y búsqueda" },
        { id: "ui-5", text: "TodoStats - estadísticas" }
      ]
    },
    {
      title: "✨ Funcionalidades Avanzadas",
      items: [
        { id: "advanced-1", text: "Sistema de prioridades" },
        { id: "advanced-2", text: "Fechas de vencimiento" },
        { id: "advanced-3", text: "Categorías o etiquetas" },
        { id: "advanced-4", text: "Modo oscuro/claro" },
        { id: "advanced-5", text: "Shortcuts de teclado" }
      ]
    },
    {
      title: "🧪 Testing y Pulido",
      items: [
        { id: "test-1", text: "Probar todos los casos de uso" },
        { id: "test-2", text: "Validar persistencia" },
        { id: "test-3", text: "Optimizar performance" },
        { id: "test-4", text: "Añadir loading states" },
        { id: "test-5", text: "Manejo de errores" }
      ]
    }
  ]

  const totalItems = checklistSections.reduce((total, section) => total + section.items.length, 0)
  const completedItems = Object.values(checkedItems).filter(Boolean).length
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  return (
    <div style={{ 
      background: 'white', 
      border: '2px solid #e2e8f0', 
      borderRadius: '10px', 
      padding: '2rem',
      marginTop: '2rem'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h4>📋 Checklist del Proyecto</h4>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '1rem'
        }}>
          <span>Progreso: {completedItems}/{totalItems} completadas</span>
          <span style={{ fontWeight: '600', color: progressPercentage === 100 ? '#48bb78' : '#667eea' }}>
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div style={{ 
          width: '100%', 
          height: '8px', 
          background: '#e2e8f0', 
          borderRadius: '4px',
          marginTop: '0.5rem',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${progressPercentage}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {checklistSections.map((section, sectionIndex) => (
        <div key={sectionIndex} style={{ marginBottom: '2rem' }}>
          <h5 style={{ 
            color: '#2d3748', 
            marginBottom: '1rem',
            fontSize: '1.1rem'
          }}>
            {section.title}
          </h5>
          <div style={{ paddingLeft: '1rem' }}>
            {section.items.map((item) => (
              <label 
                key={item.id}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  transition: 'background 0.2s ease',
                  background: checkedItems[item.id] ? '#f0fff4' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!checkedItems[item.id]) {
                    e.target.style.background = '#f7fafc'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!checkedItems[item.id]) {
                    e.target.style.background = 'transparent'
                  }
                }}
              >
                <input
                  type="checkbox"
                  checked={checkedItems[item.id] || false}
                  onChange={() => toggleCheck(item.id)}
                  style={{ 
                    width: '18px', 
                    height: '18px',
                    accentColor: '#48bb78'
                  }}
                />
                <span style={{ 
                  color: checkedItems[item.id] ? '#22543d' : '#4a5568',
                  textDecoration: checkedItems[item.id] ? 'line-through' : 'none',
                  fontWeight: checkedItems[item.id] ? '500' : 'normal'
                }}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {progressPercentage === 100 && (
        <div style={{ 
          background: 'linear-gradient(135deg, #48bb78, #38a169)', 
          color: 'white',
          padding: '1.5rem', 
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <h4>🎉 ¡Felicitaciones!</h4>
          <p>Has completado todos los elementos del checklist. ¡Tu proyecto está listo!</p>
        </div>
      )}
    </div>
  )
}

export default Exercise5
