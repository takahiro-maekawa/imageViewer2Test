import '@/app/globals.css';
import Footer from '@/components/template/footer';
import Header from '@/components/template/header';
import ImageView from '@/components/template/imageView';
import SelectArea from '@/components/template/selectArea';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <div className="grid grid-cols-12">
          <div className="col-span-1"></div>
          <div className="col-span-5">
            <SelectArea />
          </div>
          <div className="col-span-5">
            <ImageView />
          </div>
          <div className="col-span-1"></div>
        </div>
        <Footer/>
      </body>
    </html>
  );
}