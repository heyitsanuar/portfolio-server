const sanitizeBody = req => Object.assign({}, ...Object.keys(req.body).map(key => ({ [key]: req.sanitize(req.body[key]) })));

module.exports = {
  sanitizeBody,
};
