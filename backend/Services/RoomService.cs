using backend.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace backend.Services
{
    public class RoomService
    {
        private readonly IMongoCollection<Room> _rooms;
        private readonly IMongoCollection<Booking> _bookings;

        public RoomService(MongoDbService db)
        {
            _rooms = db.GetCollection<Room>("Rooms");
            _bookings = db.GetCollection<Booking>("Booking");
        }

        public async Task<List<Room>> GetAvailableAsync(DateTime from, DateTime to, int capacity = 1)
        {
            var bookingFilter = Builders<Booking>.Filter.And(
                Builders<Booking>.Filter.Lt(b => b.CheckIn, to),
                Builders<Booking>.Filter.Gt(b => b.CheckOut, from)
            );

            var bookedRooms = await _bookings
                .Find(bookingFilter)
                .Project(b => b.RoomId!)  // b.RoomId мапиться на roomsId у MongoDB
                .ToListAsync();

            var roomFilter = Builders<Room>.Filter.And(
      Builders<Room>.Filter.Nin(r => r.Id, bookedRooms),
      Builders<Room>.Filter.Gte(r => r.Capacity, capacity)
  );
            return await _rooms.Find(roomFilter).ToListAsync();
        }

        public async Task<Room?> GetByIdAsync(string id)
        {
            return await _rooms.Find(r => r.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Room>> GetAvailableAsync(DateTime checkIn, DateTime checkOut, List<string> bookedRoomIds)
        {
            return await _rooms
                .Find(r => r.IsAvailable && !bookedRoomIds.Contains(r.Id))
                .ToListAsync();
        }
    }
}
