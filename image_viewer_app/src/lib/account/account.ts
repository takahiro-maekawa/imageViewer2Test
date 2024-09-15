import { findByEmail } from '@/actions/account/account';

/** メールアドレスを条件として、本サービスに登録しているのかどうかをチェックする */
const checkAuthorizedByUserEmail = async (email?: string) => {
  if (email == null) { return false }
  const data = await findByEmail(email);
  if (data.length > 0) {
    return true;
  }
  return false;
}

export { checkAuthorizedByUserEmail };