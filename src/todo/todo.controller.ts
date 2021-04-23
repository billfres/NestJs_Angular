import { Body, Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {

    todos: Todo[];

    constructor(){
        this.todos = [];
    }
   /* @Get()
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
    getTodos(
    ){
        return this.todos;
    }

    @Get('/:id')
    getTodoById(
    ){
        console.log('Get to by id');
        return 'GET TODO BY ID';
    }
    

    @Post()
    addTodo(
        @Body() newTodo: Todo
    ){
        if(this.todos.length){
            newTodo.id = this.todos[this.todos.length -1].id +1;
        }else{
            newTodo.id = 1;
        }
        this.todos.push(newTodo);
        return newTodo;
    }

    @Delete()
    deleteTodo(){
        console.log('Supprimer un doto de la liste des todos');
        return 'deleled TODO';
    }

    @Put()
    modofierTodo(){
        console.log('Modifier la liste des todos');
        return 'TODO modifier';
    }

}
