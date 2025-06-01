// import { Controller, Get, Body, BadRequestException } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// @Controller('get-security-question')
// export class SecurityQuestionController {
//   @Get()
//   async getSecurityQuestion() {
//     try {
//       const questions = await prisma.securityQuestion.findMany({
//         select: { id: true, question: true },
//         orderBy: { name: 'asc' },
//       });
//       return roles;
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//       throw new Error('Failed to fetch roles');
//     }
//   }
// }
