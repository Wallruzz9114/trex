import { IUserPayload } from './../redux/refucers/userReducer';
import { IPhoto } from './photo';

export interface IUserInfo {
  user: {} | IUserPayload;
  photos: [] | IPhoto[];
}
