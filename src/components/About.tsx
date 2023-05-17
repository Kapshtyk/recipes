import React from 'react'
import cl from '../styles/About.module.css'

const About = () => {
  return (
    <div className={cl.about_container}>
      <h2 className={cl.about_title}>About this project</h2>
      <p className={cl.about_paragraph}>
        Welcome to the Broth & Ladle - Soup Recipes App! This is a React-based
        web application that allows you to browse and search a collection of
        soup recipes.
      </p>
      <h3 className={cl.about_subheading}>This project was built with:</h3>
      <ul className={cl.about_ul}>
        <li className={cl.about_li_tech}>TypeScript</li>
        <li className={cl.about_li_tech}>React & React Router</li>
        <li className={cl.about_li_tech}>CSS modules</li>
        <li className={cl.about_li_tech}>JSON server</li>
      </ul>
      <h3 className={cl.about_subheading}>
        The following photos and videos were used in the project:
      </h3>
      <ul className={cl.about_ul}>
        <li className={cl.about_li_credits}>
          Video by cottonbro studio from Pexels:{' '}
          <a href="https://www.pexels.com/video/stirring-the-boiling-broth-of-a-dish-in-a-hot-pot-3296653/">
            Link to Video
          </a>
        </li>
        <li className={cl.about_li_credits}>
          Photo by @ Nine from Pexels:{' '}
          <a href="https://www.pexels.com/lihoto/a-mouthwatering-soup-on-a-stainless-pot-5030168/">
            Link to Photo
          </a>
        </li>
        <li className={cl.about_li_credits}>
          Photo by Kaboompics.com from Pexels:{' '}
          <a href="https://www.pexels.com/lihoto/leek-and-potato-soup-5794/">
            Link to Photo
          </a>
        </li>
        <li className={cl.about_li_credits}>
          Photo by Polina Tankilevitch from Pexels:{' '}
          <a href="https://www.pexels.com/lihoto/red-soup-in-white-ceramic-bowl-8599738/">
            Link to Photo
          </a>
        </li>
        <li className={cl.about_li_credits}>
          Photo by Merve from Pexels:{' '}
          <a href="https://www.pexels.com/lihoto/tomato-soup-with-cream-14614069/">
            Link to Photo
          </a>
        </li>
        <li className={cl.about_li_credits}>
          Photo by RDNE Stock project from Pexels:{' '}
          <a href="https://www.pexels.com/lihoto/cooked-food-in-the-bowl-6646034/">
            Link to Photo
          </a>
        </li>
        <li className={cl.about_li_credits}>
          Photo by Karolina Grabowska from Pexels:{' '}
          <a href="https://www.pexels.com/lihoto/bowl-with-chicken-noodle-soup-and-parsley-4210846/">
            Link to Photo
          </a>
        </li>
        <li className={cl.about_li_credits}>
          Image by master1305 on Freepik:{' '}
          <a href="https://www.freepik.com/free-photo/cream-soup_6606910.htm#page=2&query=cream%20soup%20salmon&position=25&from_view=search&track=ais">
            Link to Image
          </a>
        </li>
        <li className={cl.about_li_credits}>
          Image by Freepik:{' '}
          <a href="https://www.freepik.com/free-photo/top-view-delicious-healthy-food_9861489.htm#query=mexican%20bean%20soup&position=1&from_view=search&track=ais">
            Link to Image
          </a>
        </li>
        <li className={cl.about_li_credits}>
          Image by KamranAydinov on Freepik:{' '}
          <a href="https://www.freepik.com/free-photo/minestrone-soup-table_6022780.htm#query=minestrone&position=0&from_view=search&track=sph">
            Link to Image
          </a>
        </li>
      </ul>
    </div>
  )
}

export default About
