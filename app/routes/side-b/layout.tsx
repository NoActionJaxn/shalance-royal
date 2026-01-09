import { Outlet } from "react-router";
import PageContainer from "~/components/PageContainer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
}

export default function Root() {
  return;
}
