export type DataMigration = {
  version: string;
  name: string;
  started_at: Date;
  finished_at: Date;
};

export interface WriteFileOptions {
  existingFiles?: 'FAIL' | 'SKIP';
}
