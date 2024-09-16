// 許可されたクラスのリストを定義
type BgColor = "bg-red-500" | "bg-blue-500" | "bg-green-500" | "bg-yellow-500" | "bg-purple-500" | "bg-pink-500" |
  "bg-indigo-500" | "bg-gray-500" | "bg-black" | "bg-white" | "bg-transparent";

interface Props {
  bgColor?: BgColor
  isActivate?: boolean,
  buttonComponent?: ({ isActivate }: { isActivate?: any; }) => React.ReactNode
}

const defaultButtonComponent = ({ isActivate }): React.ReactNode => {
  return (<button disabled={!isActivate}>送信</button>)
};

const SimpleForm = ({ bgColor = "bg-blue-500", isActivate = true,
  buttonComponent = defaultButtonComponent }: Props) => {

  return (
    <div className="px-3 py-4">
      <form className={`${bgColor} rounded-xl`}>
        <div className="flex items-center space-x-2 px-2 py-2">
          <div className="flex-grow-0 w-1/5">
            <span>パスコード</span>
          </div>
          <div className="flex-grow-0 w-3/5">
            <input
              id="teamName"
              name="teamName"
              placeholder="チーム名を入力してください"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 text-black"
              aria-describedby="teamName-error"
              disabled={!isActivate}
            />
          </div>
          <div className="flex-grow-0 w-1/5">
          </div>
        </div>
        <div className="flex items-center justify-center py-3">
          {buttonComponent({ isActivate })}
        </div>
      </form>
    </div>)
}

export default SimpleForm;