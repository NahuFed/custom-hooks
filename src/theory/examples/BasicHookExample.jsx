import { useState, useCallback } from 'react'

// Custom Hook básico
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    setCount(prev => prev + step)
  }, [step])
  
  const decrement = useCallback(() => {
    setCount(prev => prev - step)
  }, [step])
  
  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])
  
  return {
    count,
    increment,
    decrement,
    reset
  }
}

const BasicHookExample = () => {
  const counter1 = useCounter(0, 1)
  const counter2 = useCounter(10, 2)
  const counter3 = useCounter(100, 5)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h4>Contador Simple</h4>
        <p>Valor: <strong>{counter1.count}</strong></p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="demo-button" onClick={counter1.increment}>+1</button>
          <button className="demo-button" onClick={counter1.decrement}>-1</button>
          <button className="demo-button" onClick={counter1.reset}>Reset</button>
        </div>
      </div>

      <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h4>Contador con Step 2</h4>
        <p>Valor: <strong>{counter2.count}</strong></p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="demo-button" onClick={counter2.increment}>+2</button>
          <button className="demo-button" onClick={counter2.decrement}>-2</button>
          <button className="demo-button" onClick={counter2.reset}>Reset</button>
        </div>
      </div>

      <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h4>Contador con Step 5</h4>
        <p>Valor: <strong>{counter3.count}</strong></p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="demo-button" onClick={counter3.increment}>+5</button>
          <button className="demo-button" onClick={counter3.decrement}>-5</button>
          <button className="demo-button" onClick={counter3.reset}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default BasicHookExample
