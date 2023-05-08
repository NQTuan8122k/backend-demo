import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenPayloadDto {
  @ApiProperty()
  accessToken: string;

  constructor(data: { accessToken: string }) {
    this.accessToken = data.accessToken;
  }
}

export class RefreshTokenPayloadDto {
  @ApiProperty()
  refreshToken: string;

  constructor(data: { refreshToken: string }) {
    this.refreshToken = data.refreshToken;
  }
}
