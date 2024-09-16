'use client'

import { makeMyFirstTeam } from "@/actions/account/team";
import SimpleForm from "@/components/molecule/simpleForm";
import { useFormState } from "react-dom";

/** ボタンオブジェクトを用意 */
const buttonComponent = ({ isActivate }): React.ReactNode => {
  return (<button disabled={!isActivate}>SUBMIT</button>)
};

/** 正直ただのボタンオブジェクトでもいい気がする */
const buttonComponent2 = (): React.ReactNode => {
  return (<button>SUBMIT</button>)
};

export default function NewTeamAndUserForm() {
  const initialState = { message: null, errors: {} };
  const makeMyFirstTeamBinded = makeMyFirstTeam.bind(null);
  const [errorMessage, dispatch] = useFormState(makeMyFirstTeamBinded, initialState);
  return (<>
    <SimpleForm bgColor={"bg-green-500"} isActivate={false} buttonComponent={buttonComponent2} />
  </>)
}