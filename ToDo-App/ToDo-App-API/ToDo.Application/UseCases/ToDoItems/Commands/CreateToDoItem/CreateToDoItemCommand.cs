using MediatR;
using ToDo.Application.DTOs;

namespace ToDo.Application.UseCases.ToDoItems.Commands.CreateToDoItem
{
    public class CreateToDoItemCommand : IRequest<ToDoItemDto>
    {
        public string? Title { get; set; }
    }
}
