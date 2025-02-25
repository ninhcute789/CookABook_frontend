import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to CookABook</h1>
          <p className="text-xl text-gray-600">Discover and share amazing recipes</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Browse Recipes</h2>
            <p>Explore our collection of delicious recipes</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Share Your Recipes</h2>
            <p>Join our community and share your favorite dishes</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Get Inspired</h2>
            <p>Find cooking inspiration for your next meal</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
