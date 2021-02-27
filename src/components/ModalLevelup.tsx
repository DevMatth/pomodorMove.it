import { ChallengesContext } from '../contexts/ChallengesContext'
import { useContext } from 'react'

import styles from '../styles/components/ModalLevelup.module.css'

export function ModalLevelup() {
const { level, closeLevelUpModal } = useContext(ChallengesContext)
    return (
        

        <div className={styles.modalOverlay}>
            <div className={styles.modalLevelupContainer}>
            <h1>{level}</h1>
            <strong>Parabéns!</strong>
            <p>Você alcançou um novo level!</p>
                <button type="button" 
                className="close"
                onClick={closeLevelUpModal}
                >
                <img src="/icons/close.svg" alt="close modal"/>
                </button>
            </div>
        </div>
    )
}