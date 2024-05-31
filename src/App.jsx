import { useState } from 'react'
import './App.css'
import Rating from './components/Rating'

function App() {
    const [rating, setRating] = useState(0)

    return(
        <div className='container'>
            <h1 className='title'>Classificação</h1>
            <div className='content-area'>
                <p className='paragraph'>{rating}</p>
                <Rating value={rating} onChange={setRating}/>
            </div>
        </div>
    )
}

export default App
