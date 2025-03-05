import bobi from "../assets/images/places/BOBI BOBI.png"
import antonella from "../assets/images/places/ANTONELLA BAR.png"
import magikoffee from "../assets/images/places/MagiKoffe.png"
import parquearauco from "../assets/images/places/Parque arauco.png"
import terrazas from "../assets/images/places/TERRAZAS ARRAYAN.png"
import "../styles/PlacesThatHasSeenUs.css"

const places = [
    {img: bobi, name: "BOBI"},
    {img: antonella, name: "'Primer Café'"},
    {img: magikoffee, name: "MagiKoffe"},
    {img:parquearauco, name: "El Araucano"},
    {img: terrazas, name: "Terrazas"},
]

const Places = () => {
    return(
        <div className="places-section">
            <div className="container text-center mt-5">
                <h2>Todo empezó en estos lugares</h2>
            </div>
            <div className="d-flex justify-content-center flex-wrap mt-4">
            {places.map((places, index) => (
                <div key={index} className="places-icon mx-3 text-center">
                    <div className="places-logo-container">
                        <img
                            src={places.img}
                            alt={places.name}
                            className="places-logo hover-effect"
                        />
                    </div>
                    <p className="mt-2 text-center">{places.name}</p>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Places