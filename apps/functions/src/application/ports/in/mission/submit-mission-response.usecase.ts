export const SUBMIT_MISSION_RESPONSE_USECASE = Symbol('SUBMIT_MISSION_RESPONSE_USECASE');

export interface SubmitMissionResponseUsecase {
  execute(
    data: {
      userId: string;
      questionId: bigint;
      coupleMissionId?: bigint;
      content: string;
    }[],
  ): Promise<boolean>;
}
