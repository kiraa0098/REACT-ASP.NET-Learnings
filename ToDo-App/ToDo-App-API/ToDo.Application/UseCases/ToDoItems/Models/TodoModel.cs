namespace ToDo.Application.UseCases.Models
{
    public class TodoModel
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public bool IsDone { get; set; }
    }
}
