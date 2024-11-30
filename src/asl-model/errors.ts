/** Thrown if an item with the given key/name already exists */
export class AlreadyExistsError extends Error {}

/** Thrown if a required field is missing */
export class MissingFieldError extends Error {}

/** Thrown if the name of something isn't valid */
export class InvalidName extends Error {}

/** Thrown if too many of a resource are created */
export class TooManyError extends Error {}