import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import '../styles/ProposalSection.css';

const ProposalSection = () => {
    const [showYesPopup, setShowYesPopup] = useState(false);
    const [showNoPopup, setShowNoPopup] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const noButtonRef = useRef(null);
    const containerRef = useRef(null);

    // Handle YES button click
    const handleYesClick = () => {
        // Trigger confetti
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });

        setShowYesPopup(true);
    };

    // Handle NO button click (in case they somehow manage to click it)
    const handleNoClick = () => {
        setShowNoPopup(true);

        // Auto-close the popup after 3 seconds
        setTimeout(() => {
            setShowNoPopup(false);
            // Trigger confetti anyway
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 3000);
    };

    // Track mouse position
    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - containerRect.left,
                y: e.clientY - containerRect.top
            });
        }
    };

    // Move NO button when mouse approaches
    useEffect(() => {
        if (noButtonRef.current && containerRef.current) {
            const button = noButtonRef.current;
            const container = containerRef.current;
            const buttonRect = button.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const buttonX = buttonRect.left - containerRect.left + buttonRect.width / 2;
            const buttonY = buttonRect.top - containerRect.top + buttonRect.height / 2;

            const distance = Math.sqrt(
                Math.pow(mousePosition.x - buttonX, 2) +
                Math.pow(mousePosition.y - buttonY, 2)
            );

            // If mouse is getting close to the NO button (within 150px)
            if (distance < 150) {
                // Calculate a random position anywhere in the container
                // Instead of just moving away from the cursor
                const containerWidth = containerRect.width;
                const containerHeight = containerRect.height;

                // Create a set of possible positions (dividing container into a grid)
                const positions = [];
                const gridSize = 4; // 4x4 grid

                for (let i = 0; i < gridSize; i++) {
                    for (let j = 0; j < gridSize; j++) {
                        positions.push({
                            x: (i + 0.5) * (containerWidth / gridSize),
                            y: (j + 0.5) * (containerHeight / gridSize)
                        });
                    }
                }

                // Filter out positions that are too close to the mouse
                const safePositions = positions.filter(pos => {
                    const distToMouse = Math.sqrt(
                        Math.pow(mousePosition.x - pos.x, 2) +
                        Math.pow(mousePosition.y - pos.y, 2)
                    );
                    return distToMouse > 150;
                });

                // Pick a random safe position
                if (safePositions.length > 0) {
                    const randomIndex = Math.floor(Math.random() * safePositions.length);
                    const newPos = safePositions[randomIndex];

                    // Apply new position with animation
                    button.style.position = 'absolute';
                    button.style.transition = 'left 0.2s, top 0.2s';
                    button.style.left = `${newPos.x - buttonRect.width / 2}px`;
                    button.style.top = `${newPos.y - buttonRect.height / 2}px`;
                }
                // If no safe positions (unlikely), fall back to edge of container
                else {
                    const edgePositions = [
                        { x: buttonRect.width, y: Math.random() * containerHeight },
                        { x: containerWidth - buttonRect.width, y: Math.random() * containerHeight },
                        { x: Math.random() * containerWidth, y: buttonRect.height },
                        { x: Math.random() * containerWidth, y: containerHeight - buttonRect.height }
                    ];

                    const randomIndex = Math.floor(Math.random() * edgePositions.length);
                    const newPos = edgePositions[randomIndex];

                    button.style.position = 'absolute';
                    button.style.transition = 'left 0.2s, top 0.2s';
                    button.style.left = `${newPos.x - buttonRect.width / 2}px`;
                    button.style.top = `${newPos.y - buttonRect.height / 2}px`;
                }
            }
        }
    }, [mousePosition]);

    return (
        <div className="proposal-section feelings-wrapper" onMouseMove={handleMouseMove}>
            <div className="proposal-content" ref={containerRef}>
                <h3 className="proposal-subheading">Ahora llegó el momento</h3>
                <h2 className="proposal-heading">¿Quieres pololear conmigo, mi amor?</h2>

                <div className="proposal-buttons">
                    <button className="yes-button" onClick={handleYesClick}>
                        SÍ
                    </button>
                    <button className="no-button" ref={noButtonRef} onClick={handleNoClick}>
                        NO
                    </button>
                </div>
            </div>

            {showYesPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>¡Felicidades!</h2>
                        <p>YA NO HAY VUELTA ATRÁS, eres mía haha</p>
                        <button onClick={() => setShowYesPopup(false)}>❤️</button>
                    </div>
                </div>
            )}

            {showNoPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>¡hahaha el NO es un SI perro!!!</h2>
                        <p>No hay escapatoria, eres mía de todas formas 😜</p>
                        <button onClick={() => setShowYesPopup(false)}>❤️</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProposalSection;