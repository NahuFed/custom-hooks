# 🎣 Aprende Custom Hooks en React

Un proyecto educativo **hands-on** para dominar los **Custom Hooks** en React. Los estudiantes implementan hooks desde cero siguiendo ejercicios progresivos.

## 🎯 Objetivos del Proyecto

- **Implementar** custom hooks desde cero (no copiar código)
- **Comprender** profundamente cómo funcionan los hooks
- **Dominar** las reglas y mejores prácticas
- **Resolver** problemas reales con hooks personalizados
- **Construir** un proyecto completo combinando múltiples hooks

## 📚 Metodología de Aprendizaje

### 📖 Teoría Primero
Cada concepto se explica con:
- Fundamentos teóricos claros
- Ejemplos demostrativos interactivos
- Casos de uso reales
- Mejores prácticas de la industria

### 💪 Práctica Guiada
Los ejercicios incluyen:
- **Especificaciones claras** de lo que debe implementarse
- **Guías paso a paso** sin dar el código
- **Pistas y consejos** cuando sea necesario
- **Casos de prueba** para validar la implementación

### 🚫 Sin Soluciones Inmediatas
- Las soluciones están **ocultas por defecto**
- Se anima a **intentar primero** antes de ver respuestas
- **Advertencias claras** sobre no copiar código
- Enfoque en **aprender haciendo**

## 📚 Contenido Educativo

### 🔬 Sección Teórica

1. **📖 Introducción a Custom Hooks**
   - ¿Qué son y por qué usarlos?
   - Ventajas sobre patrones anteriores
   - Casos de uso comunes

2. **📋 Reglas de los Hooks**
   - Convenciones de nombrado
   - Reglas de llamada
   - Composición de hooks

3. **🔧 Ejemplo Básico: useCounter**
   - Implementación paso a paso
   - Manejo de estado
   - Optimización con useCallback

4. **⚡ Ejemplo Avanzado: useApi**
   - Manejo de estados complejos
   - Cancelación de requests
   - Cleanup y memory leaks

5. **✨ Mejores Prácticas**
   - Single Responsibility Principle
   - Limpieza de recursos
   - Patrones de retorno
   - Testing strategies

### 💪 Ejercicios Prácticos - ¡Para Implementar!

#### 🏋️ Ejercicio 1: useToggle Hook
- **Dificultad:** Fácil
- **Objetivo:** Implementar hook para alternar valores
- **Aprendes:** useState, useCallback, manejo de tipos
- **⚠️ Tú implementas:** El código completo del hook

#### 🎯 Ejercicio 2: useLocalStorage Hook
- **Dificultad:** Intermedio  
- **Objetivo:** Sincronizar estado con localStorage
- **Aprendes:** useEffect, serialización, event listeners
- **⚠️ Tú implementas:** Persistencia y sincronización

#### ⚡ Ejercicio 3: useNews Hook - API de Noticias
- **Dificultad:** Intermedio
- **Objetivo:** Consumir API de noticias y filtrar por categorías
- **Aprendes:** API calls, filtrado, AbortController, PATCH requests
- **⚠️ Tú implementas:** Hook completo para gestión de noticias
- **🗂️ API Fake:** Incluye json-server con datos de noticias

#### 🔥 Ejercicio 4: useForm Hook
- **Dificultad:** Avanzado
- **Objetivo:** Sistema completo de formularios
- **Aprendes:** Validación, estados complejos, performance
- **⚠️ Tú implementas:** Hook más complejo desde cero

## 🚀 Cómo Usar Este Proyecto

### Prerrequisitos
- Node.js (v14 o superior)
- Conocimientos básicos de React
- Familiaridad con Hooks básicos (useState, useEffect)

### Instalación
```bash
# Clona el proyecto
git clone <repository-url>
cd custom-hooks

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev

# Para el Ejercicio 3 - API de Noticias
# En otra terminal, ejecuta:
npm run api
```

### 🗂️ API de Noticias (Ejercicio 3)
El proyecto incluye una API fake con json-server para el Ejercicio 3:
- **Puerto:** http://localhost:3001
- **Endpoints:**
  - `GET /noticias` - Todas las noticias
  - `GET /noticias?categoria=tecnologia` - Filtrar por categoría
  - `GET /categorias` - Lista de categorías
  - `PATCH /noticias/:id` - Actualizar noticia

