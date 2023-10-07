import { Exception } from "../../../../util/exception.js";

export class ServiceHandler {
  #serviceModel;

  constructor(serviceModel) {
    this.#serviceModel = serviceModel;
  }

  /**
   * @description return all services
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findMany = async (_req, res) => {
    const services = await this.#serviceModel.find();

    const isEmpty = services.length;

    if (!isEmpty) {
      throw new Exception("No services found", 404);
    }

    return res.status(200).json(services);
  };

  /**
   * @description return one service
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findById = async (req, res) => {
    const { id } = req.params;

    const serviceFound = await this.#serviceModel.findById(id);

    if (!serviceFound) {
      throw new Exception("No service found", 404);
    }

    return res.status(200).json(serviceFound);
  };

  /**
   * @description create one service
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  create = async (req, res) => {
    const service = new this.#serviceModel(req.body);
    await service.save();

    return res.status(201).json(service);
  };

  /**
   * @description update one service
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  update = async (req, res) => {
    const { id } = req.params;

    await this.#serviceModel.findOneAndUpdate({ _id: id }, { $set: req.body });

    return res.status(204).end();
  };

  /**
   * @description delete one service
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  delete = async (req, res) => {
    const { id } = req.params;

    await this.#serviceModel.deleteOne({ _id: id });

    return res.status(204).end();
  };
}
