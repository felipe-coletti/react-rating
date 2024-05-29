import { useState, useRef } from 'react'
import styles from './styles.module.css'
import { Icon } from '@iconify/react'

const Test = ({ value = 0, readOnly = false, onChange }) => {
    const rating = useRef(value)
    const alredyIn = useRef(false)
    
    const [displayRating, setDisplayRating] = useState(rating.current)

    const handleEnter = (newDisplayRating) => {
        if (!readOnly) {
            if (!alredyIn.current) {
                setDisplayRating(newDisplayRating)
                alredyIn.current = true
            }
        }
    }

    const handleLeave = () => {
        if (!readOnly) {
            if (alredyIn.current) {
                alredyIn.current = false
            }
        }
    }

    const swicthRating = (newRating) => {
        if (!readOnly) {
            if (rating.current === newRating) {
                rating.current = 0
            } else {
                rating.current = newRating
            }

            setDisplayRating(rating.current)
            onChange && onChange(rating.current)
        }
    }

    var ratingStars = []

    for (let i = 0; i < 5; i++) {
        ratingStars.push(
            <label onMouseEnter={() => handleEnter(i + 1)} onMouseLeave={handleLeave} key={i}>
                <input
                    className={styles.input}
                    type='radio'
                    checked={i < displayRating}
                    onClick={() => swicthRating(i + 1)}
                    readOnly
                />
                {i < displayRating ? (
                    <span className={styles.filledStar}>
                        <Icon icon="ion:star" />
                    </span>
                ) : (
                    <span className={styles.unfilledStar}>
                        <Icon icon="ion:star-outline" />
                    </span>
                )}
            </label>
        )
    }

    return (
        <div className={styles.container} onMouseLeave={() => !readOnly && setDisplayRating(rating.current)}>
            {ratingStars}
        </div>
    )
}

export default Test