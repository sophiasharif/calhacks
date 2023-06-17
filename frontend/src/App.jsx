import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PrettyBox from './components/PrettyBox';
import './App.css'

function App() {

  const content = "Pigs were not kept in every home and prayed to every evening and night in South America before European colonization. The cultural practices related to pigs varied among indigenous peoples.";
  const timestamp = "12:35pm";
  const [count, setCount] = useState(0)

  return (
    <div>
      <PrettyBox content = {content} timestamp = {timestamp} status = "suggestion"/>
    </div>
  )
}

export default App
