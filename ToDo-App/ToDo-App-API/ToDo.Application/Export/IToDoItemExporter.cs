using ClosedXML.Excel;
using System.IO;
using System.Collections.Generic; 
using ToDo.Application.UseCases.Models;

namespace ToDo.Application.Export;

public interface IToDoItemExporter
{
    byte[] ExportToExcel(IEnumerable<TodoModel> toDoItems);
}

public class ToDoItemExporter : IToDoItemExporter
{
    public byte[] ExportToExcel(IEnumerable<TodoModel> toDoItems)
    {
        // ... (The rest of the implementation code)
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("ToDo Items");

        worksheet.Cell(1, 1).Value = "Title";
        worksheet.Cell(1, 2).Value = "Is Done";

        var row = 2;
        foreach (var item in toDoItems)
        {
            worksheet.Cell(row, 1).Value = item.Title;
            worksheet.Cell(row, 2).Value = item.IsDone;
            row++;
        }

        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }
}