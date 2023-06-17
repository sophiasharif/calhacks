import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PrettyBox from './components/PrettyBox';
import './App.scss';
import face from './assets/face.svg';

function App() {

  const content = "Pigs were not kept in every home and prayed to every evening and night in South America before European colonization. The cultural practices related to pigs varied among indigenous peoples.";
  const timestamp = "12:35pm";
  const [count, setCount] = useState(0)

  return (
    <div className = "pageContainer">
      <img src = {face} className = "face"/>
      <div className = "boxesContainer">
        <PrettyBox content = {content} timestamp = {timestamp} status = "suggestion"/>
        <PrettyBox content = {content} timestamp = {timestamp} status = "correction"/>
        <PrettyBox content = {content + content } timestamp = {timestamp} status = "correction"/>
      </div>
    </div>
  )
}

export default App
