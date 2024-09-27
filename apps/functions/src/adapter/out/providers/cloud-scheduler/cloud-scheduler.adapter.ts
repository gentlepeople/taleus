import { CloudSchedulerClient, protos } from '@google-cloud/scheduler';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { logger } from 'firebase-functions/v2';

import { ConfigAdapter } from '../config';

import { SCHEDULER_DAILY_MISSION_CRON_EXPRESSION } from './cloud-scheduler.const';

import { CloudSchedulerPort } from '@/ports';

@Injectable()
export class CloudSchedulerAdapter implements OnModuleInit, CloudSchedulerPort {
  private client: CloudSchedulerClient;
  constructor(private readonly configAdapter: ConfigAdapter) {
    this.client = new CloudSchedulerClient();
  }

  async onModuleInit() {
    if (this.configAdapter.isDevelopment) {
      logger.log('Local environment detected, skipping scheduler job registration.');
      return;
    }
    await this.createOrUpdateSchedulerJob();
  }

  async getJob(name: string): Promise<{ scheduleTime: any }> {
    try {
      const [response] = await this.client.getJob({ name });
      return { scheduleTime: response.scheduleTime };
    } catch (error) {
      logger.error('[Event] Error getting cloud scheduler job:', error);
    }
  }

  private async createOrUpdateSchedulerJob() {
    const { jobName, jobData } = this.getJobConfig();

    try {
      await this.client.getJob({ name: jobName });
      logger.log(`[Event] Cloud Scheduler Job already exists: ${jobName}, updating...`);

      await this.updateSchedulerJob(jobData);
    } catch (error) {
      if (error.code === 5) {
        // 404 NOT FOUND
        logger.log(`[Event] Cloud Scheduler Job not found: ${jobName}, creating a new job...`);
        await this.createSchedulerJob(jobData);
      } else {
        logger.error('[Event] Error checking cloud scheduler job:', error);
      }
    }
  }

  private async createSchedulerJob(jobData: protos.google.cloud.scheduler.v1.IJob) {
    const { projectId, location } = this.getJobConfig();
    try {
      const [response] = await this.client.createJob({
        parent: this.client.locationPath(projectId, location),
        job: jobData,
      });
      logger.log(`[Event] Created new cloud scheduler job: ${response.name}`);
    } catch (error) {
      logger.error('[Event] Error creating cloud scheduler job:', error);
    }
  }

  private async updateSchedulerJob(jobData: protos.google.cloud.scheduler.v1.IJob) {
    try {
      const [response] = await this.client.updateJob({
        job: jobData,
      });
      logger.log(`[Event] Updated cloud scheduler job: ${response.name}`);
    } catch (error) {
      logger.error('[Event] Error updating cloud scheduler job:', error);
    }
  }

  getJobConfig() {
    const projectId = this.configAdapter.get('GCP_PROJECT_ID');
    const location = this.configAdapter.get('GCP_LOCATION');
    const jobId = this.configAdapter.get('CLOUD_SCHEDULER_JOB_ID');
    const targetUri = this.configAdapter.get('CLOUD_SCHEDULER_DAILY_MISSION_URL');

    const jobName = this.client.jobPath(projectId, location, jobId);
    const jobData: protos.google.cloud.scheduler.v1.IJob = {
      name: jobName,
      schedule: SCHEDULER_DAILY_MISSION_CRON_EXPRESSION,
      httpTarget: {
        uri: targetUri,
        httpMethod: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      timeZone: 'UTC',
      retryConfig: {
        retryCount: 3,
        maxRetryDuration: {
          seconds: 300,
        },
      },
    };

    return { projectId, location, jobId, targetUri, jobName, jobData };
  }
}
