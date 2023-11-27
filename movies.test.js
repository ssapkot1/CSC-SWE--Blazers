const { connect, disconnect } = require('mongoose');
const movies = require('./Models/Movies');

describe('MoviesModel', () => {
    beforeAll(async () => {
      await connect('mongodb+srv://test:test@cluster0.nfmkma3.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterAll(async () => {
        await disconnect();
    });

    it('should return no results when searching with an empty string', async () => {
        const results = await movies.find({ title: '' });
        expect(results).toHaveLength(0);
    });

    it('should return no results when searching with an string not matching', async () => {
        const results = await movies.find({ title: 'the' });
        expect(results).toHaveLength(0);
    });

    it('should return 1 result when searching with an string matching', async () => {
        const results = await movies.find({ title: 'Title' });
        expect(results).toHaveLength(1);
    });
});