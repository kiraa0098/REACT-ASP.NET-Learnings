using MediatR;
using ToDo.Application.UseCases.Models;
using ToDo.Persistence.Context;
using System.Threading;
using System.Threading.Tasks;

namespace ToDo.Application.UseCases.ToDoItems.Queries.GetToDoItemById
{
    public class GetToDoItemByIdQuery : IRequest<TodoModel>
    {
        public Guid Id { get; set; }
    }

    public class GetToDoItemByIdQueryHandler : IRequestHandler<GetToDoItemByIdQuery, TodoModel>
    {
        private readonly ToDoDbContext _context;

        public GetToDoItemByIdQueryHandler(ToDoDbContext context)
        {
            _context = context;
        }

        #nullable disable
        public async Task<TodoModel> Handle(GetToDoItemByIdQuery request, CancellationToken cancellationToken)
        {
            var todoItem = await _context.ToDoItems.FindAsync(request.Id);

            if (todoItem == null)
            {
                return null;
            }

            return new TodoModel
            {
                Id = todoItem.Id,
                Title = todoItem.Title,
                IsDone = todoItem.IsDone
            };
        }
        #nullable restore
    }
}
