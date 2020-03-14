class SafeGroupSize {
  static calculate(options) {
    const {
      populationInMetropolitanArea,
      estimatedNumberOfCases,
    } = options;

    return 1 / (estimatedNumberOfCases / populationInMetropolitanArea) * 0.05;
  }
}

module.exports = SafeGroupSize;
