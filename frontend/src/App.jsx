import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PrettyBox from './components/PrettyBox';
import generateChatGPTResponse from './helpers/generateGPTResponse';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true);

  useEffect(function() {
    async function fetchData() {
      console.log("THIS IS ONE REQUEST")

      const response = await generateChatGPTResponse("tell me a fun pig fact");
      console.log(response);
      setLoading(false);
    }

    fetchData();
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <PrettyBox />
    </div>
  )
}

export default App
