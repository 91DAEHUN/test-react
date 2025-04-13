import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/scss/index.scss'
import Header from './layout/Header'
import Home from './page/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <Header></Header>
      <Home></Home>
    </main>
    </>
  )
}

export default App
