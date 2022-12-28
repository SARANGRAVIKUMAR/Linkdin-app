import { VerifyOptions } from 'jsonwebtoken';
import { Document } from 'mongoose';
import { SecretOrKeyProvider, JwtFromRequestFunction } from 'passport-jwt';

export interface User extends Document {
  email: string;
  password: string;
  name: string;
  deleted: string;
  refreshToken: string;
}

export interface StrategyOptions {
  secretOrKey: string;
  jwtFromRequest: JwtFromRequestFunction;

}