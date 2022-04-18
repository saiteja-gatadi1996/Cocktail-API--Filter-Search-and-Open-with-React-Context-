import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCockTail] = useState(null);

  useEffect(() => {
    const getDrink = async () => {
      try {
        setLoading(true);
        const resp = await fetch(`${url}${id}`);
        const data = await resp.json();
        const { drinks } = data;
        if (drinks) {
          //changing the api properties to already used naming conventions (just for sake)
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          // complete destructure of above lines of code into below format so that we can save easily into setCocktail (line 51)
          const singleCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCockTail(singleCocktail);
        } else {
          setCockTail([]);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getDrink();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className='section-title'>No cocktails to display</h2>;
  }
  const { name, image, info, category, glass, instructions, ingredients } =
    cocktail;
  return (
    <section className='section cocktail-section'>
      <Link to={'/'} className='btn btn-primary '>
        Back to Home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name: {name}</span>
          </p>
          <p>
            <span className='drink-data'>category: {category}</span>
          </p>
          <p>
            <span className='drink-data'>info: {info}</span>
          </p>
          <p>
            <span className='drink-data'>glass: {glass}</span>
          </p>
          <p>
            <span className='drink-data'>instructions: {instructions}</span>
          </p>
          <p>
            <span className='drink-data'>
              ingredients:{' '}
              {ingredients.map((item, index) => {
                return item ? <span key={index}>{item}</span> : null;
              })}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
