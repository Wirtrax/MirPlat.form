import Button from "../../UI/Button/Button";
import Input from '../../UI/Input/Input'
import Radio from '../../UI/Radio/Radio'
import RadioList from '../../UI/RadioList/RadioList'
import Select from '../../UI/Select/Select'
import s from './RegistrationForm.module.scss'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import clsx from 'clsx'


interface RegistrationFormProps {
    onSuccess: () => void;
    onError: () => void;
}

const initialValues = {
    fio: '',
    specialization: 'ml',
    level: '',
    phone: '',
    email: '',
    personalAgreement: false,
    news: false
}

const validationSchema = Yup.object({
    fio: Yup.string().required('Введите ФИО'),
    phone: Yup.string()
        .required('Введите номер телефона'),

    email: Yup.string()
        .email('Некорректная почта')
        .required('Введите почту'),
    personalAgreement: Yup.boolean().oneOf([true], 'это поле обязательно'),
    level: Yup.string()
        .required('Выберите уровень'),
    specialization: Yup.string()
        .required('Выберите специализацию'),
})

export default function RegistrationForm({ onSuccess, onError }: RegistrationFormProps) {
    const textPersonal = 'Я даю согласие на обработку персональных данных и ознакомлен с Политикой обработки и защиты персональных данных в АО «НСПК»'
    const textNews = 'Я хочу получать новости о вакансиях и предстоящих мероприятиях'

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    try {
                        // throw new Error('Test');
                        console.log(values)
                        onSuccess()
                    } catch {
                        onError()
                    }
                }}
            >
                {
                    ({
                        values, errors, touched, handleChange, handleBlur, setFieldValue
                    }) => (
                        <Form className={s.wrapper}>
                            <div className={s.title}>Регистрация</div>

                            <Input
                                label='ФИО'
                                placeholder='Иванов Иван Иванович'
                                name='fio'
                                value={values.fio}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.fio ? errors.fio : undefined}
                            />

                            <Select
                                label='Специализация'
                                name='specialization'
                                value={values.specialization}
                                onChange={handleChange}
                                error={touched.specialization ? errors.specialization : undefined}
                            >
                                <option value="ml">ML-инженер</option>
                                <option value="frontend">Frontend-разработчик</option>
                                <option value="backend">Backend-разработчик</option>
                                <option value="fullstack">Fullstack-разработчик</option>
                                <option value="mobile">Mobile-разработчик</option>
                                <option value="qa">QA-инженер</option>
                                <option value="data">Data Scientist</option>
                            </Select>

                            <RadioList
                                name='level'
                                value={values.level}
                                onChange={handleChange}
                                error={touched.level ? errors.level : undefined}
                            />

                            <Input
                                label='*Номер телефона'
                                placeholder='+7 999-999-99-99 '
                                name="phone"
                                onBlur={handleBlur}
                                value={values.phone}
                                onChange={handleChange}
                                error={touched.phone ? errors.phone : undefined}
                            />

                            <Input
                                label='*Почта'
                                placeholder='name@example.ru'
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email ? errors.email : undefined}
                            />

                            <div className={s.radioBtns}>
                                <Radio
                                    type='checkbox'
                                    text={textPersonal}
                                    className={clsx(
                                        touched.personalAgreement &&
                                        errors.personalAgreement &&
                                        s.textRadio
                                    )}
                                    name="personalAgreement"
                                    checked={values.personalAgreement}
                                    onChange={(e) => {
                                        setFieldValue('personalAgreement', e.target.checked)
                                    }}
                                    error={touched.personalAgreement ? errors.personalAgreement : undefined}
                                />

                                <Radio
                                    text={textNews}
                                    name="news"
                                    checked={values.news}
                                    onChange={(e) =>
                                        setFieldValue(
                                            'news',
                                            e.target.checked
                                        )
                                    }
                                />
                            </div>

                            <Button type='submit' className={s.btn}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
                        </Form>
                    )
                }
            </Formik>
        </>


    )
}