export type TLatlng = {
  lat: number;
  lng: number;
};

export type TPaths = {
  lat: number;
  lng: number;
}[];

export type TFence = {
  name: string;
  paths: TPaths;
  createAt: number;
  lineColor: string;
  fillColor: string;
};

export type TFences = Map<string, TFence>;
