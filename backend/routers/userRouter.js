////////////////////////////////////////////////////////////////////////////////////////////////
//                      :==+=-.                                                               //
//      .-+**+:       -@#+--=+%%-                                                             //
//    =%%+-::=@*      @%       +@-                      :*%%%#=                               //
//   *@-      :@*     %@.       @%                     *@=   +@=                              //
//   @#        +@:    *@:       *@.                   %%.   -@@:                              //
//  .@+         %%+=+#@=        =@-                  %@.   +@@:                               //
//  :@+          :-=-.          -@=                 +@-   #@%.                                //
//  :@+                         :@=                .@#   *@#                                  //
//  :@+                         :@+                +@:   @@                                   //
//  .@*                         :@+                %%    @%                                   //
//  .@*          .=*###+.       :@+  .=*%%%%%*=.  .@*    =@+:=#%%%#+:        :=*###*+:        //
//   @%         +@@@%%@@@:      :@+.*@*:     :+@#::@+     :+*+:   .=%%-    =@%=:. .:=#@+.     //
//   %@.       :@@:    +@-      :@#@#.          *@*@=                =@* .%%:         .#@-    //
//   *@:       :@+     %%       -@@%      =%@%+  +@@*          .*%#+  -@=%%      :*##-  *@:   //
//   =@=        @#    +@:       -@@=      @@@@@  .@@%          *@%%@=  @@@=      @@@@@  .@#   //
//   -@+        #@    @#        +@@+      .+*+.  =@@@-         .+##+  :@@@+      :*%#-  :@@   //
//   .@*        -@-  :@+        #@@@:           :@@*@@.              -@@-%@.           .%@*   //
//    @@.       .@+  :@%.      .@@:@@+.       .*@@* =@@=           -#@@- :@@-         =@@%    //
//    +@@*-     +@+   *@@*-.  :%@+ :%@@#+===*%@@%-   -%@%+-:::-=+#@@%+    :%@@+-:::=*@@@+     //
//     -%@@@@%%@@@:    =%@@@@@@@*    :*@@@@@@@*-       -#@@@@@@@@#+:        -#@@@@@@@%=.      //
//       .=*###*=.       .-+++=:        .::.              ..::.                .---:          //
//                                                                                            //
//_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-_-*-//
//                                                                                            //
//                                                                                            //
//                               contact:   hoboart@zoho.com                                  //
//                           itch.io:   https://hoboart.itch.io                               //
//              youtube:   https://www.youtube.com/channel/UCJS-Ow6LOZRcrQ7VZ2_V0qA           //
//                        art:   https://www.artstation.com/hidey0shi                         //
//                                                                                            //
//                                                                               SIMON ORLOV  //
////////////////////////////////////////////////////////////////////////////////////////////////



import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
//import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import Config from '../models/configModel.js';

const userRouter = express.Router();

/* userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
})); */

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 1001 });
}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const counter = await Config.find({ type: 'UserCounter' });
    const user = new User({
        userID: counter[0].value,
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    counter[0].value ++;
    await counter[0].save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
    });
}));

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 1002 });
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
}));

userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const users = await User.find({});
        res.send(users);
    })
);

userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.email === 'admin@example.com') {
                res.status(400).send({ message: 1003 });
                return;
            }
            const deleteUser = await user.remove();
            res.send({ message: 'User Deleted', user: deleteUser });
        } else {
            res.status(404).send({ message: 1002 });
        }
    })
);

userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        if (req.body.keyPass === process.env.KEY_PASS) {
            const user = await User.findById(req.params.id);
            if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.isAdmin = Boolean(req.body.isAdmin);
                const updatedUser = await user.save();
                res.send({ message: 'User Updated', user: updatedUser });
            } else {
                res.status(404).send({ message: 1002 });
            }
        } else {
            res.status(404).send({ message: 1004 });
        }
    })
);

export default userRouter;