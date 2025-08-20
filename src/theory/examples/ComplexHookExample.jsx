import { useState, useEffect, useCallback } from 'react'

// Simulador de API para el ejemplo
const mockApi = {
  users: [
    { id: 1, name: 'Ana García', email: 'ana@example.com', status: 'active' },
    { id: 2, name: 'Carlos López', email: 'carlos@example.com', status: 'inactive' },
    { id: 3, name: 'María Rodríguez', email: 'maria@example.com', status: 'active' }
  ],
  
  async getUsers(delay = 1000) {
    await new Promise(resolve => setTimeout(resolve, delay))
    
    // Simular error ocasional
    if (Math.random() < 0.2) {
      throw new Error('Error de conexión con el servidor')
    }
    
    return this.users
  },
  
  async createUser(userData, delay = 800) {
    await new Promise(resolve => setTimeout(resolve, delay))
    
    const newUser = {
      id: Date.now(),
      ...userData,
      status: 'active'
    }
    
    this.users.push(newUser)
    return newUser
  }
}

// Custom Hook avanzado para manejo de API
function useApi(fetchFunction) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction(...args)
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetchFunction])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, execute, reset }
}

// Hook específico para usuarios
function useUsers() {
  const { data: users, loading, error, execute, reset } = useApi(mockApi.getUsers)
  
  const loadUsers = useCallback(() => {
    return execute()
  }, [execute])

  // Auto-cargar al montar
  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  return { users, loading, error, refetch: loadUsers, reset }
}

// Hook para crear usuarios
function useCreateUser() {
  const { loading, error, execute } = useApi(mockApi.createUser)
  
  const createUser = useCallback(async (userData) => {
    return execute(userData)
  }, [execute])

  return { createUser, loading, error }
}

const ComplexHookExample = () => {
  const { users, loading: usersLoading, error: usersError, refetch } = useUsers()
  const { createUser, loading: createLoading, error: createError } = useCreateUser()
  
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')

  const handleCreateUser = async (e) => {
    e.preventDefault()
    
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    try {
      await createUser({
        name: newUserName.trim(),
        email: newUserEmail.trim()
      })
      
      setNewUserName('')
      setNewUserEmail('')
      refetch() // Recargar la lista
      alert('Usuario creado exitosamente!')
    } catch (error) {
      // El error ya se maneja en el hook
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Formulario para crear usuario */}
      <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
        <h4>Crear Nuevo Usuario</h4>
        <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <input
              type="text"
              placeholder="Nombre completo"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="demo-input"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="demo-input"
              style={{ width: '100%' }}
            />
          </div>
          <button 
            type="submit" 
            className="demo-button"
            disabled={createLoading}
            style={{ alignSelf: 'flex-start' }}
          >
            {createLoading ? 'Creando...' : 'Crear Usuario'}
          </button>
          {createError && (
            <div style={{ color: '#e53e3e', fontSize: '0.875rem' }}>
              Error: {createError}
            </div>
          )}
        </form>
      </div>

      {/* Lista de usuarios */}
      <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4>Lista de Usuarios</h4>
          <button 
            onClick={refetch} 
            className="demo-button"
            disabled={usersLoading}
          >
            {usersLoading ? 'Cargando...' : 'Recargar'}
          </button>
        </div>

        {usersLoading && !users && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
            Cargando usuarios...
          </div>
        )}

        {usersError && (
          <div style={{ 
            backgroundColor: '#fed7d7', 
            color: '#742a2a', 
            padding: '1rem', 
            borderRadius: '6px',
            marginBottom: '1rem'
          }}>
            <strong>Error:</strong> {usersError}
          </div>
        )}

        {users && users.length > 0 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {users.map(user => (
              <div 
                key={user.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>{user.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>{user.email}</div>
                </div>
                <div>
                  <span className={`status-indicator ${user.status === 'active' ? 'status-online' : 'status-offline'}`}>
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {users && users.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
            No hay usuarios registrados
          </div>
        )}
      </div>
    </div>
  )
}

export default ComplexHookExample
