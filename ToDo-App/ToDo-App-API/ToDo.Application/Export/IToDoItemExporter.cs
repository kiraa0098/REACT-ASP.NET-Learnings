using ToDo.Application.DTOs;

namespace ToDo.Application.Export;

public interface IToDoItemExporter
{
    byte[] ExportToExcel(IEnumerable<ToDoItemDto> toDoItems);
}
