import path from "path";
import fs from "fs";
import { error } from "console";

let menus = JSON.parse(fs.readFileSync(path.resolve("./menu.json"), "utf-8"));
// console.log(menus)

export default class menuController {
  static getMenuId() {
    if (menus.length === 0) return 1;
    return menus[menus.length - 1].id + 1;
  }

  static getMenu(req, res) {
    return res.json(menus);
  }

  static createMenu(req, res) {
    const { name, description, price, type } = req.body;
    // if (!name) {

    // }

    if (typeof name !== "string") {
      return res.status(400).json({ error: "Menu name must be string" });
    }
    if (!name.trim()) {
      return res.status(400).json({ error: "Please fill the name" });
    }

    if (typeof description !== "string") {
      return res.status(400).json({ error: "Menu description must be string" });
    }
    if (!description.trim()) {
      return res.status(400).json({ error: "Please fill the description" });
    }

    if (typeof price !== "number") {
      return res.status(400).json({ error: "Price must be number" });
    }

    const validTypes = ["Lunch set", "Drink", "Dessert"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Type must be one of Lunch set, Drink, Dessert" });
    }

    const newId = menuController.getMenuId();
    const newMenu = Object.assign({ id: newId }, req.body);
    menus.push(newMenu);

    fs.writeFile("./menu.json", JSON.stringify(menus), (err, data) => {
      if (err) return res.json(err);
      return res.json({ Message: "Create Succesfully" });
    });
  }

  static updateMenu(req, res) {
    const menuId = parseInt(req.params.id);
    const { name, description, price, type } = req.body;

    const menuIndex = menus.findIndex((menu) => menu.id === menuId);
    if (menuIndex === -1) {
      return res.status(404).json({ error: "Menu not found" });
    }

    if (typeof name !== "string") {
      return res.status(400).json({ error: "Menu name must be string" });
    }
    if (!name.trim()) {
      return res.status(400).json({ error: "Please fill the name" });
    }

    if (typeof description !== "string") {
      return res.status(400).json({ error: "Menu description must be string" });
    }
    if (!description.trim()) {
      return res.status(400).json({ error: "Please fill the description" });
    }

    if (typeof price !== "number") {
      return res.status(400).json({ error: "Price must be number" });
    }

    const validTypes = ["Lunch set", "Drink", "Dessert"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Type must be one of Lunch set, Drink, Dessert" });
    }

    const updatedMenu = { ...menus[menuIndex], ...req.body };
    menus[menuIndex] = updatedMenu;
    fs.writeFile("./menu.json", JSON.stringify(menus), (err) => {
      if (err) return res.json(err);
      return res.json({ message: "Menu updated successfully" });
    });
  }

  static deleteMenu(req, res) {
    const menuId = parseInt(req.params.id);
    const menuIndex = menus.findIndex((menu) => menu.id === menuId);

    if (menuIndex === -1) {
      return res.status(404).json({ error: "Menu not found" });
    }

    menus.splice(menuIndex, 1);

    fs.writeFile("./menu.json", JSON.stringify(menus), (err) => {
      if (err) return res.json(err);
      return res.json({ message: "Menu deleted successfully" });
    });
  }
}
