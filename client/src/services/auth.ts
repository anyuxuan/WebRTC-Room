import { request } from '@/utils/request';

const http = request.create({
  baseURL: 'http://localhost:3000',
});

interface CreateTokenParams {
  userName: string;
  roomId: string;
  appId: string;
}

export async function createToken(params: CreateTokenParams): Promise<any> {
  return http.post('/create_token');
}

