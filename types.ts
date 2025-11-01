export type Language = 'english' | 'kannada';

export interface Crop {
  id: number;
  image: string;
  name: {
    [key in Language]: string;
  };
  description: {
    [key in Language]: string;
  };
  detailedDescription: {
    [key in Language]: string;
  };
}

export interface Message {
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}
