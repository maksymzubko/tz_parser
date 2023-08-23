import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class EntityValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super(errors);
  }
}
