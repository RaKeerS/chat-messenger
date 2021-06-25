using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Chat_Messenger.Controllers
{
    public class HomeController : Controller
    {
        public List<object> messageBox = new List<object>();

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

        [System.Web.Http.HttpPost]
        public JsonResult sendMessage(messageBody message)
        {
            dynamic response = new ExpandoObject();
            messageBox.Add(message);
            response.messageBox = messageBox;
            return Json(response);
        }
    }

    public struct messageBody {
        public string accessToken { get; set; }
        public string messageString { get; set; }
    }
}