### Navegación
1. **Abre la aplicación** en tu navegador
2. **Explora la teoría** para entender los conceptos
3. **Practica con los ejercicios** de menor a mayor dificultad
4. **Implementa tu proyecto integrador** para consolidar conocimientos

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes de navegación
│   └── Navigation.jsx
├── theory/              # Contenido teórico
│   ├── TheorySection.jsx
│   └── examples/
│       ├── BasicHookExample.jsx
│       └── ComplexHookExample.jsx
├── exercises/           # Ejercicios prácticos
│   ├── ExerciseSection.jsx
│   ├── Exercise1.jsx    # useToggle
│   ├── Exercise2.jsx    # useLocalStorage
│   ├── Exercise3.jsx    # useFetch
│   ├── Exercise4.jsx    # useForm
│   └── Exercise5.jsx    # Proyecto Integrador
├── hooks/               # Custom hooks de referencia
│   ├── useToggle.js
│   ├── useCounter.js
│   └── useLocalStorage.js
└── App.jsx             # Componente principal
```

## 🎓 Progresión de Aprendizaje

### Nivel 1: Fundamentos
- [ ] Comprende qué son los custom hooks
- [ ] Conoce las reglas básicas
- [ ] Implementa hooks simples (useToggle, useCounter)

### Nivel 2: Intermedio
- [ ] Maneja efectos y cleanup
- [ ] Implementa persistencia (useLocalStorage)
- [ ] Gestiona requests HTTP (useFetch)

### Nivel 3: Avanzado
- [ ] Crea sistemas complejos (useForm)
- [ ] Implementa validación y estados múltiples
- [ ] Optimiza performance

### Nivel 4: Experto
- [ ] Combina múltiples hooks
- [ ] Arquitectura escalable
- [ ] Proyecto completo funcional

## 🛠️ Custom Hooks - Área de Trabajo

Los estudiantes implementan estos hooks desde cero en `src/hooks/`:

### 📁 Estructura de Trabajo
```
src/hooks/
├── README.md           # Guía para estudiantes
├── useToggle.js        # 🏋️ Ejercicio 1 - Implementar
├── useLocalStorage.js  # 🎯 Ejercicio 2 - Implementar  
├── useFetch.js         # ⚡ Ejercicio 3 - Implementar
├── useForm.js          # 🔥 Ejercicio 4 - Implementar
└── ...                 # 💪 Ejercicio 5 - Crear más hooks
```

### ⚠️ Importante para Educadores
- **No hay código preescrito** - los estudiantes implementan todo
- **Guías paso a paso** sin dar las respuestas
- **Soluciones ocultas** que se pueden mostrar después del intento
- **Casos de prueba** para validar implementaciones

## 📝 Ejercicios y Soluciones

Cada ejercicio incluye:
- **Descripción del objetivo**
- **Requisitos específicos**
- **Pistas y ayudas**
- **Casos de uso esperados**
- **Solución completa**
- **Demo interactiva**

## 🧪 Testing

Para testear tus custom hooks, usa React Testing Library:

```javascript
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter(0))
  
  act(() => {
    result.current.increment()
  })
  
  expect(result.current.count).toBe(1)
})
```

## 🎯 Mejores Prácticas Aplicadas

- ✅ **Convención de nombrado:** Todos los hooks empiezan con "use"
- ✅ **Single Responsibility:** Cada hook tiene una responsabilidad específica
- ✅ **Optimización:** Uso apropiado de useCallback y useMemo
- ✅ **Cleanup:** Limpieza correcta de recursos y event listeners
- ✅ **Error Handling:** Manejo robusto de errores y edge cases
- ✅ **TypeScript Ready:** Fácil migración a TypeScript
- ✅ **Testing:** Estructura preparada para testing

## 🚀 Próximos Pasos

Después de completar este proyecto, podrás:

1. **Crear custom hooks** para cualquier caso de uso
2. **Arquitecturar aplicaciones** usando hooks como base
3. **Optimizar performance** de aplicaciones React
4. **Compartir lógica** entre componentes eficientemente
5. **Contribuir** a librerías de hooks de código abierto

## 🤝 Contribuciones

¿Quieres mejorar este proyecto educativo?

- 🐛 Reporta bugs o problemas
- 💡 Sugiere nuevos ejercicios
- 📚 Mejora la documentación
- ✨ Añade nuevos custom hooks de ejemplo

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usar, modificar y distribuir.

## 🎉 ¡Felicitaciones!

Si has llegado hasta aquí y completado los ejercicios, ¡ya eres un experto en Custom Hooks! 🎣

---

**¿Listo para empezar?** Ejecuta `npm run dev` y comienza tu viaje hacia el dominio de los Custom Hooks en React.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
