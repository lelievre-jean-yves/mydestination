import { useEffect } from 'react';
import { useScrollingAnimation } from '../../utils/hooks';
import './style.scss';



export function HomeDescription() {
  const [ref, isVisible] = useScrollingAnimation();

  const className = isVisible ? "reveal-2" : "reveal reveal-2"
  return (
    <div className="homeDescription">
      <p className={className} ref={ref}>
        Bienvenue sur notre site de réservation d'hôtel, où commence votre
        escapade de rêve. Découvrez un monde de confort, de luxe et de commodité
        à portée de main.
      </p>
    </div>
  );
}
