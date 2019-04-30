import { request } from '@/utils/request';

interface CreateTokenParams {
  userName: string;
  roomId: string;
  appId: string;
}

export async function createAppId(projectName: string): Promise<any> {
  return request.post('/create_app_id', { projectName });
}

export async function createToken(params: CreateTokenParams): Promise<any> {
  return request.post('/create_token', params);
}

