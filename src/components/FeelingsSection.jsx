import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import amor1 from "../assets/images/moments/amor.jpeg"
import amor2 from "../assets/images/moments/amor3.png"
import amor3 from "../assets/images/moments/amor2.jpeg"
import "../styles/FeelingsSection.css";

const feelingsData = [
    {
        imageSrc: amor1,
        feelingText: "Porque cada día que pasa te amo más que ayer.",
    },
    {
        imageSrc: amor2,
        feelingText: "Eres realmente mi inspiración",
    },
    {
        imageSrc: amor3,
        feelingText: "Y aún tenemos mucho más por hacer y vivir!",
    },
];

export default function FeelingsSection() {
    useEffect(() => {
        AOS.init({
            duration: 2000, // duración de la animación en ms
            once: true,    // que la animación ocurra solo una vez
        });
    }, []);

    return (
        <div className="feelings-wrapper">
            <div className="row">
                <h2>Tengo mucho que decirte amor...</h2>
            </div>
            <div className="container">
                {feelingsData.map((item, index) => (
                    <div className="row align-items-center my-5" data-aos="fade-up" key={index}>
                        {index % 2 === 0 ? (
                            <>
                                <div className="col-md-6">
                                    <img
                                        src={item.imageSrc}
                                        alt={`Feelings ${index}`}
                                        className="img-fluid rounded-circle"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <p className="feeling-text">{item.feelingText}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-md-6">
                                    <p className="feeling-text">{item.feelingText}</p>
                                </div>
                                <div className="col-md-6">
                                    <img
                                        src={item.imageSrc}
                                        alt={`Feelings ${index}`}
                                        className="img-fluid rounded-circle"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}