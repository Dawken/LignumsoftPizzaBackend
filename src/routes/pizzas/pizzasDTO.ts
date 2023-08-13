import { IsArray, IsOptional, IsString } from 'class-validator'

interface Pizza {
    name: string
    operations: string[]
    ingredients: string[]
}

export class PizzaDTO implements Pizza {
    @IsOptional()
    @IsString()
    	name: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	operations: string[]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    	ingredients: string[]
}
