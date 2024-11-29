export type NavigationMenu = {
  name: string;
  icon?: React.ReactNode;
  imagePath?: string;
  href: string;
};

export type ApiResponse = {
  response?: any;
  success?: boolean;
  message?: string;
};
