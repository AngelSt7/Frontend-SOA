using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebVue.Pages
{
    public class BuscarModel : PageModel
    {
        private readonly ILogger<BuscarModel> _logger;

        public BuscarModel(ILogger<BuscarModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }

}
