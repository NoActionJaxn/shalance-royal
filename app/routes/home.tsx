import PageContainer from "~/components/PageContainer";

export function Layout({ children }: { children: React.ReactNode }) {
  return <PageContainer>{children}</PageContainer>;
}

export default function HomeRoute() {
  return (
    <div>Welcome to the Home Page!</div>
  );
}