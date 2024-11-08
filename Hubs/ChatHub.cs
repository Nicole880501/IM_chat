using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendPlayerPosition(int x, int y)
        {
            // 向所有連線的客戶端發送玩家的位置
            await Clients.All.SendAsync("ReceivePlayerPosition", x, y);
        }
    }
}