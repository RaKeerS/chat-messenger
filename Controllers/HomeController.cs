using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Chat_Messenger.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult HomePage()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult RegisterLoginModal()
        {
            //ViewBag.Title = "Home Page";

            return View();
        }
    }
}
