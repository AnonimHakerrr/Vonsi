using AutoMapper;
using backend.Config;
using backend.DTOs.Booking;
using backend.DTOs.Services;
using backend.Models;
using MongoDB.Driver;

namespace backend.Services
{
    public class BookingService
    {
        private readonly IMongoCollection<Booking> _booking;
        private readonly IMapper _mapper;

        public BookingService(MongoDbService database, IMapper mapper)
        {
            _booking = database.GetCollection<Booking>("Booking");
            _mapper = mapper;

            var indexKeys = Builders<Booking>.IndexKeys
                .Ascending(b => b.RoomId)
                .Ascending(b => b.CheckIn)
                .Ascending(b => b.CheckOut);

            _booking.Indexes.CreateOne(new CreateIndexModel<Booking>(indexKeys));
        }


        public async Task<List<RoomsBookedByUserDto>> GetUserRoomBookingsAsync(string userId)
        {
            // 1. Отримуємо бронювання користувача
            var bookings = await _booking.Find(b => b.UserId == userId).ToListAsync();
             if (!bookings.Any())
                return new List<RoomsBookedByUserDto>();
            var roomIds = bookings.Select(b => b.RoomId).Distinct().ToList();

            // 2. Тягнемо кімнати
            var roomsCollection = _booking.Database.GetCollection<Room>("Rooms");
            var rooms = await roomsCollection.Find(r => roomIds.Contains(r.Id)).ToListAsync();

            var roomDict = rooms.ToDictionary(r => r.Id, r => r);

            // 3. Формуємо DTO
            var result = bookings.Select(b => new RoomsBookedByUserDto
            {
                Room = _mapper.Map<RoomDto>(roomDict[b.RoomId]),
                CheckIn = b.CheckIn,
                CheckOut = b.CheckOut
            }).ToList();

            return result;
        }


        public async Task<ServiceResult<BookingResponseDto>> CreateBookingAsync(CreateBookingDto dto, string userId)
        {
            if (dto.CheckIn >= dto.CheckOut)
                return ServiceResult<BookingResponseDto>.Fail("Check-in date must be earlier than check-out date.");

            if (string.IsNullOrWhiteSpace(dto.RoomId))
                return ServiceResult<BookingResponseDto>.Fail("RoomId cannot be empty.");

            var overlap = await _booking.Find(b =>
                b.RoomId == dto.RoomId &&
                b.CheckIn < dto.CheckOut &&
                b.CheckOut > dto.CheckIn
            ).FirstOrDefaultAsync();

            if (overlap != null)
                return ServiceResult<BookingResponseDto>.Fail("Room is already booked for this date range.");

            var booking = _mapper.Map<Booking>(dto);
            booking.UserId = userId;
            await _booking.InsertOneAsync(booking);

            return ServiceResult<BookingResponseDto>.Ok(_mapper.Map<BookingResponseDto>(booking));
        }

        public async Task<ServiceResult<bool>> DeleteBookingAsync(string id, string userId)
        {
            var result = await _booking.DeleteOneAsync(b => b.Id == id && b.UserId == userId);
            if (result.DeletedCount == 0) return ServiceResult<bool>.Fail("Booking not found.");

            return ServiceResult<bool>.Ok(true);
        }

         
    }
}
