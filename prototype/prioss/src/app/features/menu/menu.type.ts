
export type MenuItem = {
  icon: string;
  name: string;
  link?: string;
  children?: SubMenuItem[];
};

export type SubMenuItem = {
  name: string;
  link: string;
  fragment: string;
};
