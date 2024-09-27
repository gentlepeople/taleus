import { NestMiddleware, Injectable, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CloudSchedulerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const userAgent = request.get('user-agent');
    const cloudSchedulerJobName = request.get('x-cloudscheduler-jobname');
    const cloudSchedulerScheduleTime = request.get('x-cloudscheduler-scheduletime');

    // for required scheduleTime, not authorize yet.
    const checkCloudScheduler =
      userAgent === 'Google-Cloud-Scheduler' &&
      [process.env.CLOUD_SCHEDULER_JOB_ID].includes(cloudSchedulerJobName) &&
      cloudSchedulerScheduleTime;

    if (!checkCloudScheduler) {
      throw new UnauthorizedException('Unauthorized request from non-Cloud Scheduler source.');
    }

    next();
  }
}
