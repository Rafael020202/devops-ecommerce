import { HttpResponse } from '@/contracts';

export interface Middleware {
  handle(request: any): Promise<HttpResponse>;
}
