import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Icon } from '@iconify/react'

const Rating = ({ value, onChange, readOnly = false, disabled = false }) => {
    const [rating, setRating] = useState(value != null ? value : 0)
    const [displayRating, setDisplayRating] = useState(rating)

    const active = !readOnly && !disabled

    useEffect(() => {
        if (value != null) {
            setRating(value)
            setDisplayRating(value)
        }
    }, [value])

    const handleEnter = (newDisplayRating) => {
        setDisplayRating(newDisplayRating)
    }

    const handleLeave = () => {
        setDisplayRating(rating)
    }

    const swicthRating = (newRating) => {
        const newValue = rating === newRating ? 0 : newRating

        if (value === null) {
            setRating(newValue)
            setDisplayRating(newValue)
        }

        if (onChange) {
            onChange(newValue)
        }
    }

    var ratingStars = []

    for (let i = 0; i < 5; i++) {
        ratingStars.push(
            <label onMouseEnter={active && (() => handleEnter(i + 1))} onMouseLeave={active && handleLeave} key={i}>
                <input
                    className={styles.input}
                    type='radio'
                    checked={i < displayRating}
                    onClick={active && (() => swicthRating(i + 1))}
                    readOnly
                    disabled={disabled}
                />
                {i < displayRating ? (
                    <span
                        className={styles.filledStar + (disabled ? " " + styles.disabled : "")}
                        style={active ? {cursor: 'pointer'} : null}
                    >
                        <Icon icon="ion:star" />
                    </span>
                ) : (
                    <span
                        className={styles.unfilledStar + (disabled ? " " + styles.disabled : "")}
                        style={active ? {cursor: 'pointer'} : null}
                    >
                        <Icon icon="ion:star-outline" />
                    </span>
                )}
            </label>
        )
    }

    return (
        <div
            className={styles.container}
            onMouseLeave={active && handleLeave}
        >
            {ratingStars}
        </div>
    )
}

export default Rating