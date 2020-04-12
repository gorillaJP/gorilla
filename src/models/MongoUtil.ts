/***
 * utilitiy to interprint mongoose error to a HTTP response body
 */

const mongooseErrorToRes = (collectionNameOnPath, err) => {
  if (err && err.errors && err.name == "ValidationError") {
    let errorInfo = err.errors[Object.keys(err.errors)[0]];
    if (errorInfo.kind == "unique") {
      return {
        field: collectionNameOnPath
          ? collectionNameOnPath + "." + errorInfo.path //append collection name, if the collectionNamePath is on argumnets
          : errorInfo.path,
        message: "`" + errorInfo.value + "` is not available",
      };
    }
  }
  const errorInfo = err.errors[Object.keys(err.errors)[0]];
  return errorInfo.message;
};

export { mongooseErrorToRes };
