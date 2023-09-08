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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Request } from 'express'
import { AuthGuard } from 'src/auth/auth.guard'
import { UserDocument } from 'src/users/schemas/users.schema'

import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { RecipesService } from './recipes.service'
import { Recipe } from './schemas/recipe.schema'

interface IRequestWithUser extends Request {
  user?: UserDocument
}

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create recipe' })
  @ApiCreatedResponse({
    description: 'The recipe has been successfully created.',
    //TODO: fix it
    type: Recipe
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  create(
    @Req() req: IRequestWithUser,
    @Body() createRecipeDto: CreateRecipeDto
  ) {
    return this.recipesService.createRecipe(createRecipeDto, req.user)
  }

  @Get()
  @ApiOperation({ summary: 'Get all recipes' })
  //TODO: fix it
  @ApiOkResponse({ type: [Recipe], description: 'Success' })
  findAll() {
    return this.recipesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one recipe by id' })
  @ApiOkResponse({ type: Recipe, description: 'Success' })
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update recipe by id' })
  @Patch(':id')
  @ApiOkResponse({ type: Recipe, description: 'Success' })
  update(
    @Req() req: IRequestWithUser,
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return this.recipesService.updateRecipe(id, updateRecipeDto, req.user)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete recipe by id' })
  @ApiOkResponse({ type: Recipe, description: 'Success' })
  @Delete(':id')
  remove(@Req() req: IRequestWithUser, @Param('id') id: string) {
    return this.recipesService.removeRecipe(id, req.user)
  }
}
