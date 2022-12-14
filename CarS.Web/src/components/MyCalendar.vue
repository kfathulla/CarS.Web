<template>
  <div class="row">
    <div class="col col-md-4">
      <div class="b-calendar__information">
        <div class="today d-flex justify-content-center align-items-center">
          <div class="text-muted month">Today</div>
          <div class="day">
            {{ today.format("D") }}
          </div>
          <div class="month">
            {{ today.format("MMMM Y") }}
          </div>
          <div class="weekDay">
            {{ today.format("dddd") }}
          </div>
        </div>
      </div>
    </div>
    <div class="col col-md-8">
      <div class="b-calendar__calendar">
        <div class="b-calendar__header">
          <div class="row">
            <div class="year text-right">
              <span>{{ year }}</span>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="text-left">
              <Popper hover :content="previousMonthAsString" placement="left">
                <button class="arrow" @click="subtractMonth">
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png"
                  />
                </button>
              </Popper>
            </div>
            <div class="text-center">
              <span class="month">{{ month }}</span>
            </div>
            <div class="text-right">
              <Popper hover :content="nextMonthAsString" placement="right">
                <button class="arrow" @click="addMonth">
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png"
                  />
                </button>
              </Popper>
            </div>
          </div>
        </div>
        <div class="b-calendar__weekdays text-center">
          <div class="weekday" v-for="(day, index) in days" :key="index">
            <strong :class="index > 4 ? 'text-danger' : ''">{{ day }}</strong>
          </div>
        </div>
        <div class="b-calendar__dates">
          <div
            class="datewidth text-center"
            v-for="date in dateList"
            :key="date.key"
            :data-date="date.date"
          >
            <Popper
              placement="right"
              v-if="
                plans.some(
                  (plan) =>
                    plan.day.format('YYYYMMDD') ===
                    date.moment.format('YYYYMMDD')
                )
              "
            >
              <button
                class="date btn btn-primary"
                :class="{
                  today: date.today,
                  blank: date.blank,
                  'text-danger':
                    (date.key % 7 > 5 || date.key % 7 === 0) && !date.blank,
                }"
                :data-date="date.date"
              >
                {{ date.dayNumber }}
              </button>
              <template #content>
                <p style="width: 200px; margin: 0">
                  <a
                    class="text-decoration-none"
                    :href="
                      plans.filter(
                        (plan) =>
                          plan.day.format('YYYYMMDD') ===
                          date.moment.format('YYYYMMDD')
                      )[0].link
                    "
                  >
                    {{
                      plans
                        .filter(
                          (plan) =>
                            plan.day.format("YYYYMMDD") ===
                            date.moment.format("YYYYMMDD")
                        )[0]
                        .day.format("DD MMMM")
                    }}
                  </a>
                  {{
                    " " +
                    plans.filter(
                      (plan) =>
                        plan.day.format("YYYYMMDD") ===
                        date.moment.format("YYYYMMDD")
                    )[0].title
                  }}
                </p>
                <p class="m-0">
                  {{
                    plans.filter(
                      (plan) =>
                        plan.day.format("YYYYMMDD") ===
                        date.moment.format("YYYYMMDD")
                    )[0].text
                  }}
                </p>
                <a
                  :href="
                    plans.filter(
                      (plan) =>
                        plan.day.format('YYYYMMDD') ===
                        date.moment.format('YYYYMMDD')
                    )[0].link
                  "
                  class="btn btn-primary w-75"
                  >More...
                </a>
              </template>
            </Popper>
            <button
              v-else
              class="date btn"
              :class="{
                today: date.today,
                blank: date.blank,
                'text-danger':
                  (date.key % 7 > 5 || date.key % 7 === 0) && !date.blank,
              }"
              :data-date="date.date"
            >
              {{ date.dayNumber }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      today: moment(),
      dateContext: moment(),
      selectedDate: moment(),
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      plans: [],
    };
  },
  mounted() {
    this.setPlans(this.today);
  },
  computed: {
    year() {
      return this.dateContext.format("Y");
    },

    month() {
      return this.dateContext.format("MMMM");
    },

    daysInMonth() {
      return this.dateContext.daysInMonth();
    },

    currentDate() {
      return this.dateContext.get("date");
    },

    firstDayOfMonth() {
      let firstDay = moment(this.dateContext).subtract(
        this.currentDate,
        "days"
      );
      return firstDay.weekday();
    },

    previousMonth() {
      return moment(this.dateContext).subtract(1, "month");
    },
    previousMonthAsString() {
      return this.previousMonth.format("MMMM");
    },
    nextMonth() {
      return moment(this.dateContext).add(1, "month");
    },
    nextMonthAsString() {
      return this.nextMonth.format("MMMM");
    },

    daysInPreviousMonth() {
      return this.previousMonth.daysInMonth();
    },
    daysFromPreviousMonth() {
      let daysList = [];
      let count = this.daysInPreviousMonth - this.firstDayOfMonth;
      while (count < this.daysInPreviousMonth) {
        count++;
        daysList[count] = count;
      }

      return daysList.filter(function () {
        return true;
      });
    },

    dateList() {
      let $this = this;

      let dateList = [];

      let previousMonth = this.previousMonth;
      let nextMonth = this.nextMonth;

      //dates for display
      let formattedCurrentMonth = this.dateContext.format("MM");
      let formattedCurrentYear = this.year;
      let formattedPreviousMonth = previousMonth.format("MM");
      let formattedPreviousYear = previousMonth.format("Y");
      let formattedNextMonth = nextMonth.format("MM");
      let formattedNextYear = nextMonth.format("Y");

      //counters
      let countDayInCurrentMonth = 0;
      let countDayInPreviousMonth = 0;

      //filling in dates from the previous month
      this.daysFromPreviousMonth.forEach(function (dayFromPreviousMonth) {
        countDayInCurrentMonth++;
        countDayInPreviousMonth++;

        let formattedDay = $this.formattingDay(dayFromPreviousMonth);
        let previousMonth =
          $this.daysFromPreviousMonth.length === countDayInPreviousMonth
            ? $this.previousMonthAsString
            : false;
        let previousYear =
          formattedCurrentYear !== formattedPreviousYear &&
          $this.daysFromPreviousMonth.length === countDayInPreviousMonth
            ? formattedPreviousYear
            : false;
        let additional = {
          month: previousMonth,
          year: previousYear,
        };

        if (!previousMonth && !previousYear) {
          additional = false;
        }

        dateList[countDayInCurrentMonth] = {
          key: countDayInCurrentMonth,
          dayNumber: formattedDay,
          date:
            formattedDay +
            "." +
            formattedPreviousMonth +
            "." +
            formattedPreviousYear,
          blank: true,
          today: false,
          additional: additional,
          weekDay: false,
          moment: moment(
            formattedPreviousYear + formattedPreviousMonth + formattedDay
          ),
        };
        dateList.forEach((item) => console.log(item));
      });

      //filling in dates from the current month
      while (countDayInCurrentMonth < this.firstDayOfMonth + this.daysInMonth) {
        countDayInCurrentMonth++;

        let day = countDayInCurrentMonth - countDayInPreviousMonth;
        let weekDay = this.getWeekDay(countDayInCurrentMonth);
        let formattedDay = this.formattingDay(day);

        dateList[countDayInCurrentMonth] = {
          key: countDayInCurrentMonth,
          dayNumber: formattedDay,
          date:
            formattedDay +
            "." +
            formattedCurrentMonth +
            "." +
            formattedCurrentYear,
          blank: false,
          today:
            formattedDay === this.initialDate &&
            this.todayInCurrentMonthAndYear,
          additional: false,
          weekDay: weekDay,
          moment: moment(
            formattedCurrentYear + formattedCurrentMonth + formattedDay
          ),
        };
      }

      let daysInNextMonth = 7 - (countDayInCurrentMonth % 7);
      let countDayInCurrentMonthSaved = countDayInCurrentMonth;
      let day = 0;

      //filling in dates from the next month
      if (daysInNextMonth < 7) {
        while (
          countDayInCurrentMonth <
          countDayInCurrentMonthSaved + daysInNextMonth
        ) {
          countDayInCurrentMonth++;
          day++;

          let formattedDay = this.formattingDay(day);
          let nextMonth = day === 1 ? this.nextMonthAsString : false;
          let nextYear =
            formattedCurrentYear !== formattedNextYear && day === 1
              ? formattedNextYear
              : false;
          let additional = {
            month: nextMonth,
            year: nextYear,
          };

          if (!nextMonth && !nextYear) {
            additional = false;
          }

          dateList[countDayInCurrentMonth] = {
            key: countDayInCurrentMonth,
            dayNumber: formattedDay,
            date:
              formattedDay + "." + formattedNextMonth + "." + formattedNextYear,
            blank: true,
            today: false,
            additional: additional,
            weekDay: false,
            moment: moment(
              formattedNextYear + formattedNextMonth + formattedDay
            ),
          };
        }
      }

      return dateList.filter(function () {
        return true;
      });
    },

    initialDate: function () {
      return this.formattingDay(this.today.get("date"));
    },
    initialMonth: function () {
      return this.today.format("MMMM");
    },
    initialYear: function () {
      return this.today.format("Y");
    },
    todayInCurrentMonthAndYear: function () {
      return this.month === this.initialMonth && this.year === this.initialYear;
    },
    selectedDayAndMonth: function () {
      let dayAndMonth = this.selectedDate.format("D MMMM");
      dayAndMonth = dayAndMonth.split(" ");
      dayAndMonth = {
        day: dayAndMonth[0],
        month: dayAndMonth[1],
      };

      return dayAndMonth;
    },
    selectedWeekDay: function () {
      return this.selectedDate.format("dddd");
    },
    todayIsEqualSelectDate: function () {
      return (
        this.selectedDate.format("YYYYMMDD") === this.today.format("YYYYMMDD")
      );
    },
  },
  methods: {
    setPlans(data) {
      //get results from api but yet it's static
      var plans = [
        {
          day: moment(
            data.format("YYYY") + data.format("MM") + "07",
            "YYYYMMDD"
          ),
          title: "title07",
          text: "cs suh si siuhs csdkchsdi cdcdcd i",
          link: "/07",
        },
        {
          day: moment(
            data.format("YYYY") + data.format("MM") + "04",
            "YYYYMMDD"
          ),
          title: "title21",
          text: "cs suh si siuhs csdkchsdi cdcdcd i",
          link: "/21",
        },
      ];
      this.plans = plans;
    },
    addMonth() {
      this.setPlans(this.nextMonth);
      this.dateContext = this.nextMonth;
    },
    subtractMonth() {
      this.setPlans(this.previousMonth);
      this.dateContext = this.previousMonth;
    },
    setSelectedDate(moment) {
      this.selectedDate = moment;
    },
    goToday() {
      this.selectedDate = this.today;
      this.dateContext = this.today;
    },
    formattingDay(day) {
      return ("0" + day).slice(-2);
    },
    getWeekDay(day) {
      let index = day;
      if (index > 7) {
        index %= 7;
      }
      index = index === 0 ? 6 : index - 1;
      return this.days[index];
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style lang="scss">
$font-family-base: "HelveticaNeue-Light", "Helvetica Neue Light",
  "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
$font-weight-base: 300;
$font-size: 1.125em;
$line-height: 1.3;
:root {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 1px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
.b-calendar {
  display: flex;
  align-items: center;
  margin: 2.5em 0;
  &__information {
    background-color: rgba(0, 123, 255, 0.2);
    border-radius: 1.2rem 0 0 1.2rem;
    height: 100%;
    .today {
      flex-direction: column;
      padding-top: 3em;
      .weekDay {
        font-size: 1.2em;
        font-weight: 100;
        padding-bottom: 0.5em;
      }
      .day {
        font-size: 5.5em;
        font-weight: 600;
        line-height: 1;
      }
      .month {
        font-size: 2em;
        font-weight: 200;
        line-height: 1;
      }
    }
  }
  &__calendar {
    min-height: 40rem;
  }
  &__header {
    margin-bottom: 2rem;
    .month {
      font-size: 1.25em;
      font-weight: 200;
      text-transform: capitalize;
    }
    .year {
      font-size: 1.5em;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .arrow {
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      width: 2.5rem;
      &:hover {
        cursor: pointer;
      }
      &-left {
        i {
          transform: translateX(-10%);
        }
      }
      &-right {
        i {
          transform: translateX(10%);
        }
      }
    }
  }
  &__weekdays {
    display: flex;
    margin-bottom: 1.25rem;
    .weekday {
      width: calc(100% / 7);
      padding: 0.25rem 0.5rem;
    }
  }
  &__dates {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      background-color: #fff;
      height: 1px;
      width: 100%;
      z-index: 1;
    }

    .datewidth {
      padding: 0.25rem 0.5rem;
      position: relative;
      width: calc(100% / 7);
    }
    .date {
      position: relative;
      &.blank {
        background-color: rgba(0, 0, 0, 0.02);
        color: rgba(0, 0, 0, 0.2);
      }
      &.no-border-right {
        border-right: none;
      }
      &.today {
        background-color: rgba(0, 123, 255, 0.2);
      }
      .weekday {
        display: none;
      }
      .additional {
        font-size: 0.75em;
        position: absolute;
        bottom: 0.25rem;
        left: 0.5rem;
        .year {
          padding-right: 0.25rem;
          font-size: 0.75em;
        }
      }
    }
  }
}

.b-footer {
  padding: 15px 0;
}

@media (max-width: 768px) {
  .b-calendar__information {
    min-height: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 2.5rem 2.5rem 0 0;
    .today {
      padding-top: 0;
    }
  }
}

@media (max-width: 480px) {
  .b-calendar {
    &__weekdays {
      display: none;
    }
    &__dates {
      .date {
        width: 100%;
        text-align: left !important;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        display: flex;
        &.blank {
          display: none;
        }
        .weekday {
          display: block;
          margin-left: 0.25rem;
        }
      }
    }
  }
}
</style>
