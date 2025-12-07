using MediatR;

namespace ToDo.Application.UseCases.ToDoItems.Commands.DeleteToDoItem
{
    public class DeleteToDoItemCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
