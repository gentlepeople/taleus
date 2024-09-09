export const SUBMIT_MISSION_RESPONSE_USECASE = Symbol('SUBMIT_MISSION_RESPONSE_USECASE');

export interface SubmitMissionResponseUsecase {
  execute(
    data: {
      userId: string;
      questionId: number;
      coupleMissionId?: number;
      content: string;
    }[],
  ): Promise<boolean>;
}
