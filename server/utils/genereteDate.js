import {faker} from "@faker-js/faker";
import User from "../model/userModel.js";
import Post from "../model/postModel.js";
import Comment from "../model/commentModel.js";
import Quality from "../model/qualityModel.js";
import Role from "../model/roleModel.js";
import Token from "../model/tokenModel.js";


export const generateFakeData = async () => {
    try {
        // Очистка данных перед генерацией
        await User.deleteMany({});
        await Comment.deleteMany({});
        await Post.deleteMany({});
        await Quality.deleteMany({});
        await Role.deleteMany({});
        await Token.deleteMany({});

        // Генерация ролей
        const roles = [];
        for (let i = 0; i < 3; i++) {
            const role = new Role({
                name: faker.person.jobTitle(),
                description: faker.lorem.sentence()
            });
            roles.push(await role.save());
        }

        // Генерация качеств
        const qualities = [];
        for (let i = 0; i < 50; i++) {
            const quality = new Quality({
                name: faker.lorem.word(),
                description: faker.lorem.sentence()
            });
            qualities.push(await quality.save());
        }

        // Генерация пользователей
        const users = [];
        for (let i = 0; i < 100; i++) {
            const user = new User({
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                // post:post[Math.floor(Math.random()*post.length)]._id,
                role: roles[Math.floor(Math.random() * roles.length)]._id,
                qualities: qualities[Math.floor(Math.random() * qualities.length)]._id
            });
            users.push(await user.save());
        }

        // Генерация токенов для пользователей
        // for (let i = 0; i < users.length; i++) {
        //     const token = new Token({
        //         token: faker.datatype.uuid(),
        //         user: users[i]._id
        //     });
        //     await token.save();
        // }

        // Генерация постов и комментариев
        for (let i = 0; i < 150; i++) {
            const post = new Post({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                user: users[Math.floor(Math.random() * users.length)]._id
            });
            const savedPost = await post.save();

            for (let j = 0; j < 3; j++) {
                const comment = new Comment({
                    text: faker.lorem.sentence(),
                    user: users[Math.floor(Math.random() * users.length)]._id,
                    post: savedPost._id
                });
                const savedComment = await comment.save();
                savedPost.comments.push(savedComment._id);
            }

            await savedPost.save();
        }

        console.log('Fake data generated successfully!');
    } catch (error) {
        console.error('Error generating fake data:', error);
    }
};