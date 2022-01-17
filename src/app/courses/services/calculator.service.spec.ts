import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('Calculator Service', () => {

  it('It should add two numbers', () => {
    const logger = new LoggerService();
    spyOn(logger, 'log');

    const calculator = new CalculatorService(logger);
    const result = calculator.add(2, 3);

    expect(result).toBe(5);

    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('It should substract two numbers', () => {
    const calculator = new CalculatorService(new LoggerService());
    const result = calculator.subtract(3, 2);

    expect(result).toBe(1, 'Unexpected substraction error');
  });

})
