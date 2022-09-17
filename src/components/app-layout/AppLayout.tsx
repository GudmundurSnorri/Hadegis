import { useSession } from "next-auth/react";
import Header from "../header/Header";

const AppLayout = ({children}: {children: React.ReactNode}) => {
  const session = useSession();
  return (
    <>
      <Header user={session.data?.user?.name} />
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
          {children}
      </main>
    </>
  );
};

export default AppLayout;