import { IsArray, IsOptional, IsString } from 'class-validator'

interface Ingredient {
    ingredientName: string
    operation: string
    pizzas: string[]
}

export class IngredientDTO implements Ingredient {
    @IsOptional()
    @IsString()
    	ingredientName: string

    @IsOptional()
    @IsString()
    	operation: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	pizzas: string[]
}
