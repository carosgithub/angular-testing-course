import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('Calculator Service', () => {

  let loggerSpy: any,
      calculator: CalculatorService;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });

    calculator = TestBed.inject(CalculatorService);

  });

  it('It should add two numbers', () => {

    const result = calculator.add(2, 3);
    expect(result).toBe(5);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('It should substract two numbers', () => {

    const result = calculator.subtract(3, 2);
    expect(result).toBe(1, 'Unexpected substraction error');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

})
