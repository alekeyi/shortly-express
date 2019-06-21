const parseCookies = (req, res, next) => {
    console.log(req.getCookies())
};

module.exports = parseCookies;