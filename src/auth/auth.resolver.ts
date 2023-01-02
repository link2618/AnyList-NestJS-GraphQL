import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginInput, SignupInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation( () => AuthResponse, { name: 'signup' })
  async signup( @Args('signupInput') signupInput: SignupInput ): Promise<AuthResponse>{
    return this.authService.signup(signupInput)
  }

  @Mutation( () => AuthResponse, { name: 'login' })
  async login( @Args('loginInput') loginInput: LoginInput ): Promise<AuthResponse>{
    return this.authService.login(loginInput)
  }

  @Query( () => AuthResponse, { name: 'revalidate' })
  @UseGuards( JwtAuthGuard )
  revalidateToken( @CurrentUser( /*[ ValidRoles.admin ]*/ ) user: User ): AuthResponse{
    return this.authService.revalidateToken( user );
  }
}
