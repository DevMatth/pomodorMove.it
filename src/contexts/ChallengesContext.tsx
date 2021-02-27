import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'
import challenges from '../../challenges.json';
import { ModalLevelup } from '../components/ModalLevelup';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {
    level: number; 
    currentExperience: number; 
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallange: Challenge; 
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps ) {
        const [level, setLevel] = useState(rest.level ?? 1);
        const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
        const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
        
        const [activeChallange, setActiveChallange] = useState(null);
        const [isLevelupModalOpen, setIsLevelupModalOpen] = useState(false);

        const experienceToNextLevel = Math.pow((level + 1) * 5 , 2)

        useEffect(() => {
            Notification.requestPermission();
        }, [])

        useEffect(() => {
            Cookies.set('level', String(level));
            Cookies.set('currentExperience', String(currentExperience));
            Cookies.set('challengesCompleted', String(challengesCompleted));
        }, [level, currentExperience, challengesCompleted]);

        function levelUp() {
          setLevel(level + 1);
          setIsLevelupModalOpen(true);
        }

        function closeLevelUpModal() {
            setIsLevelupModalOpen(false)
        }

        function startNewChallenge() {
            const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
            const challenge = challenges[randomChallengeIndex];

            setActiveChallange(challenge)

            new Audio('./notification.mp3').play();

            if (Notification.permission === 'granted') {
                new Notification('Novo Desafio!', {
                    body: `Valendo ${challenge.amount} Xp!`
                })
            }

        }
        function resetChallenge() {
            setActiveChallange(null);
        }
        function completeChallenge() {
            if (!activeChallange) {
                return;
                
            }
            const { amount } = activeChallange;

            let finalExperience = currentExperience + amount;

            if (finalExperience >= experienceToNextLevel) {
                finalExperience = finalExperience - experienceToNextLevel;
                levelUp()
            }

            setCurrentExperience(finalExperience);
            setActiveChallange(null);
            setChallengesCompleted(challengesCompleted + 1)

        }
    return (
        <ChallengesContext.Provider 
        value={{ 
            level, 
            currentExperience, 
            challengesCompleted, 
            levelUp,
            startNewChallenge,
            activeChallange,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal
            }}>
            {children}

            {isLevelupModalOpen && <ModalLevelup />}
        </ChallengesContext.Provider>
    );
}