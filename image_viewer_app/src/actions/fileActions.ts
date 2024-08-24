import { fileInfoType } from "@/types/fileInfoType";

export const getData = async () => {
  const data = [
    { id: 1, text: "label1", imageUrl: "https://images.ygoprodeck.com/images/cards/62089826.jpg" },
    { id: 2, text: "label2", imageUrl: "https://images.ygoprodeck.com/images/cards/23995348.jpg" },
    { id: 3, text: "label1", imageUrl: "https://images.ygoprodeck.com/images/cards/73356503.jpg" },
    { id: 4, text: "label1", imageUrl: "https://images.ygoprodeck.com/images/cards/572850.jpg" },
    { id: 5, text: "label1", imageUrl: "https://images.ygoprodeck.com/images/cards/14536035.jpg" },
    { id: 6, text: "label1", imageUrl: "https://images.ygoprodeck.com/images/cards/65734501.jpg" }];

  await new Promise(resolve => setTimeout(resolve, 1000));
  return data as fileInfoType[];
}