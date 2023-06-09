import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './card.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section>
        <div class="card ">
            <div class="card-border foil">
                <div class="card-header">
                    <span class="name">Slim</span>
                    <span class="breed">type: Greybutt</span>
                </div>
                <div class="card-header">
                    <span class="age">Age :4</span>
                </div>
                <div>
                    <img src="./assets/images/default-dog.png" />
                    {/* <!-- <img src="https://api-ninjas.com/images/dogs/greyhound.jpg" alt="picture of a DOG"> --> */}
                </div>
                <div class="dog-attributes">
                    <span class="size">55lbs</span>
                    <span class="house-trained">3ft </span>
                </div>

                <div class="dog-stats">
                    <div class="description">
                        <span class="item">friendliness:</span>
                        <span class="item">trainability:</span>
                        <span class="item">pizazz:</span>

                    </div>
                    <div class="power-level">
                        <span class="item2">a a a a a</span>
                        <span class="item2">b b b</span>
                        <span class="item2">c c c c c </span>
                    </div>
                </div>
            </div>
          </div>
          <div class="card ">
            <div class="card-border foil">
                <div class="card-header">
                    <span class="name">Slim</span>
                    <span class="breed">type: Greybutt</span>
                </div>
                <div class="card-header">
                    <span class="age">Age :4</span>
                </div>
                <div>
                    <img src="./assets/images/default-dog.png" />
                    {/* <!-- <img src="https://api-ninjas.com/images/dogs/greyhound.jpg" alt="picture of a DOG"> --> */}
                </div>
                <div class="dog-attributes">
                    <span class="size">55lbs</span>
                    <span class="house-trained">3ft </span>
                </div>

                <div class="dog-stats">
                    <div class="description">
                        <span class="item">friendliness:</span>
                        <span class="item">trainability:</span>
                        <span class="item">pizazz:</span>

                    </div>
                    <div class="power-level">
                        <span class="item2">a a a a a</span>
                        <span class="item2">b b b</span>
                        <span class="item2">c c c c c </span>
                    </div>
                </div>
            </div>
          </div>
    </section>
    </>
  )
}

export default App
