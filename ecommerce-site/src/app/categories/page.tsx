import Footer from "../components/shared/footer";
import Header from "../components/shared/header";

export default function Page(){
    return(
        <>
            <div className="bg-white">
                <Header />
                <main className="my-8">
                <div className="container mx-auto px-6">
                    <h1>Categories</h1>
                </div>
                </main>
                <Footer />
            </div>
        </>
    )
}