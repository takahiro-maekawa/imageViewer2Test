import { getData } from '@/actions/fileActions';
import '@/app/globals.css';
import Footer from '@/components/template/footer';
import Header from '@/components/template/header';
import ImageView from '@/components/template/imageView';
import SelectArea from '@/components/template/selectArea';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const data = await getData();
  console.log(data);

  return (
    <html lang="ja" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <div className="grid grid-cols-12">
          <div className="col-span-1"></div>
          <div className="col-span-5">
            <SelectArea data={data} />
          </div>
          <div className="col-span-5">
            <ImageView data={data} />
          </div>
          <div className="col-span-1"></div>
        </div>
        <Footer />
      </body>
    </html>
  );
}