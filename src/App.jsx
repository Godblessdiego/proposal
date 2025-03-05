import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import HeroSection from "./components/HeroSection.jsx";
import PlacesThatHasSeenUs from "./components/PlacesThatHasSeenUs.jsx";
import ScrollVelocity from './components/ScrollVelocity';
import FeelingsSection from "./components/FeelingsSection.jsx";
import BlurText from "./components/BlurText.jsx";
import CircularGallery from "./components/CircularGallery.jsx";
import RosaFlotante from "./components/RosaFlotante.jsx";
import EnvelopeLetter from "./components/EnvelopeLetter.jsx";
import AnimatedList from "./components/AnimatedList.jsx";
import ProposalSection from "./components/ProposalSection.jsx";
import Masonry from "./components/Masonry.jsx";
import youandme1 from "./assets/images/youandi/comida.jpeg";
import youandme2 from "./assets/images/youandi/2.svg";
import youandme3 from "./assets/images/youandi/dormido.jpeg";
import youandme4 from "./assets/images/youandi/4.svg";
import youandme5 from "./assets/images/youandi/5.svg";
import youandme6 from "./assets/images/youandi/bubas.jpeg";
import youandme7 from "./assets/images/youandi/7.svg";
import youandme8 from "./assets/images/youandi/8.svg";
import youandme9 from "./assets/images/youandi/9.svg";
import youandme10 from "./assets/images/youandi/10.svg";

const handleAnimationComplete = () => {
    console.log('Animation completed!');
};

const items = ['Hacer una cena en casa', 'Ir al cine', 'Estudiar juntos', 'Dormir 10 horas jaja', 'Hacer galletas', 'Hacer un tiktok', 'Escribir algo en tu cuarto', 'Subir a un cerrito', 'Ir a la playa', 'Ver a tu mamá'];
const data = [
    { id: 1, image: youandme8, height: 400 },
    { id: 2, image: youandme2, height: 300 },
    { id: 3, image: youandme3, height: 300 },
    { id: 4, image: youandme4, height: 300 },
    { id: 5, image: youandme5, height: 300 },
    { id: 6, image: youandme9, height: 300 },
    { id: 7, image: youandme7, height: 200 },
    { id: 8, image: youandme1, height: 300 },
    { id: 9, image: youandme6, height: 200 },
    { id: 10, image: youandme10, height: 400 }
];

function App() {
  return (
    <div className="onepage-container">
      <HeroSection />
        <PlacesThatHasSeenUs />
      <ScrollVelocity
          texts={['Mejor dicho', 'en mi Casa...😏']}
          velocity={100}
          className="custom-scroll-text"
      />
        <FeelingsSection />
        <BlurText
            text="Porque esto quiero contigo..."
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
        />
        <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery bend={3} textColor="#d4418e" borderRadius={0.05} font="bold 32px Poppins" />
        </div>
        <BlurText
            text="Aunque quedan cosas en la lista del hoy:"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
        />
        <AnimatedList
            items={items}
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
        />
        <BlurText
            text="Ahora abre la carta, amor!"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
        />
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faHandPointDown} size="2x" style={{ color: 'black',marginTop: '50px' }} />
        </div>
        <EnvelopeLetter />
        <ProposalSection />
        <br/>
        <br/>
        <br/>
        <br/>

        <BlurText
            text={"Ahora sigamos construyendo\nmás momentos juntos"}
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
        />
        <Masonry data={data} />
        <div style={{ height: '600px', position: 'relative' }}>
            <RosaFlotante />
        </div>
        <h1 className='text-center'>Te amo, Je t'aime, I love you, Ik hou van je Yuli!</h1>
    </div>
  )
}

export default App
