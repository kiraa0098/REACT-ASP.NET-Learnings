using MediatR;
using ToDo.Application.DTOs;
using System.Collections.Generic;

namespace ToDo.Application.UseCases.ToDoItems.Queries.GetToDoItems
{
    public class GetToDoItemsQuery : IRequest<IEnumerable<ToDoItemDto>>
    {
    }
}
