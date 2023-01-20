import { isValidObjectId, Schema } from "mongoose";
import ErrorHandler from "./error.utils";

export const compareMongooseIds = (
  id1: Schema.Types.ObjectId | string | undefined,
  id2: Schema.Types.ObjectId | string | undefined
) => {
  if (!id1 || !id2) {
    return false;
  }
  if (!(typeof id1 === "string")) {
    id1 = id1.toString();
  }

  if (!(typeof id2 === "string")) {
    id2 = id2.toString();
  }

  return id1 === id2;
};

export const checkId = (id: string, label?: string) => {
  if (!isValidObjectId(id)) {
    throw new ErrorHandler(`Invalid ${label} id`, 400);
  }
  return true;
};
