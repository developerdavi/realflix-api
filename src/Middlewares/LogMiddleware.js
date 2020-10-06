function LogMiddleware(req, _res, next) {
  const d = new Date();
  const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  const seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
  const time = hours + ':' + minutes + ':' + seconds;
  console.log(`[${time}][Request] ${req.method} ${req.path}`);
  next();
}

module.exports = LogMiddleware;
