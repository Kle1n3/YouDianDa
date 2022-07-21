import Vue from "vue";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

/* console.log(dayjs());
console.log(dayjs().format());
console.log(dayjs().format('YYYY-MM-DD'));
console.log(dayjs().format('YYYY-MM-DD hh:mm:ss'));
console.log('==========');
console.log(dayjs(1657423873592).format('YYYY-MM-DD hh:mm:ss'));
console.log('==========');
console.log(dayjs().from(dayjs('1990-01-01')));
console.log(dayjs().to(dayjs('2019-03-11 09:00:00'))); */

Vue.filter('relativeTime', time => dayjs().to(dayjs(time)))
// Vue.filter('formatTime', time => new Date(time))
// console.log(dayjs(1574610800000).format('YYYY-MM-DD hh:mm:ss'));
// Vue.filter('relativeTime', time => dayjs(toString(time)).format('YYYY-MM-DD hh:mm:ss'))