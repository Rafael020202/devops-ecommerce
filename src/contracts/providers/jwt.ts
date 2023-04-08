export interface Jwt {
  sigin(payload: any): string;
  verifyToken(token: string): any;
}
