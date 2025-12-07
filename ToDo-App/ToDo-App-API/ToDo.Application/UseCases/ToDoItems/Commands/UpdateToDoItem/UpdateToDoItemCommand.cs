using MediatR;

namespace ToDo.Application.UseCases.ToDoItems.Commands.UpdateToDoItem
{
    public class UpdateToDoItemCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public bool IsDone { get; set; }
    }
}
