import express from "express";
import AdminsController from "../controller/admin.js";
import ProductsController from "../controller/product.js";
import CategoriesController from "../controller/category.js";
import { auth, ownerMiddleware } from "../middleware/auth.js";

const router = express.Router();

//admins
router.get("/admin", AdminsController.getAdmins);
router.post("/admin/sign-up", AdminsController.registerAdmin);
router.delete("/admin/:id",[auth, ownerMiddleware], AdminsController.deleteAdmin);
router.patch("/admin/profile", [auth], AdminsController.updateProfile);
router.get("/admin/profile", [auth], AdminsController.getProfile);
router.get("/admin/:id", AdminsController.getSingleAdmin);
router.patch("/admin/:id",[auth, ownerMiddleware], AdminsController.updateAdmin);
router.post("/admin/sign-in", AdminsController.loginAdmin);

//products
router.get("/products", ProductsController.getProducts);
router.get("/products/category/:id", ProductsController.getProductsByCategory);
router.get("/product/:id", ProductsController.getProduct);
router.post("/product", [auth], ProductsController.createProduct);
router.patch("/product/:id", [auth], ProductsController.updateProduct);
router.delete("/product/:id", [auth], ProductsController.deleteProduct);

//category
router.get("/category", CategoriesController.getCategories);
router.post("/category", [auth], CategoriesController.createCategory);
router.patch("/category/:id", [auth], CategoriesController.updateCategory);
router.delete("/category/:id", [auth], CategoriesController.deleteCategory);

export default router;
