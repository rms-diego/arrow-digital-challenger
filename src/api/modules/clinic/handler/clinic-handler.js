import { Exception } from "../../../../util/exception.js";

export class ClinicHandler {
  #clinicModel;

  constructor(clinicModel) {
    this.#clinicModel = clinicModel;
  }

  /**
   * @description return all clinics
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findMany = async (_req, res) => {
    const clinicsFound = await this.#clinicModel.find();

    const isEmpty = clinicsFound.length;

    if (!isEmpty) {
      throw new Exception("No clinics found", 404);
    }

    return res.status(201).json(clinicsFound);
  };

  /**
   * @description return one clinic
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  findById = async (req, res) => {
    const { id } = req.params;
    const clinicFound = await this.#clinicModel.findById(id);

    if (!clinicFound) {
      throw new Exception("No clinic found", 400);
    }

    return res.status(200).json(clinicFound);
  };

  /**
   * @description create one clinic
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  create = async (req, res) => {
    const { name } = req.body;

    const clinicFound = await this.#clinicModel.findOne({ name });

    if (clinicFound) {
      throw new Exception("clinic already exists", 400);
    }

    const clinic = new this.#clinicModel(req.body);
    await clinic.save();

    return res.status(201).json(clinic);
  };

  /**
   * @description update one clinic
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  update = async (req, res) => {
    const { id } = req.params;
    await this.#clinicModel.findOneAndUpdate({ _id: id }, { $set: req.body });

    return res.status(204).end();
  };

  /**
   * @description delete one clinic
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */
  delete = async (req, res) => {
    const { id } = req.params;

    await this.#clinicModel.deleteOne({ _id: id });
    return res.status(204).end();
  };
}
