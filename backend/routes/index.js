import express from "express";
import AdminsController from "../controller/admin.js";
import ProductsController from "../controller/product.js";
import CategoriesController from "../controller/category.js";
import { auth, ownerMiddleware } from "../middleware/auth.js";

const router = express.Router();

//admins
router.get("/admin", [auth], AdminsController.getAdmins);
router.post("/admin/sign-up", [auth], AdminsController.registerAdmin);
router.delete(
  "/admin/:id",
  [auth, ownerMiddleware],
  AdminsController.deleteAdmin
);
router.patch("/admin/profile", [auth], AdminsController.updateProfile);
router.get("/admin/profile", [auth], AdminsController.getProfile);
router.get(
  "/admin/:id",
  [auth, ownerMiddleware],
  AdminsController.getSingleAdmin
);
router.patch(
  "/admin/:id",
  [auth, ownerMiddleware],
  AdminsController.updateAdmin
);
router.post("/admin/sign-in", AdminsController.loginAdmin);

//products
router.get("/product", ProductsController.getProducts);
router.get("/product/:id", ProductsController.getProduct);
router.post("/product", [auth], ProductsController.createProduct);
router.patch("/product/:id", [auth], ProductsController.updateProduct);
router.delete("/product/:id", [auth], ProductsController.deleteProduct);
router.get(
  "/product/category/:category",
  ProductsController.getProductsByCategory
);

//category
router.get("/category", CategoriesController.getCategories);
router.get("/category/:id", CategoriesController.getCategoryById);
router.post("/category", [auth], CategoriesController.createCategory);
router.patch("/category/:id", [auth], CategoriesController.updateCategory);
router.delete("/category/:id", [auth], CategoriesController.deleteCategory);

export default router;
