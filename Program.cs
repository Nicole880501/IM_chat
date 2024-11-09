using SignalRChat.Hubs;
using Microsoft.Azure.SignalR;

var builder = WebApplication.CreateBuilder(args);

// 讀取 Azure SignalR 連接字串
var azureSignalRConnectionString = builder.Configuration.GetValue<string>("AzureSignalRConnectionString");

// 設定 SignalR 服務
builder.Services.AddRazorPages();
builder.Services.AddSignalR()
    .AddAzureSignalR(options =>
    {
        options.ConnectionString = azureSignalRConnectionString;
    });

var app = builder.Build();

// 設定中介軟體
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapRazorPages();
app.MapHub<ChatHub>("/chatHub");

app.Run();
