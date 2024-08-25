import ColoredLabelButton from "@/components/atom/coloredLabelButton";
import PasswordInput from "@/components/atom/passwordInput";
interface Props {
  // クリックする時のイベント
  clickEvent?;
}

export default function InputAndPush({ clickEvent }: Props) {
  return (
    <div className="flex flex-wrap justify-center">
      <PasswordInput />
      <ColoredLabelButton onClick={clickEvent} />
    </div>)
}