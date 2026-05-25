import Header from './Header';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-(--bg-gradient) text-(--text-color) flex flex-col items-center">
      <Header />

      <main className="flex flex-col items-center w-full flex-1 pt-5">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
