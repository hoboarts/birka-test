import jwt from 'jsonwebtoken';
import sha1 from 'sha1';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.GEN_T || '922792S', { expiresIn: '30d' });
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.GEN_T || '922792S', (err, decode) => {
            if (err) {
                res.status(401).send({ message: 1005 });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 1006 });
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 1007 });
    }
}

export const payVerif = (req, res, next) => {
    const amount = req.body.amount;
    const parsMd = JSON.parse(req.body.merchant_data);
    const ctrAmount = parsMd[0].name;
    const signature = req.body.signature;
    const dirtStr = req.body.response_signature_string;
    const cleanedStr = dirtStr.slice(10);
    const strSha = sha1(process.env.U_XE + cleanedStr);
    if (amount === ctrAmount) {
        if (signature && dirtStr) {
            if (signature === strSha) {
                next();
            } else {
                res.status(401).send({ message: 3004 });
            }
        } else {
            res.status(401).send({ message: 3005 });
        }
    } else {
        res.status(401).send({ message: 3006 });
    }
}