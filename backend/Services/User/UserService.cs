using backend.DTOs.User;
using backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(MongoDbService mongoDb)
        {
            _users = mongoDb.GetCollection<User>("Users");
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
                return null;

            return await _users.Find(u => u.Id == objectId.ToString()).FirstOrDefaultAsync();
        }
        public Task<User> GetByEmailAsync(string email) => _users.Find(u => u.Email == email).FirstOrDefaultAsync();

        public Task<User> GetByPhoneAsync(string phone) => _users.Find(u => u.Phone == phone).FirstOrDefaultAsync();

        public async Task<User?> UpdateUserAsync(string userId, UpdateUserDto dto, IFormFile? photoFile)
        {
            var updates = new List<UpdateDefinition<User>>();

            if (!string.IsNullOrEmpty(dto.FirstName))
                updates.Add(Builders<User>.Update.Set(u => u.FirstName, dto.FirstName));

            if (!string.IsNullOrEmpty(dto.LastName))
                updates.Add(Builders<User>.Update.Set(u => u.LastName, dto.LastName));

            if (!string.IsNullOrEmpty(dto.Email))
                updates.Add(Builders<User>.Update.Set(u => u.Email, dto.Email));

            if (!string.IsNullOrEmpty(dto.Phone))
                updates.Add(Builders<User>.Update.Set(u => u.Phone, dto.Phone));

            // Якщо є нове фото
            if (photoFile != null && photoFile.Length > 0)
            {
                var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "upload");
                if (!Directory.Exists(uploadsDir))
                    Directory.CreateDirectory(uploadsDir);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(photoFile.FileName)}";
                var filePath = Path.Combine(uploadsDir, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await photoFile.CopyToAsync(stream);
                }

                var relativePath = $"upload/{fileName}";
                updates.Add(Builders<User>.Update.Set(u => u.PhotoUrl, relativePath));
            }

            if (updates.Count == 0) return null;

            updates.Add(Builders<User>.Update.Set(u => u.UpdatedAt, DateTime.UtcNow));

            var updateDefinition = Builders<User>.Update.Combine(updates);

            return await _users.FindOneAndUpdateAsync(
                u => u.Id == userId,
                updateDefinition,
                new FindOneAndUpdateOptions<User>
                {
                    ReturnDocument = ReturnDocument.After
                });
        }

        public async Task CreateAsync(User user)
        {
            await _users.InsertOneAsync(user);
        }
    }
}
