'use server';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function makeMyFirstTeam(prevState: State, formData: FormData) {
  console.log("submit makeMyFirstTeam!!!!!!!!!")
}

export async function makeFollowerWithKey(prevState: State, formData: FormData) {
  console.log("submit makeFollowerWithKey!!!!!!!!!")
}