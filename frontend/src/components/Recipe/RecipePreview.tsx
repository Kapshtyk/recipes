import React from 'react'

import { IRecipe } from '../../models/IRecipe'
import { Button } from '../../ui/Button'
import Icons from '../../ui/icons'
import { getCountryCode } from '../../utils/CountryCode'
import styles from './RecipePreview.module.css'
import { BASE_URL } from '../../utils/constants'
import { Link } from 'react-router-dom'

export const RecipePreview: React.FC<IRecipe> = ({
  title,
  origin,
  instructions,
  ingredients,
  image,
  description,
  author,
  _id
}) => {
  const countryCode = getCountryCode(origin)

  return (
    <Link to={`/recipes/${_id}`} className={styles.recipe_link}>
      <div className={styles.recipe_container}>
        <div className={styles.recipe_image_container}>
          <img className={styles.recipe_image} src={`${BASE_URL}${image}`} alt={title} />
          <div className={styles.recipe_flag_container}>
            <img
              className={styles.recipe_flag}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
              alt={origin}
            />
            <div className={styles.recipe_flag_description}>
              <p>{origin}</p>
            </div>
          </div>
        </div>
        <div className={styles.recipe_header}>
          <h1>{title}</h1>
        </div>
        <div className={styles.recipe_description}>
          <p>{description}</p>
        </div>
        <div className={styles.recipe_author}>
          <Icons.UserIcon />
          {author.username}
        </div>
        <Button label="Add to cart">
          <Icons.PlusIcon />
        </Button>
        <Button label="Remove" styles={{ button: styles.recipe_button_done }}>
          <Icons.DoneIcon />
        </Button>
      </div>
    </Link>
  )
}
