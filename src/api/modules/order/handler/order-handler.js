import { Exception } from "../../../../util/exception.js";
export class OrderHandler {
  #orderModel;

  constructor(orderModel) {
    this.#orderModel = orderModel;
  }

  /**
   * @description return all orders
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findMany = async (req, res) => {
    const ordersFound = await this.#orderModel.find().populate("clinic");

    const isEmpty = ordersFound.length;

    if (!isEmpty) {
      throw new Exception("No orders found", 404);
    }

    return res.status(200).json(ordersFound);
  };

  /**
   * @description return one order
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findById = async (req, res) => {
    const order = await this.#orderModel
      .findById(req.params.id)
      .populate("clinic");

    if (!order) {
      throw new Exception("No order found", 404);
    }

    return res.status(200).json(order);
  };

  /**
   * @description create one order
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  create = async (req, res) => {
    const order = new this.#orderModel(req.body);

    await order.save();

    return res.status(200).json(order);
  };

  /**
   * @description update one order
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  update = async (req, res) => {
    const { id } = req.params;
    await this.#orderModel.findOneAndUpdate({ _id: id }, { $set: req.body });

    return res.status(200).end();
  };

  /**
   * @description delete one order
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  delete = async (req, res) => {
    const { id } = req.params;

    await this.#orderModel.deleteOne({ _id: id });

    return res.status(204).end();
  };
}
