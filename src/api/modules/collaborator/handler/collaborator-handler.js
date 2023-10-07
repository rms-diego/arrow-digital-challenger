import { Exception } from "../../../../util/exception.js";
export class CollaboratorHandler {
  #collaboratorModel;

  constructor(collaboratorModel) {
    this.#collaboratorModel = collaboratorModel;
  }

  /**
   * @description return all collaborators
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  findMany = async (req, res) => {
    const collaborators = await this.#collaboratorModel.find();

    const isEmpty = collaborators.length;

    if (!isEmpty) {
      throw new Exception("No collaborators found", 404);
    }

    return res.status(200).json(collaborators);
  };

  /**
   * @description return one collaborator
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  findById = async (req, res) => {
    const { id } = req.params;

    const collaborator = await this.#collaboratorModel.findById(id);

    if (!collaborator) {
      throw new Exception("No collaborator found", 404);
    }

    return res.status(200).json(collaborator);
  };

  /**
   * @description create one collaborator
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  create = async (req, res) => {
    const collaborator = new this.#collaboratorModel(req.body);

    await collaborator.save();
    return res.json(collaborator);
  };

  /**
   * @description update one collaborator
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  update = async (req, res) => {
    const { id } = req.params;

    await this.#collaboratorModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body }
    );

    return res.status(204).end();
  };

  /**
   * @description delete one collaborator
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  delete = async (req, res) => {
    const { id } = req.params;
    await this.#collaboratorModel.deleteOne({ _id: id });

    return res.status(204).end();
  };
}
