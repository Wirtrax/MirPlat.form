import s from './MainPage.module.scss';

import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

import Background from '../UI/Background/Background';
import AboutSection from './AboutSection/AboutSection';
import ActivitiesSection from './ActivitiesSection/ActivitiesSection';
import LotterySection from './LotterySection/LotterySection';
import WelcomeSection from './WelcomeSection/WelcomeSection';

export default function MainPage() {
  return (
    <Background variant="minimal">
      <main>
        <WelcomeSection />
        <AboutSection />
        <ActivitiesSection />
        <LotterySection />
        <div className="container">
          <h2 className={s.titleRules}>Правила</h2>
          <Link to={ROUTES.HOME} className={s.linkRules}>
            Читать полностью
          </Link>
        </div>
      </main>
    </Background>
  );
}
