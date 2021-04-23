import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('todo')
export class TodoController {

    @Get()
    getTodo(){
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
