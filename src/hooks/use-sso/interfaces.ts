export interface IClaimsAB2C {
  email: string;
  name: string;
  family_name: string;
  given_name: string;
  /**
   * domain_hint
   */
  tid: string;
  "signInNames.emailAddress": string;
  aud: string;
  auth_time: number;
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  nonce: string;
  sub: string;
  ver: string;
  [key: string]: unknown;
}

export interface IUseTokenResult {
  isLoaded: boolean;
  claims: IClaimsAB2C | null;
}
