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
  console.log("submit makeMyFirstTeam!!!!!!!!!");
  console.log(formData.get("teamName"));

  try {
    // postリクエストを送る
    const response = await fetch("http://examples.com", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response.body)

  } catch (error) {
    console.error("Fetch error:", error);
    // 失敗した場合の別のレスポンスを返す
    return { error: "Failed to submit the form. Please try again later." };
  }
}

export async function makeFollowerWithKey(prevState: State, formData: FormData) {
  console.log(formData.get("passcode"));
  console.log("submit PASSCODE!!!!!!!!!");

  try {
    // postリクエストを送る
    const response = await fetch("http://localhost:8080", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // JSONデータを取得
    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.error("Fetch error:", error);
    // 失敗した場合の別のレスポンスを返す
    return { error: "Failed to submit the form. Please try again later." };
  }
}