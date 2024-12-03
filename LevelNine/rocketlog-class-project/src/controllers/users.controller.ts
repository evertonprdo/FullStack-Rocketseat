import { Request, Response } from 'express'
import { hash } from 'bcrypt'
import z from 'zod'

import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/app.error'

export class UsersController {
   async create(request: Request, response: Response) {
      const bodySchema = z.object({
         name: z.string().trim().min(3),
         email: z.string().email(),
         password: z.string().trim().min(6),
      })

      const { name, email, password } = bodySchema.parse(request.body)

      const userWithSameEmail = await prisma.user.findFirst({
         where: { email },
      })

      if (userWithSameEmail) {
         throw new AppError('User with same email already exists')
      }

      const hashedPassword = await hash(password, 8)

      const user = await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword,
         },
      })

      const { password: _, ...userWithoutPassword } = user

      response.status(201).json(userWithoutPassword)
   }
}