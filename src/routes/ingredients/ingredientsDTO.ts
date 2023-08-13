import { IsArray, IsOptional, IsString } from 'class-validator'

interface Ingredient {
    name: string
    operation: string
    pizzas: string[]
}

export class IngredientDTO implements Ingredient {
    @IsOptional()
    @IsString()
    	name: string

    @IsOptional()
    @IsString()
    	operation: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	pizzas: string[]
}
