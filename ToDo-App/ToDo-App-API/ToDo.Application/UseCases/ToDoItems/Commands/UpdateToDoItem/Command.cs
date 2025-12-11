using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDo.Persistence.Context;

namespace ToDo.Application.UseCases.ToDoItems.Commands.UpdateToDoItem
{
    public class UpdateToDoItemCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public bool IsDone { get; set; }
    }

    public class UpdateToDoItemCommandHandler : IRequestHandler<UpdateToDoItemCommand>
    {
        private readonly ToDoDbContext _context;

        public UpdateToDoItemCommandHandler(ToDoDbContext context)
        {
            _context = context;
        }

        public async Task Handle(UpdateToDoItemCommand request, CancellationToken cancellationToken)
        {
            var todoItem = await _context.ToDoItems.FindAsync(request.Id);

            if (todoItem == null)
            {
                // Or throw an exception
                return;
            }

            todoItem.Title = request.Title;
            todoItem.IsDone = request.IsDone;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
