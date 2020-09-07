import { db } from "../models/index.js";
import { logger } from "../config/logger.js";
import moment from "moment";
import mongoose from "mongoose";

const create = async (req, res) => {
  let params = req.body;

  try {
    logger.info(`POST /grade - ${JSON.stringify(params)}`);

    let grade = {
      name: params.name,
      subject: params.subject,
      type: params.type,
      value: params.value,
      lastModified: moment().toISOString(),
    };

    const newGrade = await db.grade.create(grade);

    res.send(newGrade);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const grade = await db.grade.find(condition);

    res.send(grade);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`GET /grade - ${id}`);

    const grade = await db.grade.findById(id);

    res.send(grade);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  try {
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);

    let params = req.body;
    let update = {
      name: params.name,
      subject: params.subject,
      type: params.type,
      value: params.value,
      lastModified: moment().toISOString(),
    };

    const doc = await db.grade.findOneAndUpdate({ _id: id }, update);
    const grade = await db.grade.findById(id);

    res.send(grade);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`DELETE /grade - ${id}`);

    const gradeToDelete = await db.grade.findOneAndDelete(
      { _id: id },
      function (err, grade) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted : ", grade);
        }
      }
    );

    res.send({ message: "Foi deletado a Grade id: " + id });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    logger.info(`DELETE /grade`);
    await db.grade.deleteMany();
    res.send({ message: "Todas as grades foram deletadas." });
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
