const Navigation = ({ currentSection, onSectionChange }) => {
  const sections = [
    { id: 'theory', label: '📚 Teoría', description: 'Conceptos fundamentales' },
    { id: 'exercises', label: '💪 Ejercicios', description: 'Práctica hands-on' }
  ]

  return (
    <nav className="navigation">
      {sections.map(section => (
        <button
          key={section.id}
          className={`nav-button ${currentSection === section.id ? 'active' : ''}`}
          onClick={() => onSectionChange(section.id)}
          title={section.description}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}

export default Navigation
