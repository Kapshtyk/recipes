export type Comments = {
  comments: Comment[]
}

export type Comment = {
  id: number
  authorID: number
  recipeID: number
  text: string
}
