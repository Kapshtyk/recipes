export type CommentsType = {
  comments: CommentType[]
}

export type CommentType = {
  id?: number
  authorId: number
  recipeId: number
  text: string
  authorFirstname?: string
  authorLastname?: string
  createdAt: Date
}
