import db from '@/db/drizzle';
import { appUserInImage } from '@/db/schema';
import { asc } from 'drizzle-orm';

export const getData = async () => {
  const data = await db.select().from(appUserInImage).orderBy(asc(appUserInImage.id));
  return data;
};