using MediatR;
using ToDo.Application.UseCases.Models;
using Microsoft.EntityFrameworkCore;
using ToDo.Persistence.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ToDo.Application.UseCases.ToDoItems.Queries.GetToDoItems
{
    public class GetToDoItemsQuery : IRequest<IEnumerable<TodoModel>>
    {
    }

    public class GetToDoItemsQueryHandler : IRequestHandler<GetToDoItemsQuery, IEnumerable<TodoModel>>
    {
        private readonly ToDoDbContext _context;

        public GetToDoItemsQueryHandler(ToDoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoModel>> Handle(GetToDoItemsQuery request, CancellationToken cancellationToken)
        {
            return await _context.ToDoItems
                .Select(x => new TodoModel
                {
                    Id = x.Id,
                    Title = x.Title,
                    IsDone = x.IsDone
                })
                .ToListAsync(cancellationToken);
        }
    }
}
