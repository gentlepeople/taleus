import { Response } from '@/domain';

export const UPDATE_RESPONSE_USECASE = Symbol('UPDATE_RESPONSE_USECASE');

export interface UpdateResponseUsecase {
  execute(responseId: bigint, newContent: string): Promise<Response>;
}
