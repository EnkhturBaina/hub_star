export interface CustomerType {
  //   message: string;
  //   response: [
  //     {
  //       id: number;
  //       logo: {
  //         path: string;
  //         size: number;
  //         type: string;
  //         folder: string;
  //         filename: string;
  //       };
  //       name: string;
  //       isSpecial: string;
  //     },
  //   ];
  //   statusCode: string;
  id: number;
  logo: {
    path: string;
    size: number;
    type: string;
    folder: string;
    filename: string;
  };
  name: string;
  isSpecial: string;
}
