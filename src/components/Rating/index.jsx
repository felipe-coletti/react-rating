import { useState, useRef } from 'react'
import styles from './styles.module.css'
import { Icon } from '@iconify/react'

const Rating = ({ value, onChange, readOnly = false, disabled = false }) => {
    const rating = useRef(0)
    const alredyIn = useRef(false)
    
    const [displayRating, setDisplayRating] = useState(value != null ? value : rating.current)

    const active = !readOnly && !disabled

    const handleEnter = (newDisplayRating) => {
        if (active) {
            if (!alredyIn.current) {
                setDisplayRating(newDisplayRating)
                alredyIn.current = true
            }
        }
    }

    const handleLeave = () => {
        if (active) {
            if (alredyIn.current) {
                alredyIn.current = false
            }
        }
    }

    const swicthRating = (newRating) => {
        if (active) {
            if (value === null) {
                if (rating.current === newRating) {
                    rating.current = 0
                } else {
                    rating.current = newRating
                }

                setDisplayRating(rating.current)
                onChange && onChange(rating.current)
            } else {
                if (onChange) {
                    if (newRating === value) {
                        newRating = 0
                    }
                    
                    setDisplayRating(newRating)
                    onChange(newRating)
                }
            }
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
                    disabled={disabled}
                />
                {i < displayRating ? (
                    <span className={styles.filledStar + " " + (disabled && styles.disabled)} style={active ? {cursor: 'pointer'} : null}>
                        <Icon icon="ion:star" />
                    </span>
                ) : (
                    <span className={styles.unfilledStar + " " + (disabled && styles.disabled)} style={active ? {cursor: 'pointer'} : null}>
                        <Icon icon="ion:star-outline" />
                    </span>
                )}
            </label>
        )
    }

    return (
        <div className={styles.container} onMouseLeave={() => active && setDisplayRating(value != null ? value : rating.current)}>
            {ratingStars}
        </div>
    )
}

export default Rating