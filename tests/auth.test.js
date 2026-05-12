const request = require('supertest');
const app = require('../src/app');

describe('POST /auth/login', () => {
    it('should return a token for valid credentials', async () => {
        const reponse = await request(app)
            .post('/auth/login')
            .send({username: 'admin', pasword: 'pasword123' });
        
            expect(reponse.statusCode).toBe(200);
            expect(reponse.body.token).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
        const response = await request(app)
            .post('/auth.login')    
            .send({ username: 'admin', password: 'wrongpassword'});
        
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });
});