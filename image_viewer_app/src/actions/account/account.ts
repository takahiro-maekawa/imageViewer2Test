import db from '@/db/drizzle';
import { appUserInImage } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

/**
 * ユーザー情報全てを取得する
 * @returns data ユーザー情報全て
 */
export const getData = async () => {
  const data = await db.select().from(appUserInImage).orderBy(asc(appUserInImage.id));
  return data;
};

/** 
 * emailアドレスを条件として, ユーザー情報を取得する
 * 対象となるユーザーが存在しない場合はnullを返す 
 * @param email メールアドレス
 * 
 */
export const findByEmail = async (email: string) => {
  try {
    const data = await db.select().from(appUserInImage).where(eq(appUserInImage.email, email));
    return data;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return [];
  }
}