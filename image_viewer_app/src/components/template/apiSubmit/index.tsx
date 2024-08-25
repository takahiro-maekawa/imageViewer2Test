
import ApiForm from "@/components/organism/apiForm";
interface Props {
  setApiKeyEncripted;
  fetchAndSetData;
}

export default function ApiSubmit({ setApiKeyEncripted, fetchAndSetData }: Props) {
  return (
    <div className="flex flex-wrap justify-center">
      <ApiForm setApiKeyEncripted={setApiKeyEncripted} fetchAndSetData={fetchAndSetData} />
    </div>
  )
}