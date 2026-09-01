import s from './MainPage.module.scss';

import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ROUTES } from '../../routes/routes';
import { clearTetrisToast, fetchTetrisToast } from '../../service/features/activity/activitySlice';
import { showToast } from '../../utils/showToast';

import Background from '../UI/Background/Background';
import AboutSection from './AboutSection/AboutSection';
import ActivitiesSection from './ActivitiesSection/ActivitiesSection';
import LotterySection from './LotterySection/LotterySection';
import WelcomeSection from './WelcomeSection/WelcomeSection';


export default function MainPage() {
  const dispatch = useAppDispatch();
  const { isChangedTetrisToastStatus,
    currentToastStatus,
    rewardTetris,
    reason } = useAppSelector(state => state.activity);

  const { hash, pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) element.scrollIntoView({ behavior: 'smooth' })

      const timer = setTimeout(() => {
        navigate(pathname, { replace: true })
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [hash, pathname, navigate])


  useEffect(() => {
    dispatch(fetchTetrisToast())
  }, [dispatch])

  useEffect(() => {
    if (!isChangedTetrisToastStatus) return;

    const toastKey = `${currentToastStatus}-${rewardTetris}-${reason}`;
    const shownToastKey = localStorage.getItem('tetrisToastKey');

    if (toastKey === shownToastKey) return;

    if (currentToastStatus === 'ACCLAIMED') {
      showToast(
        <>
          Задание «Стек-тетрис» выполнено!
          <b>+{rewardTetris} Приветов начислено</b>
          Количество баллов можно увидеть в{' '}
          <b style={{ textDecoration: 'underline' }}>
            <Link to={ROUTES.PROFILE}>профиле.</Link>
          </b>
        </>
      );
    }

    if (currentToastStatus === 'DECLINED') {
      showToast(
        <>
          Фото для задания «Стек-тетрис» не прошло проверку.
          <b>Причина: {reason}</b>
          <br />
          Попробуйте направить фотографию собранного тетриса еще раз.
        </>
      );
    }

    localStorage.setItem('tetrisToastKey', toastKey);
    dispatch(clearTetrisToast());
  }, [
    isChangedTetrisToastStatus,
    currentToastStatus,
    rewardTetris,
    reason,
  ]);


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
