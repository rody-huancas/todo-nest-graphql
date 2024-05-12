import { IsBoolean, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class StatusArgs {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
