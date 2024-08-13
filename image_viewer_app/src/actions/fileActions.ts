import { fileInfoType } from "@/types/fileInfoType";

/*
        <ImageOnLabel labelText={"ラベル"} imageUrl={"https://images.ygoprodeck.com/images/cards/62089826.jpg"} className="w-1/6" />
        <ImageOnLabel labelText={"ディープオブ"} imageUrl={"https://images.ygoprodeck.com/images/cards/64202399.jpg"} className="w-1/6" />
        <ImageOnLabel labelText={"ブルーアイズ"} imageUrl={"https://images.ygoprodeck.com/images/cards/23995348.jpg"} className="w-1/6" />
        <ImageOnLabel labelText={"ff"} imageUrl={"https://images.ygoprodeck.com/images/cards/23995348A.jpg"} className="w-1/6" />
        <ImageOnLabel labelText={"QQQ"} imageUrl={"https://images.ygoprodeck.com/images/cards/23995348A.jpg"} className="w-1/6" />
        <ImageOnLabel labelText={"ブルーアイズ"} imageUrl={"https://images.ygoprodeck.com/images/cards/23995348.jpg"} className="w-1/6" />
        <ImageOnLabel labelText={"ブルーアイズ"} imageUrl={"https://images.ygoprodeck.com/images/cards/239953408.jpg"} className="w-1/6" />
*/
export const getData = async () => {
  const data = [
    { id: 1, text: "あああ", imageUrl: "https://images.ygoprodeck.com/images/cards/62089826.jpg" },
    { id: 2, text: "label2", imageUrl: "https://images.ygoprodeck.com/images/cards/23995348.jpg" }];
  return data as fileInfoType[];
}