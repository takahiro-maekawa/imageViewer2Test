interface Props {
  // クリックする時のイベント
  onClick?;
}

export default function ColoredLabelButton({ onClick }: Props) {
  return <button className="bg-red-600"> クリック</button >
}