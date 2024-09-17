'use client';
import { useFormState } from "react-dom";
import { makeFollowerWithKey } from "@/actions/account/team";
import SimpleForm from "@/components/molecule/simpleForm";
/** LearnNext.jsのサンプルを参考にコンポーネントを作成*/
export default function OnlyUserForm() {
  const initialState = { message: null, errors: {} };
  const makeFollowerWithKeyBinded = makeFollowerWithKey.bind(null);
  const [errorMessage, dispatch] = useFormState(makeFollowerWithKeyBinded, initialState);

  return (<>
    <SimpleForm
      formTitle={"招待コードをもらっている方はこちらへ"}
      bgColor={"bg-blue-500"} isActivate={true}
      formElements={[{
        elementName: "招待コード",
        elementId: "passcode",
        placeholder: "招待コードを入力",
        inputType: "text"
      }]}
      formAction={dispatch} />
  </>)
}