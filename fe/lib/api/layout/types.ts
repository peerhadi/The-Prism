export type LayoutComponent<T = unknown> = {
  id?: string;
  type: string;
  position: string;
  config: T;
  order?: number;
};

export type LayoutResponse = {
  components: LayoutComponent[];
};
