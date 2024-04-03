import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import classes from './meals.module.css'

export default function MealItem({title, slug, creator, image, summary}) {
  return (
    <article className={classes.meal}>
        <header>
            <div className={classes.image}>
            <Image src={`https://food-lovers-bucket.s3.amazonaws.com/${image}`} alt={title} fill />
            </div>
            <div className={classes.headerText}>
                <h2>{title}</h2>
                <p>by {creator}</p>
            </div>
        </header>
        <div className={classes.content}>
            <p className={classes.summary}>{summary}</p>
            <div className={classes.actions}>
                <Link href={`/meals/${slug}`}> View Details</Link>
            </div>
        </div>
    </article>
  )
}
