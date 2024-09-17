// 許可されたクラスのリストを定義
type BgColor = "bg-red-500" | "bg-blue-500" | "bg-green-500" | "bg-yellow-500" | "bg-purple-500" | "bg-pink-500" |
  "bg-indigo-500" | "bg-gray-500" | "bg-black" | "bg-white" | "bg-transparent";

export type FormElement = {
  elementName: string,
  elementId: string,
  placeholder?: string,
  inputType?: string
}

interface Props {
  formTitle?: string,
  bgColor?: BgColor
  isActivate?: boolean,
  buttonComponent?: ({ isActivate }: { isActivate?: any; }) => React.ReactNode
  formElements?: FormElement[],
  formAction: () => void
}

const defaultButtonComponent = ({ isActivate }): React.ReactNode => {
  return (<button disabled={!isActivate}>送信</button>)
};

const SimpleForm = ({ formTitle = "入力フォーム", bgColor = "bg-blue-500", isActivate = true,
  buttonComponent = defaultButtonComponent, formElements, formAction }: Props) => {

  return (
    <div className="px-3 py-4">
      <form className={`${bgColor} rounded-xl`} action={formAction}>
        <div className="flex items-center space-x-2 px-2 py-2 justify-center"><span>{formTitle}</span></div>
        {formElements?.map((element, index) => {
          return (
            <div className="flex items-center space-x-2 px-2 py-2" key={element.elementId} >
              <div className="flex-grow-0 w-1/5">
                <span>{element.elementName}</span>
              </div>
              <div className="flex-grow-0 w-3/5">
                <input
                  id={element.elementId}
                  name={element.elementId}
                  placeholder={element.placeholder}
                  type={element.inputType}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 text-black"
                  aria-describedby={`${element.elementId}-error`}
                  disabled={!isActivate}
                />
              </div>
              <div className="flex-grow-0 w-1/5">
              </div>
            </div>
          )
        })}
        <div className="flex items-center justify-center py-3">
          {buttonComponent({ isActivate })}
        </div>
      </form>
    </div>)
}

export default SimpleForm;