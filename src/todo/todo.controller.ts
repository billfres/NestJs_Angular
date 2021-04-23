import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { identity } from 'rxjs';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {

    todos: Todo[];

    constructor(){
        this.todos = [];
    }
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
    getTodos(
        @Query() mesQueryParams //passer et recuperer +sieurs paramètres à l'url
    ){
        console.log(mesQueryParams);
        return this.todos;
    }

    @Get('/:id')
    getTodoById(
        @Param( 'id') id
    ){
        const todo = this.todos.find((actualTodo) =>  actualTodo.id === +id);
        if(todo){
            return todo;
        }else{
            throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
        }
        
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

    @Delete('/:id')
    deleteTodo(
        @Param('id') id
    ){
        //chercher l'objet via son id dans le tableai des todos
        const index = this.todos.findIndex((todo) => todo.id === +id);
        //Utiliser la methode splice pour supprimer le todo s'il existe
        if(index >= 0){
            this.todos.splice(index, 1);
        }else{
            throw new NotFoundException(`Le todo d'id #${id} n'existe pas`);
        }
        //sinon, on declanche une erreur
        return {
            message : `Le todo d'id #${id} a été supprimé avec succès`,
            count : 1
        };
    }

    @Put('/:id')
    modofierTodo(
        @Param('id') id,
        @Body() newTodo: Partial<Todo>
    ){
        const todo = this.getTodoById(id);
        todo.description = newTodo.description? newTodo.description : todo.description;
        todo.name = newTodo.name? newTodo.name : todo.name;
        return todo;
    }

}
