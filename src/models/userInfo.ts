import { IPhoto } from './photo';
import { IUserPayload } from './user';

export interface IUserInfo {
  user: {} | IUserPayload;
  photos: [] | IPhoto[];
}
