const Model = require('./model');

describe('Coronavirus Epidemiology Model', () => {
  beforeEach(() => {
    const options = {
      numberOfDaysPerDoubling: 7,
      numberOfDaysFromInfectionToDeath: 20,
      mortalityRate: 0.015,
      numberOfDaysFromInfectionToHospitalization: 12,
      hopistalizationRate: 0.2,
      numberOfDaysFromInjectionToOutOfHospital: 40,
    };

    this.model = new Model(options);
  });

  describe('numberOfCases', () => {
    it('for day 1', () => {
      const dataset = this.model.ofDay(1);

      expect(dataset.numberOfCases).toBe(1);
    });

    it('for day 2', () => {
      const dataset = this.model.ofDay(2);

      expect(dataset.numberOfCases).toBeCloseTo(1.10, 2);
    });

    it('for day 3', () => {
      const dataset = this.model.ofDay(3);

      expect(dataset.numberOfCases).toBeCloseTo(1.22, 2);
    });
  });

  describe('numberOfDeaths', () => {
    it('for day 1', () => {
      const dataset = this.model.ofDay(1);

      expect(dataset.numberOfDeaths).toBeCloseTo(0.00, 1);
    });

    it('for day 10', () => {
      const dataset = this.model.ofDay(10);

      expect(dataset.numberOfDeaths).toBeCloseTo(0.01, 1);
    });

    it('for day 21', () => {
      const dataset = this.model.ofDay(21);

      expect(dataset.numberOfDeaths).toBeCloseTo(0.02, 1);
    });
  });

  describe('numberHospitalized', () => {
    it('for day 1', () => {
      const dataset = this.model.ofDay(1);

      expect(dataset.numberHospitalized).toBeCloseTo(0.06, 2);
    });

    it('for day 2', () => {
      const dataset = this.model.ofDay(2);

      expect(dataset.numberHospitalized).toBeCloseTo(0.07, 2);
    });

    it('for day 4', () => {
      const dataset = this.model.ofDay(4);

      expect(dataset.numberHospitalized).toBeCloseTo(0.08, 2);
    });
  });

  describe('numberInHospitalAtTheTime', () => {
    it('for day 1', () => {
      const dataset = this.model.ofDay(1);

      expect(dataset.numberInHospitalAtTheTime).toBeCloseTo(0.06, 1);
    });

    it('for day 3', () => {
      const dataset = this.model.ofDay(3);

      expect(dataset.numberInHospitalAtTheTime).toBeCloseTo(0.07, 1);
    });

    it('for day 4', () => {
      const dataset = this.model.ofDay(4);

      expect(dataset.numberInHospitalAtTheTime).toBeCloseTo(0.08, 1);
    });
  });
});
