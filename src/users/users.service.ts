import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

import { CreateUserInput, UpdateUserInput } from './dto';

import { SignupInput } from '../auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}

  async create( signupInput: SignupInput ): Promise<User> {
    try {
      const newUser = this.usersRepository.create({ 
        ...signupInput,
        password: bcrypt.hashSync( signupInput.password, 10 )
       });

      return await this.usersRepository.save( newUser ); 
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOneByEmail( email: string ): Promise<User> {
   
    try {
      return await this.usersRepository.findOneByOrFail({ email })
    } catch (error) {
      throw new NotFoundException(`${ email } not found`);
    }

  }

  async findOneById( id: string ): Promise<User> {
   
    try {
      return await this.usersRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`${ id } not found`);
    }

  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error(`block not implemented`);
  }

  private handleDBErrors( error: any ): never{
    if( error.code === '23505' ){
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    if( error.code == 'error-001' ){
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error( error );
    throw new InternalServerErrorException('Please check server logs');
  }
}
