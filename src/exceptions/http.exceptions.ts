import { HttpException } from '@nestjs/common';

class HttpExceptions extends HttpException {
  constructor(msg: string | object, code: number) {
    super({ message: msg }, code);
  }
}

export class ExceptionForbidden extends HttpExceptions {
  constructor(msg: string | object) {
    super(msg, 403);
  }
}

export class ExceptionNotFound extends HttpExceptions {
  constructor(msg: string | object) {
    super(msg, 404);
  }
}

export class ExceptionBadRequest extends HttpExceptions {
  constructor(msg: string | object) {
    super(msg, 400);
  }
}

export class ExceptionUnauthorized extends HttpExceptions {
  constructor(msg: string | object) {
    super(msg, 401);
  }
}

export class ExceptionServerError extends HttpExceptions {
  constructor(msg: string | object) {
    super(msg, 400);
  }
}
