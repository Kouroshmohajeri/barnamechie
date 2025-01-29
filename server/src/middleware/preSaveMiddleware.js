import crypto from "crypto";

export const generateUniqueUrl = async function (next) {
  if (!this.isModified("title")) return next();

  const baseSlug = this.title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  // Generate a unique string to ensure uniqueness
  const uniqueSuffix = crypto.randomBytes(4).toString("hex");

  // Combine baseSlug and uniqueSuffix
  this.url = `${baseSlug}-${uniqueSuffix}`;

  next();
};
