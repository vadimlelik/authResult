import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

const generateFakeData = async () => {
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
                name: faker.name.jobTitle(),
                description: faker.lorem.sentence()
            });
            roles.push(await role.save());
        }

        // Генерация качеств
        const qualities = [];
        for (let i = 0; i < 3; i++) {
            const quality = new Quality({
                name: faker.lorem.word(),
                description: faker.lorem.sentence()
            });
            qualities.push(await quality.save());
        }

        // Генерация пользователей
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new User({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: roles[Math.floor(Math.random() * roles.length)]._id,
                quality: qualities[Math.floor(Math.random() * qualities.length)]._id
            });
            users.push(await user.save());
        }

        // Генерация постов и комментариев
        for (let i = 0; i < 5; i++) {
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
        mongoose.disconnect();
    } catch (error) {
        console.error('Error generating fake data:', error);
        mongoose.disconnect();
    }
};