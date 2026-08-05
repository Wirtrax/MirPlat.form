import s from './RegistrationForm.module.scss';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import clsx from 'clsx';

import { useAppDispatch } from '../../../hooks/redux';
import { createUser } from '../../../service/features/user/userSlice';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Radio from '../../UI/Radio/Radio';
import RadioList from '../../UI/RadioList/RadioList';
import Select from '../../UI/Select/Select';
import Background from '../../UI/Background/Background';

interface RegistrationFormProps {
  onSuccess: () => void;
  onError: () => void;
}

const initialValues = {
  fio: '',
  specialization: '',
  level: '',
  phone: '',
  email: '',
  personalAgreement: false,
  news: false,
};

const validationSchema = Yup.object({
  fio: Yup.string()
    .matches(/^[А-ЯЁа-яё\s-]+$/, 'ФИО может содержать только буквы')
    .min(5, 'введите полное ФИО')
    .required('введите ФИО'),
  phone: Yup.string()
    .matches(/^\+7 \d{3}-\d{3}-\d{2}-\d{2}$/, 'введите корректный номер телефона')
    .required('введите номер телефона'),

  email: Yup.string().email('некорректная почта').required('введите почту'),
  personalAgreement: Yup.boolean().oneOf([true], 'это поле обязательно'),
  level: Yup.string().required('выберите уровень'),
  specialization: Yup.string().required('выберите специализацию'),
});

export default function RegistrationForm({ onSuccess, onError }: RegistrationFormProps) {
  const dispatch = useAppDispatch();

  const textPersonal =
    'Я даю согласие на обработку персональных данных и ознакомлен с Политикой обработки и защиты персональных данных в АО «НСПК»';
  const textNews = 'Я хочу получать новости о вакансиях и предстоящих мероприятиях';

  return (
    <Background>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}

          onSubmit={(values) => {
            const parts = values.fio.trim().split(/\s+/);
            const last_name = parts[0] || '';
            const first_name = parts[1] || '';
            const patronym = parts[2] || '';

            const cleanPhone = values.phone.replace(/[^\d+]/g, '');

            const userData = {
              first_name,
              last_name,
              patronym,
              specialization: values.specialization,
              programming_level: values.level,
              email: values.email,
              phone_number: cleanPhone,
              send_notifications: values.news,
            };
            console.log('Отправлено:', userData);
            dispatch(createUser(userData))
              .unwrap()
              .then(() => {
                onSuccess();
              })
              .catch((err) => {
                console.log('error: ', err);
                onError();
              });
          }}>
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <Form className={s.wrapper}>
              <div className={s.title}>Регистрация</div>

              <Input
                label="ФИО"
                placeholder="Иванов Иван Иванович"
                name="fio"
                value={values.fio}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fio ? errors.fio : undefined}
              />

              <Select
                label="Специализация"
                name="specialization"
                value={values.specialization}
                onChange={handleChange}
                error={touched.specialization ? errors.specialization : undefined}>
                <option value="" disabled>
                  Выберите специализацию
                </option>
                <option value="android">Android developer</option>
                <option value="teamlead">Teamlead engineering lead</option>
                <option value="ios">iOS developer</option>
                <option value="hr">HR</option>
                <option value="ml_dl_ai">ML DL AI</option>
                <option value="manual_tester">Manual tester</option>
              </Select>

              <RadioList
                name="level"
                value={values.level}
                onChange={handleChange}
                error={touched.level ? errors.level : undefined}
              />

              <Input
                label="*Номер телефона"
                placeholder="+7 999-999-99-99"
                mask="+7 000-000-00-00"

                name="phone"
                onBlur={handleBlur}
                value={values.phone}
                onChange={handleChange}
                error={touched.phone ? errors.phone : undefined}
              />

              <Input
                label="*Почта"
                placeholder="name@example.ru"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
              />

              <div className={s.radioBtns}>
                <Radio
                  type="checkbox"
                  text={textPersonal}
                  className={clsx(touched.personalAgreement && errors.personalAgreement && s.textRadio)}
                  name="personalAgreement"
                  checked={values.personalAgreement}
                  onChange={(e) => {
                    setFieldValue('personalAgreement', e.target.checked);
                  }}
                  error={touched.personalAgreement ? errors.personalAgreement : undefined}
                />

                <Radio
                  text={textNews}
                  name="news"
                  checked={values.news}
                  onChange={(e) => setFieldValue('news', e.target.checked)}
                />
              </div>

              <Button type="submit" className={s.btn}>
                ЗАРЕГИСТРИРОВАТЬСЯ
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Background>
  );
}
