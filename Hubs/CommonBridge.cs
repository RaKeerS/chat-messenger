using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;
using System.Collections.Generic;

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

            Clients.All.messageReceived(senderUserName, receiverUserName, message);
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
    }
}