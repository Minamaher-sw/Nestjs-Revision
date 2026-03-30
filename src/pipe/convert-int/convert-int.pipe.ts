import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ConvertIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if (typeof value === 'string' && !isNaN(Number(value))) {
      return parseInt(value, 10);
    } 
    else if (typeof value === 'number') {
      return value;
    } 
    else if (Array.isArray(value)) {
      throw new HttpException(
        'Invalid input: expected a single value, but received an array',
        400
      );
    }
    else if (typeof value === 'object' && value !== null) {
      throw new HttpException(
        'Invalid input: expected a single value, but received an object',
        400
      );
    }
    else if (typeof value === 'boolean') {
      throw new HttpException(
        'Invalid input: expected a single value, but received a boolean',
        400
      );
    }
    else if (typeof value === 'undefined' || value === null) {
      throw new HttpException(
        'Invalid input: expected a single value, but received undefined or null',
        400
      );
    }
    else if (typeof value === "string" && isNaN(Number(value))) {
      throw new HttpException(
        'Invalid input: expected a number in string format, but received a non-numeric string',
        400
      );
    }

    return value;
  }
}