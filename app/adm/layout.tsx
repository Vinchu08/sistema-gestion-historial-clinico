import '../ui/global.css'
import Header from '../ui/header';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Header />
      </header>
      <div className='flex-1 overflow-hidden'>
        {children}
      </div>
    </div>
  );
}