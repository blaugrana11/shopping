import Model from './Model.js';

export default class Task extends Model {

  static table = "shopping.items";
  static primary = ["id_item"];
}