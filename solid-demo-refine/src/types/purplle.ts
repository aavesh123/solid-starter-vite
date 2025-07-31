export interface CategoryMenu {
  status: string;
  menus: Menu[];
  x_id: string;
}

export interface Menu {
  id: string;
  parent_id: string;
  name: string;
  description: string;
  url: string;
  is_active: string;
  order_seq: string;
  image: string;
  mobile_image: string;
  block: string;
  font_color: string;
  font_weight: string;
  bg_color: string;
  for_desktop: any;
  desktop_url: string;
  deeplink: string;
  child: Child[];
}

export interface Child {
  id: string;
  parent_id: string;
  name: string;
  description: string;
  url: string;
  is_active: string;
  order_seq: string;
  image: string;
  mobile_image: string;
  block: string;
  font_color: string;
  font_weight: string;
  bg_color: string;
  for_desktop?: string;
  desktop_url: string;
  deeplink: string;
  child: Child2[];
}

export interface Child2 {
  id: string;
  parent_id: string;
  name: string;
  description: string;
  url: string;
  is_active: string;
  order_seq: string;
  image: string;
  mobile_image: string;
  block: string;
  font_color: string;
  font_weight: string;
  bg_color: string;
  for_desktop: string;
  desktop_url: string;
  deeplink: string;
  child: any[];
}

// Transformed category interface for our component
export interface TransformedCategory {
  id: string;
  title: string;
  image: string;
  gradient: string;
  isExpanded: boolean;
  description?: string;
  url?: string;
  is_active?: string;
  order_seq?: string;
  mobile_image?: string;
  block?: string;
  font_color?: string;
  font_weight?: string;
  bg_color?: string;
  desktop_url?: string;
  deeplink?: string;
  child?: Child[];
} 