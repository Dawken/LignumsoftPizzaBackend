import { IsArray, IsOptional, IsString } from 'class-validator'

interface Operation {
    operationName: string
    pizzas: string[]
    ingredients: string[]
}

export class OperationDTO implements Operation {
    @IsOptional()
    @IsString()
    	operationName: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	pizzas: string[]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	ingredients: string[]
}
