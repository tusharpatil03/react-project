import { useEffect, useState } from "react";
import './style.css';

function Game() {
    let [started, setStarted] = useState(false);
    let [level, setLevel] = useState(0);
    let [gameSeq, setGameSeq] = useState([]);
    let [userSeq, setUserSeq] = useState([]);
    let [score, setScore] = useState(0);

    const btns = ["red", "yellow", "green", "purple"];

    useEffect(() => {
        const handleKeyPress = () => {
            if (!started) {
                console.log("Game Started");
                setStarted(true);
                levelUp();
            }
        };

        document.addEventListener("keypress", handleKeyPress);
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [started]);

    useEffect(() => {
        if (userSeq.length > 0) {
            checkAns(userSeq.length - 1);
        }
    }, [userSeq]);

    function gameFlash(btn) {
        btn.classList.add("flash");
        setTimeout(function () {
            btn.classList.remove("flash");
        }, 30);
    };

    function userFlash(btn) {
        btn.classList.add("userflash");
        setTimeout(function () {
            btn.classList.remove("userflash");
        }, 50);
    };

    function levelUp() {
        setUserSeq([]);
        setLevel(prevLevel => prevLevel + 1);
        setScore(prevLevel => prevLevel + 1);

        const randIdx = Math.floor(Math.random() * 4);
        const randCol = btns[randIdx];
        setGameSeq(prevGameSeq => [...prevGameSeq, randCol]);

        const randBtn = document.querySelector(`.${randCol}`);
        gameFlash(randBtn);
    };

    function checkAns(idx) {
        if (userSeq[idx] === gameSeq[idx]) {
            if (userSeq.length === gameSeq.length) {
                setTimeout(levelUp, 900);
            }
        } else {
            alert(`Game over! Your score was ${level}. Press any key to start a new game.`);
            reset();
        }
    };

    function btnPress(color) {
        console.log(color);
        const btn = document.querySelector(`.${color}`);
        userFlash(btn);
        setUserSeq(prevUserSeq => [...prevUserSeq, color]);
    };

    function reset() {
        setStarted(false);
        setGameSeq([]);
        setUserSeq([]);
        setLevel(0);
        setScore(0);
    };


    return (
        <div>
            <h2>Simon Says Game</h2>
            <div className="container">
                {started ? <div><p>level {level}</p> <p>score: <b>{score}</b> </p></div>
                    : <p>Press any key to start a new game.</p>}
            </div>

            <div className="container">
                <div className="line-one">
                    <div onClick={() => btnPress("red")} className="btn red" type="button" id="red"></div>
                    <div onClick={() => btnPress("yellow")} className="btn yellow" type="button" id="yellow"></div>
                </div>
                <div className="line-two">
                    <div onClick={() => btnPress("green")} className="btn green" type="button" id="green"></div>
                    <div onClick={() => btnPress("purple")} className="btn purple" type="button" id="purple"></div>
                </div>
            </div>
        </div>
    )
}

export default Game;