import { useState, useRef } from 'react'
import styles from './styles.module.css'
import { Icon } from '@iconify/react'

const Rating = ({ value = 0, readOnly = false, onChange }) => {
    const rating = useRef(value)
    const alredyIn = useRef(false)
    
    const [displayRating, setDisplayRating] = useState(rating.current)

    const swicthValue = (i) => {
        if (rating.current === i + 1) {
            rating.current = 0
        } else {
            rating.current = i + 1
        }

        setDisplayRating(rating.current)
        
        onChange && onChange(rating.current)
    }

    var ratingStars = []

    for (let i = 0; i < 5; i++) {
        let style
        let icon

        if (i < displayRating) {
            style = styles.filledStar
            icon = <Icon icon="ion:star" />
        } else {
            style = styles.unfilledStar
            icon = <Icon icon="ion:star-outline" />
        }

        ratingStars.push(
            !readOnly ? (
                <button className={style} style={{cursor: 'pointer'}} onClick={() => swicthValue(i)} onMouseEnter={() => {!alredyIn.current && setDisplayRating(i + 1), alredyIn.current=true}} onMouseLeave={() => alredyIn.current = false} title='star' key={i}>
                    {icon}
                </button>
            ) : (
                <button className={style} title='star' key={i}>
                    {icon}
                </button>
            )
        )
    }

    return (
        <div className={styles.container} onMouseLeave={() => !readOnly && setDisplayRating(rating.current)}>
            {ratingStars}
        </div>
    )
}

export default Rating