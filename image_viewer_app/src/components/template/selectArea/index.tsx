import ImageOnLabel from "@/components/molecule/imageOnLabel";
import { fileInfoType } from "@/types/fileInfoType";

interface Props {
  data: fileInfoType[]
}

export default function SelectArea({ data }: Props) {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        {data.map((e) =>
          <ImageOnLabel key={e.id} labelText={e.text} imageUrl={e.imageUrl} className="w-1/6" />)}
      </div>
    </>
  )
}