import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './card.css'
import defaultDog from './assets/images/default-dog.png'
import Template from './components/Template'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Template />
  )
}

export default App
