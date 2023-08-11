export type eleProps = {
    id: number; 
    name: string; 
    brief: string
  }

  export type optionProps ={
    id: number;
    label: string;
    value: string | number | boolean;
  } [];

  export type menuProps ={
    id: number;
    label: string;
    link: string;
    icon?: any;
  }