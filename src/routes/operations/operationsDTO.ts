import { IsArray, IsOptional, IsString } from 'class-validator'

interface Operation {
    operation: string
    pizza: string[]
    ingredient: string[]
}

export class OperationDTO implements Operation {
    @IsOptional()
    @IsString()
    	operation: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	pizza: string[]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	ingredient: string[]
}
