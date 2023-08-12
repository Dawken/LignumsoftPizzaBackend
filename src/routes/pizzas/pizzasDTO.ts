import { IsArray, IsOptional, IsString } from 'class-validator'

interface Pizza {
    pizzaName: string
    operations: string[]
    ingredients: string[]
}

export class PizzaDTO implements Pizza {
    @IsOptional()
    @IsString()
    	pizzaName: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	operations: string[]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	ingredients: string[]
}
