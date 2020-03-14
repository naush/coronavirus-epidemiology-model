class Model {
  constructor(options) {
    this.options = options;
  }

  static numberOfCasesInDay1() { return 1 }

  numberOfCases(previousNumberOfCases) {
    return previousNumberOfCases * (2 ** (1/this.options.numberOfDaysPerDoubling));
  }

  numberOfDeaths(numberOfCases) {
    return numberOfCases
      / ((2 ** (1/this.options.numberOfDaysPerDoubling)) ** this.options.numberOfDaysFromInfectionToDeath)
      * this.options.mortalityRate;
  }

  numberHospitalized(numberOfCases) {
    return numberOfCases
      / ((2 ** (1/this.options.numberOfDaysPerDoubling)) ** this.options.numberOfDaysFromInfectionToHospitalization)
      * this.options.hopistalizationRate;
  }

  numberInHospitalAtTheTime(numberOfCases) {
    return this.numberHospitalized(numberOfCases)
      - (numberOfCases / ((2 ** (1/this.options.numberOfDaysPerDoubling)) ** this.options.numberOfDaysFromInjectionToOutOfHospital));
  }

  ofDay(number) {
    if (number == 1) {
      return {
        numberOfCases: Model.numberOfCasesInDay1(),
        numberOfDeaths: this.numberOfDeaths(Model.numberOfCasesInDay1()),
        numberHospitalized: this.numberHospitalized(Model.numberOfCasesInDay1()),
        numberInHospitalAtTheTime: this.numberInHospitalAtTheTime(
          Model.numberOfCasesInDay1(), this.numberHospitalized(Model.numberOfCasesInDay1())),
      };
    }

    const previousNumberOfCases = this.ofDay(number - 1).numberOfCases;
    const numberOfCases = this.numberOfCases(previousNumberOfCases);

    return {
      numberOfCases: this.numberOfCases(previousNumberOfCases),
      numberOfDeaths: this.numberOfDeaths(numberOfCases),
      numberHospitalized: this.numberHospitalized(numberOfCases),
      numberInHospitalAtTheTime: this.numberInHospitalAtTheTime(numberOfCases)
    }
  }
}

module.exports = Model;
