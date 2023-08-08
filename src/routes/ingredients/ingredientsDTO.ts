import { IsArray, IsOptional, IsString } from 'class-validator'

interface Ingredient {
    ingredient: string
    operation: string
    pizza: string[]
}

export class IngredientDTO implements Ingredient {
    @IsOptional()
    @IsString()
    	ingredient: string

    @IsOptional()
    @IsString()
    	operation: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	pizza: string[]
}
