import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Categories from "@/components/Categories";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Tea & Spice Categories</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collection of premium teas and authentic spices, organized by their unique health benefits and culinary purposes.
            </p>
          </div>
          <Categories />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;