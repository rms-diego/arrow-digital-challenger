import { Exception } from "../../../../util/exception.js";
export class InventoryHandler {
  #inventoryModel;

  constructor(inventoryModel) {
    this.#inventoryModel = inventoryModel;
  }

  /**
   * @description return all inventories
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findMany = async (req, res) => {
    const inventories = await this.#inventoryModel.find();

    const isEmpty = inventories.length;

    if (!isEmpty) {
      throw new Exception("No inventories found", 404);
    }

    return res.json(inventories);
  };

  /**
   * @description return one inventory
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findeById = async (req, res) => {
    const { id } = req.params;

    const invetoryFound = await this.#inventoryModel.findById(id);

    if (!invetoryFound) {
      throw new Exception(404, "No inventory found");
    }

    return res.status(204).end();
  };

  /**
   * @description create one inventory
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  create = async (req, res) => {
    const inventory = new this.#inventoryModel(req.body);
    await inventory.save();

    return res.status(201).json(inventory);
  };

  /**
   * @description update one inventory
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  update = async (req, res) => {
    const { id } = req.params;

    await this.#inventoryModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body }
    );

    return res.status(204).end();
  };

  /**
   * @description delete one inventory
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  delete = async (req, res) => {
    const { id } = req.params;

    await this.#inventoryModel.deleteOne({ _id: id });

    return res.status(204).end();
  };
}
