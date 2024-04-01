import { UsersRoute } from "@modules/users";
import { App } from "./app";
import { IndexRoute } from "./modules/index";
import AuthRoute from "@modules/auth/auth.route";
import ProductsRoute from "@modules/products/products.route";
import ProductFilesRoute from "@modules/products/product_files/products.files.route";
import ProductPricesRoute from "@modules/products/product_prices/products.prices.route";
import ProductReviewsRoute from "@modules/products/product_reviews/products.reviews.route";
import CategoriesRoute from "@modules/categories/categories.route";
import UploadRoute from "@modules/upload/upload.route";
import CustomersRoute from "@modules/customers/customers.route";
import OrdersRoute from "@modules/orders/orders.route";
import OrderItemsRoute from "@modules/orders/order_items/order.items.route";

const routes = [
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new ProductsRoute(),
    new ProductFilesRoute(),
    new ProductPricesRoute(),
    new ProductReviewsRoute(),
    new CategoriesRoute(),
    new UploadRoute(),
    new CustomersRoute(),
    new OrdersRoute(),
    new OrderItemsRoute()
];
const app = new App(routes);

app.listen();