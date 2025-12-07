using MediatR;
using ToDo.Application.DTOs;
using ToDo.Persistence.Context;
using System.Threading;
using System.Threading.Tasks;

namespace ToDo.Application.UseCases.ToDoItems.Queries.GetToDoItemById
{
    public class GetToDoItemByIdQueryHandler : IRequestHandler<GetToDoItemByIdQuery, ToDoItemDto>
    {
        private readonly ToDoDbContext _context;

        public GetToDoItemByIdQueryHandler(ToDoDbContext context)
        {
            _context = context;
        }

        public async Task<ToDoItemDto> Handle(GetToDoItemByIdQuery request, CancellationToken cancellationToken)
        {
            var todoItem = await _context.ToDoItems.FindAsync(request.Id);

            if (todoItem == null)
            {
                return null;
            }

            return new ToDoItemDto
            {
                Id = todoItem.Id,
                Title = todoItem.Title,
                IsDone = todoItem.IsDone
            };
        }
    }
}
