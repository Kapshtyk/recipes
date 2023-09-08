import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'

import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { IngredientsService } from './ingredients.service'

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create ingredient' })
  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.createIngredient(createIngredientDto)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Search ingredients by query' })
  @Get('search')
  findAllByQuery(@Query('query') query: string) {
    return this.ingredientsService.findIngredientsByQuery(query)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all ingredients' })
  @Get()
  findAll() {
    return this.ingredientsService.getAllIngredients()
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get one ingredient by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientsService.getOneIngredient(id)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update ingredient by id' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto
  ) {
    return this.ingredientsService.updateIngredient(id, updateIngredientDto)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete ingredient by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientsService.removeIngredient(id)
  }
}
