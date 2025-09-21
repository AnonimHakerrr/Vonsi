using backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(MongoDbService mongoDb)
        {
            _users = mongoDb.GetCollection<User>("Users");
        }

        public async Task<User> GetByIdAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
                return null;

            return await _users.Find(u => u.Id == objectId.ToString()).FirstOrDefaultAsync();
        }
        public Task<User> GetByEmailAsync(string email) => _users.Find(u => u.Email == email).FirstOrDefaultAsync();

        public Task<User> GetByPhoneAsync(string phone) => _users.Find(u => u.Phone == phone).FirstOrDefaultAsync();

        public async Task CreateAsync(User user)
        {
            await _users.InsertOneAsync(user);
        }
    }
}
