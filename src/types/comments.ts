export type CommentsType = CommentType[]

export type CommentType = {
  id?: number
  authorId: number
  recipeId: number
  text: string
  authorFirstname?: string
  authorLastname?: string
  createdAt: Date
} | CommentError

export type CommentError = {
  message: string
}