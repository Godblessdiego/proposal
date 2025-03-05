import React, { useState, useEffect } from "react";
import "../styles/HeroSection.css";

const HeroSection = () => {
    const textos = ["...", "...", "...", "Todo"];
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typingSpeed = isDeleting ? 100 : 200;
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Agrega letras
                if (charIndex < textos[currentIndex].length) {
                    setCurrentText((prev) => prev + textos[currentIndex][charIndex]);
                    setCharIndex((prev) => prev + 1);
                } else {
                    setIsDeleting(true);
                }
            } else {
                // Borra letras
                if (charIndex > 0) {
                    setCurrentText((prev) => prev.slice(0, -1));
                    setCharIndex((prev) => prev - 1);
                } else {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % textos.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, currentIndex]);

    return (
        <div className="wrapper container p-4">
            <h1 className='mb-5'>
                Amor, ¿Quieres ser mi <span className="typing-text">{currentText}<span className="cursor">|</span></span>?
            </h1>
            <p className='mb-3'>Sigue bajando mi amor para que no te pierdas lo mejor...</p>
            <br/>
            <div className="decorative-divider">
                <div className="line"></div>
                <div className="heart-container">❤️❤️❤️</div>
                <div className="line"></div>
            </div>
        </div>
    );
}

export default HeroSection;