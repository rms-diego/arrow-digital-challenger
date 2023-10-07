import { Exception } from "../../../../util/exception.js";

export class LabHandler {
  #labModel;

  constructor(labModel) {
    this.#labModel = labModel;
  }

  /**
   * @description return all labs
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findMany = async (_req, res) => {
    const labs = await this.#labModel.find();

    const isEmpty = labs.length;

    if (!isEmpty) {
      throw new Exception(404, "No labs found");
    }

    return res.status(200).json(labs);
  };

  /**
   * @description return one lab
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findById = async (req, res) => {
    const { id } = req.params;
    const labFound = await this.#labModel.findById(id);

    if (!labFound) {
      throw new Exception(404, "No labs found");
    }

    return res.status(200).json(labFound);
  };

  /**
   * @description create one lab
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  create = async (req, res) => {
    const lab = new this.#labModel(req.body);
    await lab.save();

    return res.status(201).json(lab);
  };

  /**
   * @description update one lab
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  update = async (req, res) => {
    const { id } = req.params;
    await this.#labModel.findOneAndUpdate({ _id: id }, { $set: req.body });

    return res.status(204).end();
  };

  /**
   * @description delete one lab
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  delete = async (req, res) => {
    const { id } = req.params;

    await this.#labModel.deleteOne({ _id: id });

    return res.status(204).end();
  };
}
