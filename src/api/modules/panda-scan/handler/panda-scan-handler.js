import { Exception } from "../../../../util/exception.js";

export class PandaScanHandler {
  #pandaScanModel;

  constructor(pandaScanModel) {
    this.#pandaScanModel = pandaScanModel;
  }

  /**
   * @description return all pandaScans
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findMany = async (_req, res) => {
    const pandaScans = await this.#pandaScanModel.find();

    const isEmpty = pandaScans.length;

    if (!isEmpty) {
      throw new Exception("No pandaScans found", 404);
    }

    return res.status(200).json(pandaScans);
  };

  /**
   * @description return one pandaScan
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findById = async (req, res) => {
    const { id } = req.params;

    const pandaScanFound = await this.#pandaScanModel.findById(id);

    if (!pandaScanFound) {
      throw new Exception("No pandaScans found", 404);
    }

    res.status(200).json(pandaScanFound);
  };

  /**
   * @description create one pandaScan
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  create = async (req, res) => {
    const pandaScan = new this.#pandaScanModel(req.body);
    await pandaScan.save();

    return res.status(201).json(pandaScan);
  };

  /**
   * @description update one pandaScan
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  update = async (req, res) => {
    const { id } = req.params;

    await this.#pandaScanModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body }
    );

    return res.status(204).end();
  };

  /**
   * @description delete one pandaScan
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  delete = async (req, res, next) => {
    const { id } = req.params;
    await this.#pandaScanModel.deleteOne({ _id: id });

    res.status(204).end();
  };
}
