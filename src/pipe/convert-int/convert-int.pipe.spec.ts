import { ConvertIntPipe } from './convert-int.pipe';
import { HttpException } from '@nestjs/common';

describe('ConvertIntPipe', () => {
  let pipe: ConvertIntPipe;

  beforeEach(() => {
    pipe = new ConvertIntPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    describe('valid inputs', () => {
      it('should convert numeric string to number', () => {
        const result = pipe.transform('42', { type: 'param', metatype: Number, data: 'id' });
        expect(result).toBe(42);
        expect(typeof result).toBe('number');
      });

      it('should convert negative numeric string to number', () => {
        const result = pipe.transform('-10', { type: 'param', metatype: Number, data: 'id' });
        expect(result).toBe(-10);
      });

      it('should pass through number values', () => {
        const result = pipe.transform(100, { type: 'param', metatype: Number, data: 'id' });
        expect(result).toBe(100);
      });

      it('should convert zero string to zero', () => {
        const result = pipe.transform('0', { type: 'param', metatype: Number, data: 'id' });
        expect(result).toBe(0);
      });
    });

    describe('invalid inputs', () => {
      it('should throw error for array input', () => {
        expect(() => {
          pipe.transform([1, 2, 3], { type: 'param', metatype: Number, data: 'id' });
        }).toThrow(HttpException);
      });

      it('should throw error for object input', () => {
        expect(() => {
          pipe.transform({ value: 42 }, { type: 'param', metatype: Number, data: 'id' });
        }).toThrow(HttpException);
      });

      it('should throw error for boolean input', () => {
        expect(() => {
          pipe.transform(true, { type: 'param', metatype: Number, data: 'id' });
        }).toThrow(HttpException);
      });

      it('should throw error for undefined input', () => {
        expect(() => {
          pipe.transform(undefined, { type: 'param', metatype: Number, data: 'id' });
        }).toThrow(HttpException);
      });

      it('should throw error for null input', () => {
        expect(() => {
          pipe.transform(null, { type: 'param', metatype: Number, data: 'id' });
        }).toThrow(HttpException);
      });

      it('should throw error for non-numeric string', () => {
        expect(() => {
          pipe.transform('abc', { type: 'param', metatype: Number, data: 'id' });
        }).toThrow(HttpException);
      });

      it('should throw error with appropriate message for non-numeric string', () => {
        try {
          pipe.transform('invalid', { type: 'param', metatype: Number, data: 'id' });
          fail('Should have thrown an error');
        } catch (error: any) {
          expect(error.message).toContain('non-numeric string');
        }
      });
    });
  });
});
