import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from '@nestjs/common'
import { Request } from 'express'
import { AuthGuard } from 'src/auth/auth.guard'

import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { RecipesService } from './recipes.service'

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createRecipeDto: CreateRecipeDto) {
    let user = null
    if ('user' in req) {
      user = req.user
    }
    return this.recipesService.createRecipe(createRecipeDto, user)
  }

  @Get()
  findAll() {
    return this.recipesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id)
  }
}
