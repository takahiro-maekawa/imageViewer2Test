interface Props {
  text: string
}

export default function TextLabel({ text }: Props) {
  const className = "bg-yellow-500 text-white px-5 py-1 hover:bg-red-600 cursor-pointer";
  return (
    <>
      <div className="flex justify-center">
        <span className={className}>{text}</span>
      </div>
    </>
  )
}