import { request } from '@/utils/request';

interface CreateTokenParams {
  userName: string;
  roomId: string;
  appId: string;
}

interface CreateUserId {
  userName: string;
}

export async function createAppId(projectName: string): Promise<any> {
  return request.post('/create_app_id', { projectName });
}

export async function createToken(params: CreateTokenParams): Promise<any> {
  return request.post('/create_token', params);
}

export async function createUserId(params: CreateUserId): Promise<any> {
  return request.post('/create_user_id', params);
}

