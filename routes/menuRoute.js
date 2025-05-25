import express from "express";
import menuController from "../controllers/menuController.js";

const router = express.Router();

router.get("/", menuController.getMenu);
router.post("/", menuController.createMenu);
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

export default router;
