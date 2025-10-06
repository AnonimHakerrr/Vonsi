namespace backend.Config
{
    public class MongoDbSettings
    {
        public string? ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string UsersCollection { get; set; }
    }
}
