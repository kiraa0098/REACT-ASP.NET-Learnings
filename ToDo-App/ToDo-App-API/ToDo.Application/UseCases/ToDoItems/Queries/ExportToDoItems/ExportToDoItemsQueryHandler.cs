using MediatR;
using ToDo.Application.DTOs;
using ToDo.Application.Export;
using ToDo.Application.UseCases.ToDoItems.Queries.GetToDoItems;

namespace ToDo.Application.UseCases.ToDoItems.Queries.ExportToDoItems;

public class ExportToDoItemsQueryHandler : IRequestHandler<ExportToDoItemsQuery, byte[]>
{
    private readonly IMediator _mediator;
    private readonly IToDoItemExporter _exporter;

    public ExportToDoItemsQueryHandler(IMediator mediator, IToDoItemExporter exporter)
    {
        _mediator = mediator;
        _exporter = exporter;
    }

    public async Task<byte[]> Handle(ExportToDoItemsQuery request, CancellationToken cancellationToken)
    {
        var toDoItems = await _mediator.Send(new GetToDoItemsQuery(), cancellationToken);
        return _exporter.ExportToExcel(toDoItems);
    }
}
