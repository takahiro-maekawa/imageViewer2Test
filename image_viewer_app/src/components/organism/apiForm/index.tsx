import InputAndPush from "@/components/molecule/inputAndPush";
interface Props {
  setApiKeyEncripted;
  fetchAndSetData;
}

export default function ApiForm({ setApiKeyEncripted, fetchAndSetData }: Props) {
  const handleClick = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const apiKey = formData.get('apiKey') as string;
    setApiKeyEncripted(apiKey);
    fetchAndSetData();
  }

  return (
    <form onSubmit={handleClick}>
      <InputAndPush />
    </form>
  )
}