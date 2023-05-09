export type CommentsType = {
  comments: CommentType[]
}

export type CommentType = {
  id: number
  authorID: number
  recipeID: number
  text: string
}
