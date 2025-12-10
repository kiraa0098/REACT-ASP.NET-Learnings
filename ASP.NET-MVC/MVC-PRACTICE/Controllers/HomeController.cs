// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;

// namespace MVC_PRACTICE.controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class Joke : ControllerBase
//     {
//     }
// }

using Microsoft.AspNetCore.Mvc;
using MVC_PRACTICE.Models; // Added for Joke model

public class HomeController : Controller
{
    public IActionResult Index()
    {
        // 1. Logic goes here (e.g., fetching data from your jokes_DB)

        // 2. Return the View() method.
        // When called without any arguments, View() looks for a file
        // that matches the name of the Action Method (Index) 
        // in the corresponding folder (Views/Home).
        return View(); 
    }

    // GET: Home/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Home/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create([Bind("Id,JokeQuestion,JokeAnswer")] Joke joke)
    {
        if (ModelState.IsValid)
        {
            // In a real application, you would save the joke to a database here.
            // For now, we'll just redirect to the Index page.
            // _context.Add(joke);
            // await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(joke);
    }
}