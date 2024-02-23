export type LeftDirection = {
  id: number;
  logo: {
    path: string;
    size: number;
    type: string;
    folder: string;
    filename: string;
  };
  name: string;
  children: [
    {
      id: number;
      mainDirectionId: number;
      name: string;
      children: [
        {
          id: number;
          directionId: number;
          name: string;
        },
      ];
    },
  ];
};

export interface MainDirection {
  id: number | null;
  logo: {
    path: string | null;
    size: number | null;
    type: string | null;
    folder: string | null;
    filename: string | null;
  };
  name: string | null;
}
export interface Direction {
  id: number;
  mainDirectionId: number;
  name: string;
}
export interface SubDirection {
  id: number;
  directionId: number;
  name: string;
}
