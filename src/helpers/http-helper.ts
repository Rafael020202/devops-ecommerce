import { HttpResponse } from '@/contracts';

export const badRequest = (msg: string): HttpResponse => {
  return {
    body: { msg },
    status: 400
  };
};

export const forbidden = (msg: string): HttpResponse => {
  return {
    body: { msg },
    status: 403
  };
};

export const unauthorized = (msg: string): HttpResponse => {
  return {
    body: { msg },
    status: 401
  };
};

export const created = (): HttpResponse => {
  return {
    body: {},
    status: 204
  };
};

export const success = (body: any): HttpResponse => {
  return {
    body,
    status: 200
  };
};
