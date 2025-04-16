import { ReactNode } from "react";

export interface MainContentProps {
  children?: ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <main className="p-4 flex-grow overflow-y-auto">{children}</main>;
};
