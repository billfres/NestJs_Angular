import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {

    @Get()
    getTodosv1(
        @Req() request: Request,
        @Req() response: Response
    ){
        console.log('Liste des todos');
        console.log('-------Responve------');
        console.log(response);
        return 'Tous nos todos';
    }

    @Get()
    getTodos(
    ){
        console.log('Liste des todos');
        return 'Tous nos todos';
    }

    @Post()
    addTodo(){
        console.log('ajouter un doto à la liste des todos');
        return 'add TODO ok';
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
