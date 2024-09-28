export const SUBMIT_MISSION_RESPONSE_USECASE = Symbol('SUBMIT_MISSION_RESPONSE_USECASE');

export interface SubmitMissionResponseUsecase {
  execute(input: {
    userId: string;
    missionId: bigint;
    coupleMissionId: bigint | null;
    data: {
      questionId: bigint;
      content: string;
    }[];
  }): Promise<{ success: boolean; message?: string }>;
}
