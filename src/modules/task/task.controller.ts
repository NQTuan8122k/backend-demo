import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/entities/task/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  get(@Param() params) {
    return this.taskService.findOne(params.id);
  }

  @Post()
  create(@Body() task: Task) {
    const {
      description = 'description',
      name = 'heheehhe',
      isDone = true,
    } = task;

    return this.taskService.create({
      ...task,
      ...(description ? { description } : {}),
      ...(name ? { name } : {}),
      ...(isDone ? { isDone } : {}),
    });
  }

  @Put()
  update(@Body() task: Task) {
    return this.taskService.update(task);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.taskService.delete(params.id);
  }
}