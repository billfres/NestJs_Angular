import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
    
    todos: Todo[] = [];

    getTodos(): Todo[]{
        
        return this.todos;
    }

    addTodo( newTodo: AddTodoDto): Todo {
        const { name, description} = newTodo;
        let id;
        if(this.todos.length){
            id = this.todos[this.todos.length -1].id +1;
        }else{
            id = 1;
        }

        const todo =  {
            id,
            name,
            description,
            createdAt: new Date()
        };
        this.todos.push(todo);
        return todo;
    }
    
    getTodoById(id: number): Todo{
        const todo = this.todos.find((actualTodo) =>  actualTodo.id === id);
        if(todo){
            return todo;
        }else{
            throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
        }
    }

    deleteTodo(id: number){
         //chercher l'objet via son id dans le tableai des todos
         const index = this.todos.findIndex((todo) => todo.id === id);
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

    updateTodo(id:number, newTodo: Partial<Todo>){
        const todo = this.getTodoById(id);
        todo.description = newTodo.description? newTodo.description : todo.description;
        todo.name = newTodo.name? newTodo.name : todo.name;
        return todo;
    }
}
