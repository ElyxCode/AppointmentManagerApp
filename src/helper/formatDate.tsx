import moment from 'moment';

// moment.locale('es', {
//   months:
//     'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
//       '_',
//     ),
//   weekdays: 'domingo_lunes_martes_miercoles_jueves_viernes_sábado'.split('_'),
//   relativeTime: {
//     future: 'dentro de %s',
//     past: 'hace %s',
//     s: 'algunos segundos',
//     m: 'un minuto',
//     mm: '%d minutos',
//     h: 'una hora',
//     hh: '%d horas',
//     d: 'un día',
//     dd: '%d días',
//     M: 'un mes',
//     MM: '%d meses',
//     y: 'un año',
//     yy: '%d años',
//   },
// });

export const formatDate = (date: Date) => {
  const dateString = moment(date).format('dddd, Do MMMM YYYY');
  return dateString.charAt(0).toUpperCase() + dateString.slice(1);
};
