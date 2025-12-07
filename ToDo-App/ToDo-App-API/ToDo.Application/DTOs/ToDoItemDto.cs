namespace ToDo.Application.DTOs
{
    public class ToDoItemDto
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public bool IsDone { get; set; }
    }
}
