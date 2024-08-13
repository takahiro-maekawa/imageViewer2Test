import ImageCell from "@/components/organism/ImageCell";
import { fileInfoType } from "@/types/fileInfoType";

interface Props {
  data: fileInfoType[],
  setTargetData: (data: fileInfoType) => void
}

export default function SelectArea({ data, setTargetData }: Props) {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        {data.map((e) =>
          <ImageCell key={e.id} data={e} setTargetData={setTargetData} />)}
      </div>
    </>
  )
}