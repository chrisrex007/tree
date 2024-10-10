export interface Godown {
  id?: string;
  name: string;
  parent_godown?: string | null;
}

export interface ClothingAttributes {
  size?: string;
  material?: string;
  color?: string;
}
export interface ToysAttributes {
  age_range?: string;
  material?: string;
  battery_required?: boolean;
}
export interface ElectronicsAttributes {
  wattage?: number;
  voltage?: number;
  color?: string;
}
export interface ToolsAttributes {
  type?: string;
  material?: string;
  warranty_years?: number;
}
export interface FurnitureAttributes {
  dimension?: string;
  material?: string;
  color?: string;
}

export type ItemAttributes =
  | ClothingAttributes
  | ToysAttributes
  | ElectronicsAttributes
  | ToolsAttributes
  | FurnitureAttributes;

export interface Item {
  item_id?: string;
  name?: string;
  quantity?: number;
  category?: string;
  price?: number;
  status?: string;
  godown_id?: string;
  brand?: string;
  attributes?: ItemAttributes;
  image_url?: string;
}

export interface totalObject {
  items: Array<Item>;
  godowns: Array<Godown>;
}
