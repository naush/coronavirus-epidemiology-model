const Model = require('./model');

describe('Coronavirus Epidemiology Model', () => {
  beforeEach(() => {
    const options = {
      number_of_days_per_doubling: 7,
      number_of_days_from_infection_to_death: 20,
      mortality_rate: 0.015,
      number_of_days_from_infection_to_hospitalization: 12,
      hospitalization_rate: 0.2,
      number_of_days_from_infection_to_out_of_hospital: 40,
    };

    this.model = new Model(options);
  });

  describe('number_of_cases', () => {
    it('for day 1', () => {
      const dataset = this.model.ofDay(1);

      expect(dataset.number_of_cases).toBe(1);
    });

    it('for day 2', () => {
      const dataset = this.model.ofDay(2);

      expect(dataset.number_of_cases).toBeCloseTo(1.10, 2);
    });

    it('for day 3', () => {
      const dataset = this.model.ofDay(3);

      expect(dataset.number_of_cases).toBeCloseTo(1.22, 2);
    });
  });

  describe('number_of_deaths', () => {
    it('for day 1', () => {
      const dataset = this.model.ofDay(1);

      expect(dataset.number_of_deaths).toBeCloseTo(0.00, 1);
    });

    it('for day 10', () => {
      const dataset = this.model.ofDay(10);

      expect(dataset.number_of_deaths).toBeCloseTo(0.01, 1);
    });

    it('for day 21', () => {
      const dataset = this.model.ofDay(21);

      expect(dataset.number_of_deaths).toBeCloseTo(0.02, 1);
    });
  });

  describe('number_hospitalized', () => {
    it('for day 1', () => {
      const dataset = this.model.ofDay(1);

      expect(dataset.number_hospitalized).toBeCloseTo(0.06, 2);
    });

    it('for day 2', () => {
      const dataset = this.model.ofDay(2);

      expect(dataset.number_hospitalized).toBeCloseTo(0.07, 2);
    });

    it('for day 4', () => {
      const dataset = this.model.ofDay(4);

      expect(dataset.number_hospitalized).toBeCloseTo(0.08, 2);
    });
  });

  describe('number_in_hospital_at_the_time', () => {
    it('for day 1', () => {
      const dataset = this.model.ofDay(1);

      expect(dataset.number_in_hospital_at_the_time).toBeCloseTo(0.06, 1);
    });

    it('for day 3', () => {
      const dataset = this.model.ofDay(3);

      expect(dataset.number_in_hospital_at_the_time).toBeCloseTo(0.07, 1);
    });

    it('for day 4', () => {
      const dataset = this.model.ofDay(4);

      expect(dataset.number_in_hospital_at_the_time).toBeCloseTo(0.08, 1);
    });
  });
});
