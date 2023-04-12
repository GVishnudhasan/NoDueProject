export default (catchAsync) => (req, res, next) => {
    Promise.resolve(catchAsync(req, res, next)).catch(next);
  };
  