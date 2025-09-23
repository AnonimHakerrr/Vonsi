using AutoMapper;
using backend.Config;
using backend.DTOs.Booking;
using backend.Models;
using MongoDB.Driver;

namespace backend.Services
{
     public class ServiceResult<T>
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }

        public static ServiceResult<T> Ok(T data) => new ServiceResult<T> { Success = true, Data = data };
        public static ServiceResult<T> Fail(string message) => new ServiceResult<T> { Success = false, Message = message };
    }

    public class BookingService
    {
        private readonly IMongoCollection<Booking> _booking;
        private readonly IMapper _mapper;

        public BookingService(MongoDbService database, IMapper mapper)
        {
            _booking = database.GetCollection<Booking>("Booking");
            _mapper = mapper;

            // (опційно) створюємо індекс, щоб швидше шукати бронювання по датах
            var indexKeys = Builders<Booking>.IndexKeys
                .Ascending(b => b.RoomId)
                .Ascending(b => b.CheckIn)
                .Ascending(b => b.CheckOut);

            _booking.Indexes.CreateOne(new CreateIndexModel<Booking>(indexKeys));
        }
        public async Task<Booking?> GetBookingByIdAsync(string id)
        {
            return await _booking.Find(b => b.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Booking>> GetAllBookingsAsync()
        {
            return await _booking.Find(_ => true).ToListAsync();
        }

        public async Task<List<Booking>> GetUserBookingsAsync(string userId)
        {
            return await _booking.Find(b => b.UserId == userId).ToListAsync();
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
            booking.UserId = userId; // Прив’язка до користувача
            await _booking.InsertOneAsync(booking);

            return ServiceResult<BookingResponseDto>.Ok(_mapper.Map<BookingResponseDto>(booking));
        }

        // Оновлення та видалення теж перевіряють UserId
        public async Task<ServiceResult<bool>> UpdateBookingAsync(string id, Booking updatedBooking, string userId)
        {
            var existing = await _booking.Find(b => b.Id == id && b.UserId == userId).FirstOrDefaultAsync();
            if (existing == null) return ServiceResult<bool>.Fail("Booking not found.");

            await _booking.ReplaceOneAsync(b => b.Id == id && b.UserId == userId, updatedBooking);
            return ServiceResult<bool>.Ok(true);
        }

        public async Task<ServiceResult<bool>> DeleteBookingAsync(string id, string userId)
        {
            var result = await _booking.DeleteOneAsync(b => b.Id == id && b.UserId == userId);
            if (result.DeletedCount == 0) return ServiceResult<bool>.Fail("Booking not found.");

            return ServiceResult<bool>.Ok(true);
        }

         
    }
}
