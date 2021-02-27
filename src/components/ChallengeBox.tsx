import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallange, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeCompleted() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
        {activeChallange ? (
            <div className={styles.challengeActive}>
                
                <header>Ganhe {activeChallange.amount} XP!</header>
               
               <main>
               
                <img src={`icons/${activeChallange.type}.svg`} />
                <strong>Novo desafio!</strong>
                <p>{activeChallange.description}</p>
                </main>
            
            <footer>
                <button
                    type="button"
                    className={styles.challengeFailedButton}
                    onClick={ handleChallengeFailed }
                > Falhei 
                </button>
                <button
                    type="button"
                    className={styles.challengeCompletButton}
                    onClick={ handleChallengeCompleted }
                > Completei 
                </button>
            </footer>
            
            </div>
        ) : (
            
            <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level-up" />
                    A cada desafio concluido você recebera uma quantidade de experiência
                </p>
            </div>
        ) }
        </div>
        
    )
}