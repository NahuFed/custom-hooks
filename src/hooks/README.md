# 🎣 Custom Hooks - Área de Trabajo

Esta carpeta es donde implementarás todos tus custom hooks durante los ejercicios.

## 📝 Hooks a Implementar

### Ejercicio 1: useToggle
- **Archivo:** `useToggle.js`
- **Propósito:** Hook para alternar entre valores booleanos o específicos
- **API:** `const [value, toggle, setValue] = useToggle(initialValue, toggleValue)`

### Ejercicio 2: useLocalStorage
- **Archivo:** `useLocalStorage.js`
- **Propósito:** Sincronizar estado con localStorage
- **API:** `const [value, setValue] = useLocalStorage(key, defaultValue)`

### Ejercicio 3: useFetch
- **Archivo:** `useFetch.js`
- **Propósito:** Manejar peticiones HTTP con estados
- **API:** `const { data, loading, error, execute, refetch } = useFetch(url, options)`

### Ejercicio 4: useForm
- **Archivo:** `useForm.js`
- **Propósito:** Sistema completo de manejo de formularios
- **API:** `const { values, errors, handleChange, handleSubmit, ... } = useForm(config)`

### Ejercicio 5: Hooks del Proyecto Integrador
Implementa los hooks adicionales que necesites para tu proyecto:
- `useTodos.js` - Gestión de tareas
- `useTheme.js` - Modo oscuro/claro
- `useKeyboard.js` - Shortcuts de teclado
- `useUndo.js` - Sistema undo/redo
- Y cualquier otro que diseñes

## 💡 Consejos

1. **Empieza simple:** Implementa la funcionalidad básica primero
2. **Prueba temprano:** Crea componentes de prueba para cada hook
3. **Itera:** Añade funcionalidades gradualmente
4. **Optimiza:** Usa useCallback y useMemo cuando sea apropiado
5. **Limpia:** Siempre limpia recursos en useEffect

## 🚀 ¡Manos a la Obra!

Cada ejercicio te guiará paso a paso. ¡No tengas miedo de experimentar y cometer errores - es parte del proceso de aprendizaje!

---

**Recuerda:** Los custom hooks son solo funciones JavaScript que usan otros hooks. ¡Tú puedes hacerlo! 💪
