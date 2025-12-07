using MediatR;
using ToDo.Application.DTOs;
using ToDo.Domain.Entities;
using ToDo.Persistence.Context;

namespace ToDo.Application.UseCases.ToDoItems.Commands.CreateToDoItem
{
    public class CreateToDoItemCommandHandler : IRequestHandler<CreateToDoItemCommand, ToDoItemDto>
    {
        private readonly ToDoDbContext _context;

        public CreateToDoItemCommandHandler(ToDoDbContext context)
        {
            _context = context;
        }

        public async Task<ToDoItemDto> Handle(CreateToDoItemCommand request, CancellationToken cancellationToken)
        {
            var todoItem = new ToDoItem
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                IsDone = false
            };

            _context.ToDoItems.Add(todoItem);
            await _context.SaveChangesAsync(cancellationToken);

            return new ToDoItemDto
            {
                Id = todoItem.Id,
                Title = todoItem.Title,
                IsDone = todoItem.IsDone
            };
        }
    }
}
