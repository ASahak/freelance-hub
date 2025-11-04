import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICES } from '@libs/constants/microservices';
import { AuthProvider, User } from '@libs/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(MICROSERVICES.Users.name) private readonly usersClient: ClientProxy,
  ) {}

  jwtSign(user: Pick<User, 'id' | 'email'>) {
    return this.jwtService.sign({ ...user });
  }

  async login(
    email: string,
    pass: string,
  ): Promise<{ user: User; accessToken: string }> {
    const user: User | null = await firstValueFrom(
      this.usersClient.send(
        { cmd: 'findUser' },
        {
          email,
        },
      ),
    );

    console.log('Logging USER:', user);
    if (user && user.provider === AuthProvider.native) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const accessToken: string = this.jwtSign({ id: user.id, email });
      return { accessToken, user };
    } else {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
  }
}
