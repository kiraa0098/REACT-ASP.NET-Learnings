using Microsoft.AspNetCore.Mvc;

public class AboutController : Controller
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
}