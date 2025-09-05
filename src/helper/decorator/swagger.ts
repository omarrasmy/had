// src/common/decorators/swagger/api-doc.decorator.ts
import {
    applyDecorators,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiAcceptedResponse,
    ApiBearerAuth,
    ApiBody,
} from '@nestjs/swagger';
// Remove Public decorator since auth module was removed

export function ApiDocs(options: {
    summary: string;
    body?: Function;
    response?: Function;
    statusCode?: HttpStatus;
    isPublic?: boolean;
}) {
    return applyDecorators(
        ApiOperation({ summary: options.summary }),
        options.body ? ApiBody({ type: options.body }) : () => { },
        options.response
            ? ApiAcceptedResponse({
                type: options.response,
                description: `${options.summary} successfully`,
            })
            : () => { },

        // Authentication removed - always apply bearer auth
        ApiBearerAuth(),
        HttpCode(options.statusCode ?? HttpStatus.CREATED),
    );
}
