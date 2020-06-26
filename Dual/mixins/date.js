import moment from 'moment';
export const dateMixin = {
  data() {
    return {
      defaultTimeOfRange: 2*60,
      // defaultTimeOfRange: 2.5*60,
      emptyDatetime: '0000-00-00 00:00:00',
      emptyDate: '0000-00-00',
      // defaultTimeOfRange: 30,

      daysOfWeekNames: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],

      daysOfWeekNamesMondayFirst: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      daysOfWeekNamesSpanish: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
      ],
      monthsNamesSpanish: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
    }; // return DATA
  }, // DATA
  filters: {
    minToHour: function (val) {
      let hour = ('0'+ parseInt(val/60)).substr(-2);
      let min = ('0'+ parseInt(val%60)).substr(-2);
      return hour +':'+ min;
    },
  }, // FILTERS
  methods: {

// WORKING WITH DATES
  getNameOfDate(date, Hide = {}) {
    if (date == this.getActualDateToDB()) return 'Hoy';
    if (date == this.getActualDateToDB({day: +1})) return 'Mañana';
    let daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',];
    let dayName = daysOfWeek[+this.getDayOfWeek(date)];
    let dayNum = this.getDayOfMonth(date);
    let monthName = this.monthsNamesSpanish[+this.getMonth(date)-1];
    let year = this.getYear(date);
    let msg = `${dayName} ${dayNum} de ${monthName}`;
    if (Hide.year != false) msg += ` de ${year}`
    return msg;
  },
  getDayOfMonth(date) {
    return this.getMomentByDate(date).format('DD');
  },
  getMonth(date) {
    return this.getMomentByDate(date).format('MM');
  },
  getYear(date) {
    return this.getMomentByDate(date).format('YYYY');
  },
  getDayOfWeek(date) {
    return this.getMomentByDate(date).day();
  },

// OTRAS COSAS

    // getNameOfDate
    // minToHour
    // hourToMin
    // showRange
    // dateIsNewer
    // validateDatetime
    showRange(time, timeOfRange = null) {
      timeOfRange = timeOfRange == null ? this.defaultTimeOfRange : timeOfRange;
      return `Entre ${this.minToHour(time)} y ${this.minToHour((time)+timeOfRange)}`
    },
    minToHour(val) {
      let hour = Math.floor(val/60);
      hour = (hour < 10 ? '0' : '') + hour;
      let min = this.pad(parseInt(val%60), 2);
      return hour +':'+ min;
    },
    hourToMin(val) {
      let hour = val.substring(0, 2);
      let min  = val.substring(3, 5);
      return +hour*60 + +min;
    },
    dateIsNewer(date1, date2) {
      let d1 = {
        year: date1.substring(0,4),
        month: date1.substring(5,7),
        day: date1.substring(8,10),
      };
      let d2 = {
        year: date2.substring(0,4),
        month: date2.substring(5,7),
        day: date2.substring(8,10),
      };
      if (d1.year > d2.year) return true;
      if (d1.month > d2.month) return true;
      if (d1.day > d2.day) return true;
      return false;
    },

    getYearsFromDate(date) {
      if (date == '' || date == this.emptyDate || date == this.emptyDatetime) return '';
      return moment().diff(date, 'years', false); // false is to avoid float
    },

    validateDate(date) {
      // check the structure nnnn-nn-nn
      for (var i = 0; i < date.length; i++) {
        let char = date.charAt(i);
        if (i == 4 || i == 7) {
          if (char != '-') return false;
        } else {
          if (char != +char) return false;
        }
      }
      return true;
    },

    validateTime(time) {
      // check the structure nn:nn:nn
      for (var i = 0; i < time.length; i++) {
        let char = time.charAt(i);
        if (i == 2 || i == 5) {
          if (char != ':') return false;
        // } else {
        //   if (char != +char) return false;
        }
      }
      return true;
    },

    validateDatetime(datetime) {
      let date = datetime.substring(0, 10);
      let space = datetime.substring(10, 11);
      let time = datetime.substring(11, 19);
      if (!this.validateDate(date)) return false;
      if (space != ' ') return false;
      if (!this.validateTime(time)) return false;
      return true;
    },

// DATE COSAS

    getMoment(Diference = {}) {
      Diference.day = Diference.day || 0;
      Diference.month = Diference.month || 0;
      Diference.year = Diference.year || 0;
      let m = moment();
      m.add(Diference.day, 'days');
      m.add(Diference.month, 'months');
      m.add(Diference.year, 'years');
      return m;
      // return m.format('DD/MM/YYYY');
    },
    getMomentByDate(date) {
      return moment(date);
    },
    // getActualDatetime

    getActualDayOfMonth(Diference = {}) {
      return this.getMoment(Diference).format('DD');
    },
    getActualMonth(Diference = {}) {
      return this.getMoment(Diference).format('MM');
    },
    getActualYear(Diference = {}) {
      return this.getMoment(Diference).format('YYYY');
    },

    // TO DB
    getActualDateToDB(Diference = {}) {
      return this.getMoment(Diference).format('YYYY-MM-DD');
    },
    getActualDatetimeToDB(Diference = {}) {
      return this.getMoment(Diference).format('YYYY-MM-DD HH:mm:ss');
    },
    getActualDayOfWeek(Diference = {}) {
      return this.getMoment(Diference).day();
    },
    getActualMinutesOfDay() {
      let hour = this.getMoment().format('HH');
      let min = this.getMoment().format('mm');
      return +hour * 60 + +min;
    },


    // FROM DB
    getDayOfDB(date) {
      return date.substring(8,10);
    },
    getMonthOfDB(date) {
      return date.substring(5,7);
    },
    getDateOfDB(date, onlyNumber = false) {
      if (!onlyNumber) {
        if (date == this.getActualDateToDB()) return 'Hoy';
        // if (date == this.getActualDateToDB({day: +2})) return 'Pasado mañana';
        if (date == this.getActualDateToDB({day: +1})) return 'Mañana';
        if (date == this.getActualDateToDB({day: -1})) return 'Ayer';
        if (date == this.getActualDateToDB({day: -2})) return 'Anteayer';
      }
      if (date == '0000-00-00') return '-';
      let month   = date.substring(5,7).padStart(2, '0');
      let day = date.substring(8,10).padStart(2, '0');
      let year  = date.substring(2,4);
      return day +'/'+ month +'/'+ year;
    },
    getTimeOfDB(date) {
      return date.substring(11, 16);
    },
  }, // METHODS
} // export
