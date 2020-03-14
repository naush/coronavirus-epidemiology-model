const SafeGroupSize = require('./safe_group_size');

describe('Safe Group Size Calculator', () => {
  it('calculates the safe group size for the given factors', () => {
    const options = {
      populationInMetropolitanArea: 300000,
      estimatedNumberOfCases: 35,
    };

    expect(SafeGroupSize.calculate(options)).toBeCloseTo(429, 0);
  });
});
