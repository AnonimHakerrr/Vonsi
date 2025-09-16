using backend.Models;
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

        public Task<List<User>> GetAllAsync() => _users.Find(u => true).ToListAsync();
        public Task<User> GetByIdAsync(string id) => _users.Find(u => u.Id == id).FirstOrDefaultAsync();
        public Task CreateAsync(User user) => _users.InsertOneAsync(user);
    }
}
