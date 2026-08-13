import s from './FourByFour.module.scss'
import clsx from 'clsx'

import { useEffect, useState } from 'react'

import ActivityLayout from '../ActivityLayout/ActivityLayout'
import Timer from '../Timer/Timer'

import type { FourByFourGameProps } from './fourByFourType'
import { fourGameCards, type CardItem } from '../../../mock/four_by_four'


const shuffleArray = (array: CardItem[]) => {
    return [...array].sort(() => Math.random() - 0.5)
}

export default function FourByFourGame({ onEndGame }: FourByFourGameProps) {
    const [cards, setCards] = useState<CardItem[]>([])

    const [selectedCardID, setSelectedCardID] = useState<number[]>([])
    const [guessedCardID, setGuessedCardID] = useState<number[]>([])
    const [remainsCards, setRemainsCards] = useState<CardItem[]>([])

    const [isShowingPreview, setIsShowingPreview] = useState(true)
    const [isError, setIsError] = useState(false)
    const [description, setDescription] = useState<React.ReactNode>(
        'Объедини 4 тематические карточки'
    )

    const handleCardClick = (id: number) => {
        if (isShowingPreview || isError || (selectedCardID.length === 4 && !selectedCardID.includes(id))) return;

        setSelectedCardID(prev => {
            if (prev.includes(id)) {
                return prev.filter(cardID => cardID !== id)
            }
            if (prev.length >= 4) return prev

            return [...prev, id]
        })
    }

    useEffect(() => {
        const shuffled = shuffleArray(fourGameCards)
        setCards(shuffled.slice(0, 16))
        setRemainsCards(shuffled.slice(16))

        const previewTimer = setTimeout(() => {
            setIsShowingPreview(false)
        }, 3000)

        return () => clearTimeout(previewTimer)
    }, [])

    useEffect(() => {
        if (selectedCardID.length === 4) {
            const selectedCards = cards.filter(card => selectedCardID.includes(card.id))

            const firstGroupId = selectedCards[0]?.groupId;
            const isSameGroup = selectedCards.every((card) => card.groupId === firstGroupId)

            if (isSameGroup) {
                const timer = setTimeout(() => {
                    setGuessedCardID(prev => [...prev, ...selectedCardID])

                    const newCardsFromRemains = remainsCards.slice(0, 4)
                    setRemainsCards(prev => prev.slice(4))

                    setCards(prevCards => {
                        let remainsIndex = 0
                        return prevCards.map(card => {
                            if (selectedCardID.includes(card.id) && newCardsFromRemains[remainsIndex]) {
                                return newCardsFromRemains[remainsIndex++]
                            }
                            return card
                        })
                    })

                    setSelectedCardID([])
                    setDescription(
                        <>
                            <strong>Верно!</strong> Продолжай объединять карточки
                        </>
                    )
                }, 700)

                return () => clearTimeout(timer)
            } else {
                setIsError(true)
                setDescription(
                    <>
                        <strong>Неверно!</strong> Попробуй ещё
                    </>
                )

                const timer = setTimeout(() => {
                    setIsError(false)
                    setSelectedCardID([])
                }, 1200)

                return () => clearTimeout(timer)
            }
        }
    }, [selectedCardID, cards])

    return (
        <ActivityLayout
            title='4x4'
            description={description}
            buttonText='ЗАВЕРШИТЬ'
            onButtonClick={() => onEndGame(guessedCardID.length)}
            timer={<Timer
                duration={5 * 60}
                danger={4 * 60}
                classNameMargin={s['game__timer']}
                onFinish={() => onEndGame(guessedCardID.length)}
            />}
        >
            <div className={s['game__grid']}>
                {cards.map(({ id, Icon }) => {
                    const isSelected = selectedCardID.includes(id)
                    const isCardError = isError && isSelected
                    const isIconVisible = isShowingPreview || isSelected || isCardError;

                    return (
                        <div
                            key={id}
                            onClick={() => handleCardClick(id)}
                            className={clsx(
                                s['game__card'],
                                isSelected && s['game__card--selected'],
                                isCardError && s['game__card--error'],
                                isShowingPreview && s['game__card--preview']
                            )}>
                            <Icon
                                className={clsx(
                                    s['game__card-icon'],
                                    isIconVisible && s['game__card-icon--visible']
                                )}
                            />
                        </div>
                    )
                }
                )}
            </div>
        </ActivityLayout>
    )
}

