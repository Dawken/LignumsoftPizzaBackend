import { IsArray, IsOptional, IsString } from 'class-validator'

interface Operation {
    name: string
    pizzas: string[]
    ingredients: string[]
}

export class OperationDTO implements Operation {
    @IsOptional()
    @IsString()
    	name: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	pizzas: string[]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	ingredients: string[]
}
