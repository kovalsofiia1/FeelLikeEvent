import { Tag } from "../redux/events/types";
import * as Yup from 'yup';

export interface FormValues {
  name: string;
  description: string;
  eventType: string;
  tags: string[];
  maxAttendees: number;
  targetAudience: string;
  isOnline: boolean;
  country: string;
  city: string;
  locationAddress: string;
  place: string;
  price: number;
  startTime: Date;
  endTime: Date;
  images: string[];
  link: string
}

export const eventValidationSchema = Yup.object().shape({
  name: Yup.string().required('Це поле є обов’язковим'),
  description: Yup.string().required('Це поле є обов’язковим'),
  eventType: Yup.string().required('Виберіть тип події'),
  targetAudience: Yup.string().required('Виберіть цільову аудиторію'),
  price: Yup.number().required('Введіть ціну').min(0, 'Ціна не може бути від’ємною'),
  maxAttendees: Yup.number().required('Введіть кількість місць').min(1, 'Кількість місць не може бути меншою 1'),
  country: Yup.string().test('required-if-not-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (!isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),
  city: Yup.string().test('required-if-not-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (!isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),
  locationAddress: Yup.string().test('required-if-not-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (!isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),
  place: Yup.string().test('required-if-not-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (!isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),
  link: Yup.string().url().test('required-if-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),

  startTime: Yup.date().required('Виберіть час початку').min(new Date(), 'Час початку не може бути в минулому'),
  endTime: Yup.date()
    .required('Виберіть час закінчення')
    .min(Yup.ref('startTime'), 'Час закінчення має бути пізніше часу початку'),
});
