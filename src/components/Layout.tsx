import BottomNav from './BottomNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col" style={{ minHeight: '100svh' }}>
      <div className="flex-1 overflow-y-auto pb-20">{children}</div>
      <BottomNav />
    </div>
  );
}
