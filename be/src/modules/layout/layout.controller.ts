import layoutService from "./layout.service.js";

class LayoutController {
  async get(type: string) {
    return layoutService.getLayout(type);
  }

  async save(type: string, components: any[]) {
    return layoutService.saveLayout(type, components);
  }
}

export default new LayoutController();
