using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebVue.Pages.Inmueble
{
    public class ClasificadoModel : PageModel
    {
        public string Slug { get; set; }

        public void OnGet(string slug)
        {
            Slug = slug;

        }
    }
}