// const ctrlWrapper = (ctrl) => {
//   const func = async (req, res, next) => {
//     try {
//       await ctrl(req, res);
//     } catch (error) {
//       next(error);
//     }
//   };

//   return func;
// };

// module.exports = ctrlWrapper;

const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
