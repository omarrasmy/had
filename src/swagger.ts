import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function initSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('had')
    .setDescription("An API Documentation for NIS EMS(Education Management System) That Describe our API's")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      withCredentials: true,
    },
  };

  SwaggerModule.setup('had-swagger-docs', app, document, customOptions);
}
