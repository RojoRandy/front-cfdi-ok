export interface SidebarItemProps {
  icon: any;
  text: string;
  routeName: string;
  childs?: Array<ChildItem>;
}

export interface ChildItem {
  icon: any;
  text: string;
  routeName: string;
}