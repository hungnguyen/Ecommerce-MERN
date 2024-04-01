import { getProducts } from "@/services/product"
import ProductItem from "./product-item";

export default async function ListProduct(){
    const data = await getProducts();
    
    return(
        <div className="mt-16">
                <h3 className="text-gray-600 text-2xl font-medium">Fashions</h3>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    {data && data.slice(0,4).map((product)=>(
                        <ProductItem product={product} key={product._id}/>
                    ))}
                    
                </div>
            </div>
    )
}