function checkRole(grant) {
    return async (req, res, next) => {
        let [role, resoures] = grant.split(':');
        next();
    }
}
module.exports = checkRole;