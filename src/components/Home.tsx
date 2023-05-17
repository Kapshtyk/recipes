import React from 'react'
import cl from '../styles/Home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className={cl.home_hero_container}>
        <div>
          <video
            className={cl.home_hero_video}
            src="/good-soup.mp4"
            autoPlay
            muted
            loop
          ></video>
        </div>
        <div className={cl.home_hero_text}>
          <p>
            Discover a world of delicious flavours and nutritious soups with our
            app.
          </p>
          <p>
            Whether you are a soup lover or a culinary adventurer,
            <span className={cl.home_hero_accent}> Broth &amp; Ladle</span> will
            satisfy your cravings and brighten your soup cooking experience.
          </p>
          <p>
            Explore our extensive collection of handcrafted soup recipes from
            around the world, each carefully selected to bring warmth and
            comfort to your table.
          </p>
          <p>
            <span className={cl.home_hero_accent}> Broth &amp; Ladle</span>{' '}
            makes it easy to share your favourite soup recipes and discover new
            ones to expand your culinary horizons.
          </p>

          <p>
            Get ready for a tasteful journey that will leave you wanting more.
          </p>
        </div>
        <div className={cl.home_hero_overlay}></div>
      </div>
      <div className={cl.home_cards_container}>
        <Link to="/recipes">
          <div className={cl.home_card}>
            <h2 className={cl.home_card_header}>Find soup</h2>
            <p className={cl.home_card_body}>
              Here you can browse through our collection of recipes and find
              your favourite recipes by name, by ingredient or by country of
              origin.
            </p>
          </div>
        </Link>
        <Link to="/add-recipe">
          <div className={cl.home_card}>
            <h2 className={cl.home_card_header}>Add recipes</h2>
            <p className={cl.home_card_body}>
              Here you can add your own recipe to our recipe base so that lots
              of people can enjoy it.
            </p>
          </div>
        </Link>
        <Link to="/about">
          <div className={cl.home_card}>
            <h2 className={cl.home_card_header}>More information</h2>
            <p className={cl.home_card_body}>
              You can find out more about the project by clicking here.
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Home
