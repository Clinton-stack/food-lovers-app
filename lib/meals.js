import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs'
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: 'us-east-1'
});

const db = sql('meals.db');

export async function getAllMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
}
export function getMealBySlug(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;
    const bufferedImage = await meal.image.arrayBuffer();

    s3.putObject({
        Bucket: 'food-lovers-bucket',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
      });
    meal.image = fileName;
    db.prepare('INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .run(meal.slug, meal.title, meal.image, meal.summary, meal.instructions, meal.creator, meal.creator_email);

}