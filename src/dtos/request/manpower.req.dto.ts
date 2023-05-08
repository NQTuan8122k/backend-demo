import { IsNotEmpty } from 'class-validator';

export class ManpowerCreationDTO {
  @IsNotEmpty({ message: 'Position cannot plank' })
  position_id: number;

  @IsNotEmpty({ message: 'Level cannot plank' })
  level_id: number;

  @IsNotEmpty({ message: 'Quantity cannot plank' })
  quantity: number;

  @IsNotEmpty({ message: 'Approver cannot plank' })
  approver: string;

  approver_middle?: string;

  approver_last?: string;

  @IsNotEmpty({ message: 'Hiring reason cannot plank' })
  hiring_reason: string;

  @IsNotEmpty({ message: 'Expired date cannot plank' })
  expired_date: string;

  document_url?: string;

  accessToken: string;

  refreshToken: string;
}
