import s from './FourByFour.module.scss'
import clsx from 'clsx'

import WhiteUser from '../../../assets/activity/fourByFour/whiteUser.svg?react'
import BlueUser from '../../../assets/activity/fourByFour/blueUser.svg?react'
import GreenUser from '../../../assets/activity/fourByFour/greenUser.svg?react'
import GreenFillUser from '../../../assets/activity/fourByFour/greenFillUser.svg?react'

import { useEffect, useState } from 'react'

import ActivityLayout from '../ActivityLayout/ActivityLayout'
import Timer from '../Timer/Timer'

import type { FourByFourGameProps, GameCard } from './fourByFourType'

const shuffleArray = (array: GameCard[]) => {
    return [...array].sort(() => Math.random() - 0.5)
}
const groupIcons = {
    white: WhiteUser,
    blue: BlueUser,
    green: GreenUser,
    greenFill: GreenFillUser,
}

export default function FourByFourGame({ onEndGame, cards }: FourByFourGameProps) {

    const [gameCards, setGameCards] = useState<GameCard[]>([])
    const [remainsCards, setRemainsCards] = useState<GameCard[]>([])

    const [selectedCardID, setSelectedCardID] = useState<number[]>([])
    const [guessedCardID, setGuessedCardID] = useState<number[]>([])

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
        if (!cards) return

        const preparedCards = cards.map(card => ({
            ...card,
            Icon: groupIcons[card.group_id as keyof typeof groupIcons],
        }))

        const shuffled = shuffleArray(preparedCards)

        setGameCards(shuffled.slice(0, 16))
        setRemainsCards(shuffled.slice(16))

        const previewTimer = setTimeout(() => {
            setIsShowingPreview(false)
        }, 3000)

        return () => clearTimeout(previewTimer)
    }, [cards])

    useEffect(() => {
        if (selectedCardID.length === 4) {
            const selectedCards = gameCards.filter(card => selectedCardID.includes(card.id))

            const firstgroup_id = selectedCards[0]?.group_id;
            const isSameGroup = selectedCards.every((card) => card?.group_id === firstgroup_id)

            if (isSameGroup) {
                const timer = setTimeout(() => {
                    setGuessedCardID(prev => [...prev, ...selectedCardID])

                    const newCardsFromRemains = remainsCards.slice(0, 4)
                    setRemainsCards(prev => prev.slice(4))

                    setGameCards(prevCards => {
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
    }, [selectedCardID, gameCards])

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
                {gameCards?.map(({ id, Icon }) => {
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

