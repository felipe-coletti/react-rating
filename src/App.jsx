import { useState } from 'react'
import './App.css'
import Rating from './components/Rating'
import Test from './components/Test'

function App() {
    const [rating, setRating] = useState(0)

    return(
        <div className='container'>
            <div className='content-area'>
                <p className='paragraph'>{rating}</p>
                <Rating value={rating} onChange={setRating}/>
                {/*<Test value={rating} onChange={setRating}/>*/}
            </div>
        </div>
    )
}

export default App
