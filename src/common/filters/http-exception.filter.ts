import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'string' ? res : (res as any).message;
        }

        else if (exception instanceof BadRequestException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'string' ? res : (res as any).message;
        }

        else if (exception?.code === 'ER_DUP_ENTRY') {
            status = HttpStatus.CONFLICT;
            message = 'Resource already exists';
        }

        else if (exception?.code) {
            message = exception.message || 'Database error';
        }

        response.status(status).json({
            success: false,
            code: status,
            message: message || 'Internal server error',
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}
