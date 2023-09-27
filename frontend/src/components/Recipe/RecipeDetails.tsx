import React from 'react'
import { useGetRecipeByIdQuery } from '../../app/services/recipes'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'
import styles from './RecipeDetails.module.css'
import { Comments } from '../Comments'

export const RecipeDetails = () => {
  const recipe_id = useParams<{ id: string }>().id
  const { data, error, isLoading } = useGetRecipeByIdQuery(recipe_id as string, { skip: !recipe_id })

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>error</div>

  return (
    data && (
      <div className={styles.container}>
        <img className={styles.image} src={`${BASE_URL}${data.image}`} alt={data.title} />
        <div className={styles.data_container}>
          <h1>{data.title} from {data.origin}</h1>
          <div className={styles.description_container}>
            <q>{data.description}</q> - <span className={styles.author}>{data.author.username}</span>
          </div>
          <h2 className={styles.instructions}>Instructions</h2>
          <p>{data.instructions}</p>
          <details>
            <summary className={styles.summary}>Ingredients</summary>
            <ul className={styles.ingredients_container}>
              {data.ingredients.map((ingredient, index) => (
                <li className={styles.ingredients_items} key={index}>{ingredient.ingredient.name} - <span className={styles.ingredients_units}>{ingredient.quantity} {ingredient.ingredient.units}</span> </li>
              ))}
            </ul>
          </details>
          <Comments />
        </div>
      </div >
    )

  )
}