export const errorHandler = (err, req, res, next) => {
  const errorResponse ={
    message:err.message,
    success:false,
    data:null
  };
  console.log(err);
  res.status(err.statusCode??501).json(errorResponse);
};
