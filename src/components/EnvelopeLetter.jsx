import React, { useState } from 'react';
import '../styles/EnvelopeLetter.css';

const EnvelopeComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="simple-envelope-container">
            <div className={`simple-envelope ${isOpen ? 'open' : ''}`} onClick={handleClick}>
                <div className="envelope-flap"></div>
                <div className="envelope-content"></div>
                <div className="heart"></div>

                {isOpen && (
                    <div className="popup-letter">
                        <div className="letter-text">
                            <strong>Mi amor</strong>
                            <p>
                                Después de tantos años, encontré a alguien que de verdad llena mi vida con amor. Siento que esto es más que recíproco, es puro apañe, risas y momentos bacanes. Desde que estamos juntos, cada día es mejor, y no es solo porque sí, sino porque construimos algo real, algo que se siente fuerte.

                                Quiero seguir creciendo contigo, armando nuestra historia, sumando más recuerdos, más risas y más aventuras. Porque si hay algo que tengo claro, es que contigo quiero todo, siempre y en todas. 💖
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnvelopeComponent;