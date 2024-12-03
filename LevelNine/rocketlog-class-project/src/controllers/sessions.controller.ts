import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import z from 'zod'

import { authConfig } from '@/configs/auth'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/app.error'

export class SessionsController {
   async create(request: Request, response: Response) {
      const bodySchema = z.object({
         email: z.string().email(),
         password: z.string().min(6),
      })

      const { email, password } = bodySchema.parse(request.body)

      const user = await prisma.user.findFirst({
         where: { email },
      })

      if (!user) {
         throw new AppError('Invalid credentials', 401)
      }

      const passwordMatched = await compare(password, user.password)

      if (!passwordMatched) {
         throw new AppError('Invalid credentials', 401)
      }

      const { secret, expiresIn } = authConfig.jwt
      const token = sign({ role: user.role ?? 'customer' }, secret, {
         subject: user.id,
         expiresIn,
      })

      const { password: _, ...userWithoutPassword } = user

      response.json({ user: userWithoutPassword, token })
   }
}
