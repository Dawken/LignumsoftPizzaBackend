import { IsArray, IsOptional, IsString } from 'class-validator'

interface Pizza {
    pizza: string
    operation: string[]
    ingredient: string[]
}

export class PizzaDTO implements Pizza {
    @IsOptional()
    @IsString()
    	pizza: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	operation: string[]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	ingredient: string[]
}
