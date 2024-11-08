using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;


namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        // 使用一個靜態的 ConcurrentDictionary 來記錄每個連線的 user ID
        private static readonly ConcurrentDictionary<string, string> Connections = new ConcurrentDictionary<string, string>();

        // 當有新的客戶端連線時，更新人數並通知所有客戶端
        public override async Task OnConnectedAsync()
        {
            // 可以直接使用連線 ID 作為 user ID 來記錄每個連線
            Connections.TryAdd(Context.ConnectionId, Context.ConnectionId);  // 用 ConnectionId 作為 user ID
            await Clients.All.SendAsync("UpdateConnectionCount", Connections.Count);
            await base.OnConnectedAsync();
        }

        // 當有客戶端斷線時，減少連線人數並通知所有客戶端
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            Connections.TryRemove(Context.ConnectionId, out _);
            await Clients.All.SendAsync("UpdateConnectionCount", Connections.Count);
            await base.OnDisconnectedAsync(exception);
        }
    }
}