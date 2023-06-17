import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PrettyBox from './components/PrettyBox';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <PrettyBox />
    </div>
  )
}

export default App
