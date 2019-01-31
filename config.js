global.__base = __dirname + "/";

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

module.exports = {
    appPort: "7540",
    mongoUrl: "mongodb://localhost/alchemy"
};