using ToDo.Application.UseCases.Models;

namespace ToDo.Application.Export;

public interface IToDoItemExporter
{
    byte[] ExportToExcel(IEnumerable<TodoModel> toDoItems);
}
