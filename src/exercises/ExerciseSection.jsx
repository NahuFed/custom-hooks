import { useState } from 'react'
import Exercise1 from './Exercise1'
import Exercise2 from './Exercise2'
import Exercise3 from './Exercise3'
import Exercise4 from './Exercise4'
import Exercise5 from './Exercise5'

const ExerciseSection = () => {
  const [currentExercise, setCurrentExercise] = useState('exercise1')

  const exercises = [
    { 
      id: 'exercise1', 
      label: '🏋️ Ejercicio 1',
      title: 'useToggle Hook',
      difficulty: 'Fácil',
      description: 'Crear un hook para alternar valores booleanos'
    },
    { 
      id: 'exercise2', 
      label: '🎯 Ejercicio 2',
      title: 'useLocalStorage Hook',
      difficulty: 'Intermedio',
      description: 'Hook para sincronizar state con localStorage'
    },
    { 
      id: 'exercise3', 
      label: '⚡ Ejercicio 3',
      title: 'useFetch Hook',
      difficulty: 'Intermedio',
      description: 'Hook para realizar peticiones HTTP'
    },
    { 
      id: 'exercise4', 
      label: '🔥 Ejercicio 4',
      title: 'useForm Hook',
      difficulty: 'Avanzado',
      description: 'Hook completo para manejo de formularios'
    },
    { 
      id: 'exercise5', 
      label: '💪 Ejercicio 5',
      title: 'Proyecto Integrador',
      difficulty: 'Experto',
      description: 'Combinar múltiples custom hooks'
    }
  ]

  const renderExercise = () => {
    switch (currentExercise) {
      case 'exercise1':
        return <Exercise1 />
      case 'exercise2':
        return <Exercise2 />
      case 'exercise3':
        return <Exercise3 />
      case 'exercise4':
        return <Exercise4 />
      case 'exercise5':
        return <Exercise5 />
      default:
        return <Exercise1 />
    }
  }

  const currentExerciseData = exercises.find(ex => ex.id === currentExercise)

  return (
    <div className="exercise-section">
      <div className="exercise-tabs">
        {exercises.map(exercise => (
          <button
            key={exercise.id}
            className={`tab-button ${currentExercise === exercise.id ? 'active' : ''}`}
            onClick={() => setCurrentExercise(exercise.id)}
            title={exercise.description}
          >
            {exercise.label}
          </button>
        ))}
      </div>
      
      {currentExerciseData && (
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea20, #764ba220)',
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1rem',
          border: '1px solid #667eea50'
        }}>
          <h2>{currentExerciseData.title}</h2>
          <p style={{ margin: '0.5rem 0', color: '#4a5568' }}>{currentExerciseData.description}</p>
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            background: getDifficultyColor(currentExerciseData.difficulty),
            color: 'white'
          }}>
            Dificultad: {currentExerciseData.difficulty}
          </span>
        </div>
      )}
      
      <div className="exercise-content">
        {renderExercise()}
      </div>
    </div>
  )
}

function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'Fácil':
      return '#48bb78'
    case 'Intermedio':
      return '#ed8936'
    case 'Avanzado':
      return '#e53e3e'
    case 'Experto':
      return '#805ad5'
    default:
      return '#718096'
  }
}

export default ExerciseSection
