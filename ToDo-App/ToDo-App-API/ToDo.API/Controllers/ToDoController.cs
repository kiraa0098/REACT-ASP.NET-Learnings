using MediatR;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.UseCases.Models;
using ToDo.Application.UseCases.ToDoItems.Commands.CreateToDoItem;
using ToDo.Application.UseCases.ToDoItems.Commands.DeleteToDoItem;
using ToDo.Application.UseCases.ToDoItems.Commands.UpdateToDoItem;
using ToDo.Application.UseCases.ToDoItems.Queries.GetToDoItemById;
using ToDo.Application.UseCases.ToDoItems.Queries.GetToDoItems;
using ToDo.Application.UseCases.ToDoItems.Queries.ExportToDoItems;

namespace ToDo.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ToDoController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoModel>>> GetToDoItems()
        {
            var query = new GetToDoItemsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoModel>> GetToDoItem(Guid id)
        {
            var query = new GetToDoItemByIdQuery { Id = id };
            var result = await _mediator.Send(query);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<TodoModel>> CreateToDoItem(CreateToDoItemCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetToDoItem), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateToDoItem(Guid id, UpdateToDoItemCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await _mediator.Send(command);
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoItem(Guid id)
        {
            var command = new DeleteToDoItemCommand { Id = id };
            await _mediator.Send(command);
            return NoContent();
        }

        [HttpGet("export")]
        public async Task<FileResult> ExportToDoItems()
        {
            var query = new ExportToDoItemsQuery();
            var result = await _mediator.Send(query);
            return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ToDoItems.xlsx");
        }
    }
}
