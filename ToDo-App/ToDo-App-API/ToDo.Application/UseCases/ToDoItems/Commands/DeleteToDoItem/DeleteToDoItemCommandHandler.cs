using MediatR;
using ToDo.Application.UseCases.ToDoItems.Commands.DeleteToDoItem;
using ToDo.Persistence.Context;

namespace ToDo.Application.UseCases.ToDoItems.Commands.DeleteToDoItem
{
    public class DeleteToDoItemCommandHandler : IRequestHandler<DeleteToDoItemCommand>
    {
        private readonly ToDoDbContext _context;

        public DeleteToDoItemCommandHandler(ToDoDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DeleteToDoItemCommand request, CancellationToken cancellationToken)
        {
            var todoItem = await _context.ToDoItems.FindAsync(request.Id);

            if (todoItem != null)
            {
                _context.ToDoItems.Remove(todoItem);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
