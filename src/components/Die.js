import React from 'react';

export default function Die(props) {
    return (
        <React.Fragment>
            <div className={`die ${props.className} die-${props.value}`} onClick={props.onClick}>
                {props.value === 1 && <div className="dot"></div>}
                {props.value === 2 && <>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </>}
                {props.value === 3 && <>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </>}
                {props.value === 4 && <>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </>}
                {props.value === 5 && <>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </>}
                {props.value === 6 && <>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </>}
            </div>
        </React.Fragment>
    )
}