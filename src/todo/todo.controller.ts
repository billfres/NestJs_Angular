import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { identity } from 'rxjs';
import { DurationInterceptor } from 'src/interceptors/duration.interceptor';
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion.pipe';
import { AddTodoDto } from './dto/add-todo.dto';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

//@UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {

    constructor(
        private todoService: TodoService
    ){}
   /*
   ``
    @Get()
    getTodosv1(
        @Req() request: Request,
        @Req() response: Response
    ){
        console.log('Liste des todos');
        console.log('-------Responve------');
        console.log(response);
        return 'Tous nos todos';
    }*/

    @Get()
    getTodos (
        @Query() mesQueryParams: GetPaginatedTodoDto //passer et recuperer +sieurs paramètres à l'url
    ): Todo[] {
        //console.log(mesQueryParams instanceof GetPaginatedTodoDto);
        return this.todoService.getTodos();
    }

    @Get('/:id')
    getTodoById(
        @Param( 'id', new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.NOT_FOUND
        })) id
    ){
        return this.todoService.getTodoById(id);
        
    }
    

    @Post()
    addTodo(
        @Body() newTodo: AddTodoDto
    ): Todo {
        console.log(newTodo);
        return this.todoService.addTodo(newTodo);
    }

    @Delete('/:id')
    deleteTodo(
        @Param('id', ParseIntPipe) id
    ){
       return this.todoService.deleteTodo(id);
    }

    @Put('/:id')
    modifierTodo(
        @Param('id',ParseIntPipe) id,
        @Body() newTodo: Partial<AddTodoDto>
    ){
       return this.todoService.updateTodo(+id, newTodo);
    }

    @Post('pipe')
    testPipe(
        @Param( 'data', UpperAndFusionPipe) paramData,
        //@Body(UpperAndFusionPipe) data
        @Body() data
    ){
        return data;
    }

}
