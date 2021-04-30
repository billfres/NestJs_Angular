import { IsNumber, IsOptional } from "class-validator";

export class GetPaginatedTodoDto{

    @IsNumber()
    @IsOptional()
    page: number;

    @IsNumber()
    @IsOptional()
    item: number;
}