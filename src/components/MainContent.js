import React from 'react';
import Die from './Die'
import Ink from 'react-ink';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function MainContent() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [rollCount, setRollCount] = React.useState(0);
    const [timer, setTimer] = React.useState(0);
    const [ovTime, setOvTime] = React.useState(0);
    const [isFlipping, setIsFlipping] = React.useState(false);

    React.useEffect(() => {
        setInterval(() => setTimer(prevState => prevState + 1), 1000);
    }, []);

    React.useEffect(() => {
        if (tenzies) {
            setOvTime(timer);
            const bestTime = localStorage.getItem('bestTime');
            if (!bestTime || timer < Number(bestTime)) {
                localStorage.setItem('bestTime', timer);
            }
        }
    }, [tenzies]);


    React.useEffect(() => {
        let allHeld = dice.every(die => die.isHeld);
        let firstValue = dice[0].value;
        let allValues = dice.every(die => die.value === firstValue);

        if (allHeld && allValues) {
            setTenzies(true);
        }
    }, [dice]);

    function allNewDice() {
        const dieArr = [];
        for (let i = 0; i < 10; i++) {
            dieArr.push(
                {
                    id: nanoid(),
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                }
            );
        }
        return dieArr;
    }

    function newGame() {
        setDice(allNewDice());
        setTenzies(false);
        setTimer(0);
        setRollCount(0);
    }

    function resetDice() {
        setIsFlipping(true);
        setRollCount(prevState => prevState + 1);
        setDice(prevState => prevState.map(die => {
            return die.isHeld ? die :
                {
                    id: nanoid(),
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                }
        }));

        setTimeout(() => setIsFlipping(false), 0);
    }

    function diceIsHeld(id) {
        setDice(prevState => prevState.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die));
    }

    const newArr = dice.map(die =>
        <Die
            key={die.id}
            value={die.value}
            onClick={() => diceIsHeld(die.id)}
            className={`${die.isHeld ? 'active' : ''} ${isFlipping ? 'flip' : ''}`}
        />
    )

    return (
        <main className="main-container">
            {tenzies && <Confetti/>}
            <h1>Tenzies</h1>
            {tenzies === false && <p>Roll until all dice are the same. Click each die to freeze it at its current
                value between rolls.</p>}
            <div className='die-container'>
                {newArr}
            </div>
            <button onClick={tenzies === true ? newGame : resetDice}>
                {tenzies === true ? 'New Game' : 'Roll'}
                <Ink
                    radius={60}
                />
            </button>
            {tenzies && <div className='flex-container'>
                {tenzies && <div>Your roll count is <span>{rollCount}</span></div>}
                {tenzies && <div>Time it took you to win is <span>{ovTime}</span></div>}
                {tenzies && <div>Your best time is <span>{localStorage.getItem('bestTime')}</span></div>}
            </div>}
        </main>
    )
}