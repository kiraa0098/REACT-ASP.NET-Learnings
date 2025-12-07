using MediatR;
using ToDo.Application.DTOs;

namespace ToDo.Application.UseCases.ToDoItems.Queries.GetToDoItemById
{
    public class GetToDoItemByIdQuery : IRequest<ToDoItemDto>
    {
        public Guid Id { get; set; }
    }
}
