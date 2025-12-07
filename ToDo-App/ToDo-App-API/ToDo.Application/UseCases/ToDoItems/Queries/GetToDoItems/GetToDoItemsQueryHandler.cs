using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDo.Application.DTOs;
using ToDo.Persistence.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ToDo.Application.UseCases.ToDoItems.Queries.GetToDoItems
{
    public class GetToDoItemsQueryHandler : IRequestHandler<GetToDoItemsQuery, IEnumerable<ToDoItemDto>>
    {
        private readonly ToDoDbContext _context;

        public GetToDoItemsQueryHandler(ToDoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ToDoItemDto>> Handle(GetToDoItemsQuery request, CancellationToken cancellationToken)
        {
            return await _context.ToDoItems
                .Select(x => new ToDoItemDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    IsDone = x.IsDone
                })
                .ToListAsync(cancellationToken);
        }
    }
}
