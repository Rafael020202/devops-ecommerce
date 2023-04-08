import { HttpResponse } from '@/contracts';

export interface Service {
  handle(request: any): Promise<HttpResponse>;
}
