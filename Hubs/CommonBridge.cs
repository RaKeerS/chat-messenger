using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Chat_Messenger.Hubs
{
    public class CommonBridge : Hub
    {
        public static ConcurrentDictionary<string, List<string>> ConnectedUsers = new ConcurrentDictionary<string, List<string>>();

        public void Hello()
        {
            Clients.All.hello();
        }

        public void sendMessageTo(string senderUserName, string receiverUserName, string message)
        {
            var existingUsersConnectionIds = enlistAllConnections(receiverUserName);

            existingUsersConnectionIds.Find(x => x == receiverUserName);

            //Clients.All.SendAsync("messageReceived", senderUserName, receiverUserName, message);

            Clients.All.messageReceived(senderUserName, receiverUserName, message);

            //await Clients.All.messageReceived(userName, message);
        }

        private List<string> enlistAllConnections(string userToConnectTo) // The argument userToConnectTo is the userName we want to connect to/chat with.
        {
            var userName = Context.User.Identity.Name;

            // Try to get a List of existing user connections from the cache
            List<string> existingUsersConnectionIds;
            ConnectedUsers.TryGetValue(userName, out existingUsersConnectionIds);

            // happens on the very first connection from the user
            if (existingUsersConnectionIds == null)
            {
                existingUsersConnectionIds = new List<string>();
            }

            // First add to a List of existing user connections (i.e. multiple web browser tabs)
            existingUsersConnectionIds.Add(userToConnectTo);

            ConnectedUsers.TryAdd(userName, existingUsersConnectionIds);

            return existingUsersConnectionIds;
        }

        //public override Task OnConnected()
        //{
        //    var userName = Context.User.Identity.Name;

        //    // Try to get a List of existing user connections from the cache
        //    List<string> existingUsersConnectionIds;
        //    ConnectedUsers.TryGetValue(userName, out existingUsersConnectionIds);
            
        //    // happens on the very first connection from the user
        //    if (existingUsersConnectionIds == null) {
        //        existingUsersConnectionIds = new List<string>();
        //    }

        //    // First add to a List of existing user connections (i.e. multiple web browser tabs)
        //    existingUsersConnectionIds.Add(Context.ConnectionId);

        //    ConnectedUsers.TryAdd(userName, existingUsersConnectionIds);

        //    return base.OnConnected();
        //}

        //public override Task OnDisconnected(bool stopCalled)
        //{
        //    var userName = Context.User.Identity.Name;

        //    List<string> existingUsersConnectionIds;
        //    ConnectedUsers.TryGetValue(userName, out existingUsersConnectionIds);

        //    existingUsersConnectionIds.Remove();

        //    return base.OnDisconnected(stopCalled);
        //}
    }
}