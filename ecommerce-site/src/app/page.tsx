import Header from "./components/shared/header";
import CategoryBanner from "./components/shared/category-banner";
import ListProduct from "./components/shared/list-product";
import Footer from "./components/shared/footer";

export default function Home() {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
      <div className="bg-white">
        <Header />
        <main className="my-8">
          <div className="container mx-auto px-6">
            <CategoryBanner />
            <ListProduct />
            <ListProduct />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
