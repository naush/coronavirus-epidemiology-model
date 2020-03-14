class Model {
  constructor(options) {
    this.options = options;
  }

  static number_of_cases_in_day_1() { return 1 }

  number_of_cases(previous_number_of_cases) {
    return previous_number_of_cases * (2 ** (1/this.options.number_of_days_per_doubling));
  }

  number_of_deaths(number_of_cases) {
    return number_of_cases
      / ((2 ** (1/this.options.number_of_days_per_doubling)) ** this.options.number_of_days_from_infection_to_death)
      * this.options.mortality_rate;
  }

  number_hospitalized(number_of_cases) {
    return number_of_cases
      / ((2 ** (1/this.options.number_of_days_per_doubling)) ** this.options.number_of_days_from_infection_to_hospitalization)
      * this.options.hospitalization_rate;
  }

  number_in_hospital_at_the_time(number_of_cases) {
    return this.number_hospitalized(number_of_cases)
      - (number_of_cases / ((2 ** (1/this.options.number_of_days_per_doubling)) ** this.options.number_of_days_from_infection_to_out_of_hospital));
  }

  ofDay(number) {
    if (number == 1) {
      return {
        number_of_cases: Model.number_of_cases_in_day_1(),
        number_of_deaths: this.number_of_deaths(Model.number_of_cases_in_day_1()),
        number_hospitalized: this.number_hospitalized(Model.number_of_cases_in_day_1()),
        number_in_hospital_at_the_time: this.number_in_hospital_at_the_time(
          Model.number_of_cases_in_day_1(), this.number_hospitalized(Model.number_of_cases_in_day_1())),
      };
    }

    const previous_number_of_cases = this.ofDay(number - 1).number_of_cases;
    const number_of_cases = this.number_of_cases(previous_number_of_cases);

    return {
      number_of_cases: this.number_of_cases(previous_number_of_cases),
      number_of_deaths: this.number_of_deaths(number_of_cases),
      number_hospitalized: this.number_hospitalized(number_of_cases),
      number_in_hospital_at_the_time: this.number_in_hospital_at_the_time(number_of_cases)
    }
  }
}

module.exports = Model;
