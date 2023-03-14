const request = require('supertest');
const server = require('../server');

describe('users', () => {
    describe('POST to register new user', () => {
        describe('given the user email already exists', () => {
            it('should return 400', async () => {
                const response = await request(server).post('/api/users/').send({
                    user_name: 'username',
                    user_password: 'abcd',
                    user_email: 'cstest@gmail.com',
                });
                expect(response.statusCode).toBe(400);
            });
            it('should return error stating that the email is already in use', async () => {
                const response = await request(server).post('/api/users/').send({
                    user_name: 'username',
                    user_password: 'abcd',
                    user_email: 'cstest@gmail.com',
                });
                const errorText = JSON.parse(response.text);
                expect(errorText.message).toMatch('This email is already in use');
            });
        });
        describe('given the user did not enter all fields', () => {
            it('should return 400', async () => {
                const response = await request(server).post('/api/users/').send({
                    user_name: undefined,
                    user_password: undefined,
                    user_email: undefined,
                });
                expect(response.statusCode).toBe(400);
            });
            it('should return error stating to complete all fields', async () => {
                const response = await request(server).post('/api/users/').send({
                    user_name: undefined,
                    user_password: undefined,
                    user_email: undefined,
                });
                const errorText = JSON.parse(response.text);
                expect(errorText.message).toBe('Please complete all fields');
            });
        });
    });
});

describe('campaigns', () => {
    describe('POST to create a new campaign', () => {
        describe('given that the user does not pass authentication credentials to backend when trying to create a campaign', () => {
            it('should return 401', async () => {
                const response = await request(server).post('/api/campaigns/').send({
                    campaign_name: 'test campaign',
                });
                expect(response.statusCode).toBe(401);
            });
        });
    });
});
